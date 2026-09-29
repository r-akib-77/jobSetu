import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { compareOtp } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    // --------------------------------
    // GET REQUEST BODY
    // --------------------------------

    const body = await request.json();

    const email = body.email?.toLowerCase().trim();
    const otp = body.otp?.trim();

    // --------------------------------
    // VALIDATE INPUT
    // --------------------------------

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and OTP are required.",
        },
        {
          status: 400,
        },
      );
    }

    // OTP must be exactly 6 digits
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification code must be 6 digits.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------
    // FIND PENDING REGISTRATION
    // --------------------------------

    const pendingRegistration = await prisma.pendingRegistration.findUnique({
      where: {
        email,
      },
    });

    if (!pendingRegistration) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification request not found.",
        },
        {
          status: 404,
        },
      );
    }

    // --------------------------------
    // CHECK OTP EXPIRATION
    // --------------------------------

    if (pendingRegistration.expiresAt.getTime() < Date.now()) {
      await prisma.pendingRegistration.delete({
        where: {
          id: pendingRegistration.id,
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: "This OTP has expired. Please request a new code.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------
    // CHECK MAX ATTEMPTS
    // --------------------------------

    const MAX_ATTEMPTS = 5;

    if (pendingRegistration.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many attempts. Please request a new code.",
        },
        {
          status: 429,
        },
      );
    }

    // --------------------------------
    // VERIFY OTP
    // --------------------------------

    const isValid = await compareOtp(otp, pendingRegistration.otpHash);

    // --------------------------------
    // INVALID OTP
    // --------------------------------

    if (!isValid) {
      const updatedAttempts = pendingRegistration.attempts + 1;

      await prisma.pendingRegistration.update({
        where: {
          id: pendingRegistration.id,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });

      const remainingAttempts = MAX_ATTEMPTS - updatedAttempts;

      return NextResponse.json(
        {
          success: false,
          error:
            remainingAttempts > 0
              ? `Invalid verification code. ${remainingAttempts} attempt${
                  remainingAttempts === 1 ? "" : "s"
                } remaining.`
              : "Too many attempts. Please request a new code.",
          remainingAttempts,
        },
        {
          status: remainingAttempts === 0 ? 429 : 400,
        },
      );
    }

    // --------------------------------
    // CHECK IF USER ALREADY EXISTS
    // --------------------------------

    const existingUser = await prisma.user.findUnique({
      where: {
        email: pendingRegistration.email,
      },
    });

    if (existingUser) {
      // Clean up pending registration
      await prisma.pendingRegistration.delete({
        where: {
          id: pendingRegistration.id,
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: "An account with this email already exists.",
        },
        {
          status: 409,
        },
      );
    }

    // --------------------------------
    // CREATE ACTUAL USER
    // --------------------------------

    const user = await prisma.user.create({
      data: {
        name: pendingRegistration.name,

        email: pendingRegistration.email,

        // Already hashed during registration
        password: pendingRegistration.password,

        accountType: pendingRegistration.accountType,

        companyName: pendingRegistration.companyName,

        // Mark email as verified
        emailVerified: new Date(),
      },
    });

    // --------------------------------
    // DELETE PENDING REGISTRATION
    // --------------------------------

    await prisma.pendingRegistration.delete({
      where: {
        id: pendingRegistration.id,
      },
    });

    // --------------------------------
    // SUCCESS
    // --------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully.",
        userId: user.id,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("OTP verification error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
