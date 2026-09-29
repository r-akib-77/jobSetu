"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Search,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="flex min-h-screen">
        {/* =========================
            LOGIN SECTION
        ========================== */}
        <section
          className="
            flex
            w-full
            items-center
            justify-center
            px-5
            py-10

            sm:px-8

            lg:w-1/2
            lg:px-12
            xl:px-20
          "
        >
          <div className="w-full max-w-[430px]">
            {/* Heading */}
            <div className="mb-8">
              <h1
                className="
                  text-[2rem]
                  font-bold
                  tracking-[-0.035em]
                  text-[#111827]

                  sm:text-4xl
                "
              >
                Welcome back
              </h1>

              <p
                className="
                  mt-2.5
                  text-sm
                  leading-6
                  text-[#64748B]

                  sm:text-base
                "
              >
                Sign in to continue finding opportunities that match your career
                goals.
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#111827]
                  "
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-4
                    text-sm
                    text-[#111827]
                    outline-none
                    transition-all
                    placeholder:text-[#94A3B8]

                    hover:border-[#CBD5E1]

                    focus:border-[#2563EB]
                    focus:ring-4
                    focus:ring-blue-50
                  "
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="
                      text-sm
                      font-medium
                      text-[#111827]
                    "
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="
                      text-xs
                      font-medium
                      text-[#2563EB]
                      transition
                      hover:text-[#1D4ED8]

                      sm:text-sm
                    "
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-[#E2E8F0]
                      bg-white
                      px-4
                      pr-12
                      text-sm
                      text-[#111827]
                      outline-none
                      transition-all
                      placeholder:text-[#94A3B8]

                      hover:border-[#CBD5E1]

                      focus:border-[#2563EB]
                      focus:ring-4
                      focus:ring-blue-50
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="
                      absolute
                      right-0
                      top-0
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      text-[#94A3B8]
                      transition
                      hover:text-[#475569]
                    "
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="
                    h-4
                    w-4
                    cursor-pointer
                    rounded
                    border-[#CBD5E1]
                    accent-[#2563EB]
                  "
                />

                <label
                  htmlFor="remember"
                  className="
                    cursor-pointer
                    text-sm
                    text-[#64748B]
                  "
                >
                  Remember me
                </label>
              </div>

              {/* Sign in */}
              <button
                type="submit"
                className="
                  group
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#2563EB]
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200

                  hover:bg-[#1D4ED8]
                  hover:shadow-md

                  active:scale-[0.99]
                "
              >
                Sign in
                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E5E7EB]" />

              <span
                className="
                  text-[11px]
                  font-medium
                  text-[#94A3B8]
                "
              >
                OR CONTINUE WITH
              </span>

              <div className="h-px flex-1 bg-[#E5E7EB]" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-[#E2E8F0]
                bg-white
                px-5
                text-sm
                font-semibold
                text-[#111827]
                transition-all

                hover:border-[#CBD5E1]
                hover:bg-[#F8FAFC]

                active:scale-[0.99]
              "
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Sign up */}
            <p
              className="
                mt-8
                text-center
                text-sm
                text-[#64748B]
              "
            >
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="
                  font-semibold
                  text-[#2563EB]
                  hover:text-[#1D4ED8]
                "
              >
                Create an account
              </Link>
            </p>

            {/* Terms */}
            <p
              className="
                mx-auto
                mt-7
                max-w-sm
                text-center
                text-[11px]
                leading-5
                text-[#94A3B8]
              "
            >
              By continuing, you agree to JobSetu's{" "}
              <Link
                href="/terms"
                className="
                  underline
                  underline-offset-2
                  hover:text-[#64748B]
                "
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="
                  underline
                  underline-offset-2
                  hover:text-[#64748B]
                "
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        {/* =========================
            DESKTOP VISUAL SECTION
        ========================== */}
        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#2563EB]

            lg:flex
            lg:w-1/2
            lg:items-center
            lg:justify-center
          "
        >
          {/* Decorative circles */}
          <div
            className="
              absolute
              -right-40
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              border-[90px]
              border-white/[0.06]
            "
          />

          <div
            className="
              absolute
              -bottom-48
              -left-48
              h-[600px]
              w-[600px]
              rounded-full
              border-[100px]
              border-white/[0.06]
            "
          />

          {/* Glow */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blue-500/30
              blur-3xl
            "
          />

          {/* Content */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-xl
              px-12

              xl:px-16
            "
          >
            {/* Badge */}
            <div
              className="
                mb-8
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-white/10
                px-3.5
                py-2
                text-xs
                font-medium
                text-blue-50
                backdrop-blur
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
              Your next opportunity is waiting
            </div>

            {/* Heading */}
            <h2
              className="
                max-w-lg
                text-4xl
                font-bold
                leading-[1.1]
                tracking-[-0.035em]
                text-white

                xl:text-5xl
              "
            >
              Find work that
              <br />
              works for you.
            </h2>

            <p
              className="
                mt-6
                max-w-md
                text-base
                leading-7
                text-blue-100
              "
            >
              Search thousands of opportunities and discover companies looking
              for people with your skills.
            </p>

            {/* Search preview */}
            <div
              className="
                mt-10
                rounded-2xl
                border
                border-white/15
                bg-white/10
                p-3
                shadow-2xl
                backdrop-blur-md
              "
            >
              {/* Search bar */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-white
                  px-4
                  py-3
                "
              >
                <Search size={18} className="text-[#64748B]" />

                <span
                  className="
                    text-sm
                    text-[#94A3B8]
                  "
                >
                  Search your next opportunity...
                </span>
              </div>

              {/* Job preview */}
              <div
                className="
                  mt-3
                  rounded-xl
                  bg-white/10
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-white
                      text-[#2563EB]
                    "
                  >
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Frontend Engineer
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        text-blue-100
                      "
                    >
                      Remote · React · Next.js
                    </p>
                  </div>

                  <div
                    className="
                      ml-auto
                      shrink-0
                      rounded-full
                      bg-green-400/15
                      px-2.5
                      py-1
                      text-[10px]
                      font-medium
                      text-green-200
                    "
                  >
                    Remote
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom message */}
            <div
              className="
                mt-6
                flex
                items-center
                gap-3
              "
            >
              <div className="flex -space-x-2">
                <div
                  className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-[#2563EB]
                    bg-blue-200
                  "
                />

                <div
                  className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-[#2563EB]
                    bg-blue-300
                  "
                />

                <div
                  className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-[#2563EB]
                    bg-blue-400
                  "
                />
              </div>

              <p
                className="
                  text-xs
                  leading-5
                  text-blue-100
                "
              >
                Join candidates discovering new opportunities every day.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================
   GOOGLE ICON
========================= */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
      />

      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.5Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.59A5.86 5.86 0 0 1 6.23 12c0-.55.11-1.09.31-1.59V7.88H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.12l3.24-2.53Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
      />
    </svg>
  );
}
