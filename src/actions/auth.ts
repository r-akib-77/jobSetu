"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendVerificationEmail } from "@/lib/email";
import bcrypt from "bcryptjs";

export async function registerUser(data: unknown) {
  // -----------------------------
  // Validate form
  // -----------------------------

  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Please check the form fields.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { accountType, name, company, email, password } = result.data;

  const normalizedEmail = email.toLowerCase().trim();

  try {
    // -----------------------------
    // Check existing verified user
    // -----------------------------

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    // -----------------------------
    // Generate OTP
    // -----------------------------

    const otp = generateOtp();

    // -----------------------------
    // Hash password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(password, 12);

    // -----------------------------
    // Hash OTP
    // -----------------------------

    const otpHash = await hashOtp(otp);

    // -----------------------------
    // OTP expires in 10 minutes
    // -----------------------------

    const now = new Date();

    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

    // -----------------------------
    // Remove previous pending
    // registration
    // -----------------------------

    await prisma.pendingRegistration.deleteMany({
      where: {
        email: normalizedEmail,
      },
    });

    // -----------------------------
    // Create pending registration
    // -----------------------------

    await prisma.pendingRegistration.create({
      data: {
        name: name.trim(),

        email: normalizedEmail,

        password: hashedPassword,

        accountType: accountType === "candidate" ? "CANDIDATE" : "EMPLOYER",

        companyName: accountType === "employer" ? company?.trim() : null,

        otpHash,

        expiresAt,

        // OTP security
        attempts: 0,

        // Used by backend to enforce
        // the 60-second resend cooldown
        lastSentAt: now,

        // Initial OTP is not a resend
        resendCount: 0,
      },
    });

    // -----------------------------
    // Send OTP email
    // -----------------------------

    await sendVerificationEmail(normalizedEmail, otp);

    // -----------------------------
    // Success
    // -----------------------------

    return {
      success: true,
      email: normalizedEmail,
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
