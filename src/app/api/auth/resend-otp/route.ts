import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    // --------------------------------
    // GET REQUEST BODY
    // --------------------------------

    const body = await request.json();

    const email = body.email?.toLowerCase().trim();

    // --------------------------------
    // VALIDATE EMAIL
    // --------------------------------

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required.",
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
    // MAX RESEND LIMIT
    // --------------------------------

    const MAX_RESENDS = 5;

    if (pendingRegistration.resendCount >= MAX_RESENDS) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many verification codes requested. Please try again later.",
        },
        {
          status: 429,
        },
      );
    }

    // --------------------------------
    // 60 SECOND RESEND COOLDOWN
    // --------------------------------

    const COOLDOWN_SECONDS = 60;

    const secondsSinceLastSend =
      (Date.now() - pendingRegistration.lastSentAt.getTime()) / 1000;

    if (secondsSinceLastSend < COOLDOWN_SECONDS) {
      const remainingSeconds = Math.ceil(
        COOLDOWN_SECONDS - secondsSinceLastSend,
      );

      return NextResponse.json(
        {
          success: false,
          error: `Please wait ${remainingSeconds} seconds before requesting another code.`,
          remainingSeconds,
        },
        {
          status: 429,
        },
      );
    }

    // --------------------------------
    // GENERATE NEW OTP
    // --------------------------------

    const otp = generateOtp();

    // Hash OTP before storing it
    const otpHash = await hashOtp(otp);

    // OTP expires after 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const now = new Date();

    // --------------------------------
    // UPDATE PENDING REGISTRATION
    // --------------------------------

    await prisma.pendingRegistration.update({
      where: {
        email,
      },
      data: {
        // Replace old OTP
        otpHash,

        // New expiration time
        expiresAt,

        // Reset failed verification attempts
        attempts: 0,

        // Start new 60-second cooldown
        lastSentAt: now,

        // Increase resend counter
        resendCount: {
          increment: 1,
        },
      },
    });

    // --------------------------------
    // SEND NEW OTP EMAIL
    // --------------------------------

    await sendVerificationEmail(email, otp);

    // --------------------------------
    // SUCCESS RESPONSE
    // --------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "A new verification code has been sent.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Resend OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to send a new verification code.",
      },
      {
        status: 500,
      },
    );
  }
}
