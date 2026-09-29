import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generateOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

export async function hashOtp(otp: string) {
  return bcrypt.hash(otp, 10);
}

export async function compareOtp(otp: string, otpHash: string) {
  return bcrypt.compare(otp, otpHash);
}
