"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);

  // --------------------------------
  // RESEND COUNTDOWN
  // --------------------------------

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendCooldown((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [resendCooldown]);

  // --------------------------------
  // VERIFY OTP
  // --------------------------------

  async function handleVerify() {
    setError("");

    if (!email) {
      setError("Email address is missing.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Invalid verification code.");
        return;
      }

      // Email verified successfully
      router.push("/login?verified=true");
    } catch (error) {
      console.error("Verification error:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // --------------------------------
  // RESEND OTP
  // --------------------------------

  async function handleResend() {
    setError("");

    if (!email) {
      setError("Email address is missing.");
      return;
    }

    // Frontend cooldown
    if (resendCooldown > 0) {
      setError(
        `Please wait ${resendCooldown} seconds before requesting another code.`,
      );
      return;
    }

    if (resending) {
      return;
    }

    setResending(true);

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const result = await response.json();

      // --------------------------------
      // SERVER ERROR / RATE LIMIT
      // --------------------------------

      if (!response.ok || !result.success) {
        if (result.remainingSeconds) {
          setResendCooldown(result.remainingSeconds);
        }

        setError(result.error || "Unable to send a new verification code.");

        return;
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      setOtp("");

      setResendCooldown(60);

      setError("");
    } catch (error) {
      console.error("Resend OTP error:", error);

      setError("Unable to resend the verification code. Please try again.");
    } finally {
      setResending(false);
    }
  }

  // --------------------------------
  // RENDER
  // --------------------------------

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.25 10.94 13.4a2 2 0 0 0 2.12 0L21 8.25M5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-10.5A2.25 2.25 0 0 0 18.75 4.5H5.25A2.25 2.25 0 0 0 3 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Verify your email
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We&apos;ve sent a 6-digit verification code to
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-900">
              {email || "your email address"}
            </p>
          </div>

          {/* OTP */}
          <div className="mt-7">
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Verification code
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => {
                setError("");

                const value = e.target.value.replace(/\D/g, "").slice(0, 6);

                setOtp(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && otp.length === 6 && !loading) {
                  handleVerify();
                }
              }}
              maxLength={6}
              placeholder="000000"
              disabled={loading}
              className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-center text-2xl font-bold tracking-[0.5em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {/* Error */}
            {error && (
              <p className="mt-2 text-center text-sm font-medium text-red-500">
                {error}
              </p>
            )}
          </div>

          {/* Verify button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Verifying...
              </>
            ) : (
              "Verify email"
            )}
          </button>

          {/* Resend */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Didn&apos;t receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending || resendCooldown > 0}
              className="mt-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
            >
              {resending
                ? "Sending..."
                : resendCooldown > 0
                  ? `Resend code in ${resendCooldown}s`
                  : "Resend code"}
            </button>
          </div>

          {/* Login */}
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              ← Back to login
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-slate-400">
          The verification code expires after 10 minutes.
        </p>
      </div>
    </main>
  );
}
