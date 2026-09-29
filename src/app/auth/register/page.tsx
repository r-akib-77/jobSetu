"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Eye,
  EyeOff,
  Search,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

import { registerUser } from "@/actions/auth";

type AccountType = "candidate" | "employer";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: "candidate",
      name: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const accountType = watch("accountType");

  const onSubmit = async (data: RegisterInput) => {
    setServerError("");

    const result = await registerUser(data);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="flex min-h-screen">
        {/* =================================
            REGISTER SECTION
        ================================== */}
        <section
          className="
            flex
            w-full
            items-center
            justify-center
            px-5
            py-10
            sm:px-8
            sm:py-12
            lg:w-1/2
            lg:px-12
            xl:px-20
          "
        >
          <div className="w-full max-w-[450px]">
            {/* Heading */}
            <div className="mb-7">
              <h1
                className="
                  text-[2rem]
                  font-bold
                  tracking-[-0.035em]
                  text-[#111827]
                  sm:text-4xl
                "
              >
                Create your account
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
                Join JobSetu and discover your next opportunity.
              </p>
            </div>

            {/* Account Type */}
            <div className="mb-7">
              <p className="mb-3 text-sm font-medium text-[#111827]">
                I want to
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* Candidate */}
                <button
                  type="button"
                  onClick={() =>
                    setValue("accountType", "candidate", {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`
                    relative
                    flex
                    min-h-[88px]
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    px-3
                    py-4
                    text-center
                    transition-all
                    ${
                      accountType === "candidate"
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB] ring-1 ring-[#2563EB]"
                        : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]"
                    }
                  `}
                >
                  {accountType === "candidate" && (
                    <span
                      className="
                        absolute
                        right-2.5
                        top-2.5
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2563EB]
                        text-white
                      "
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}

                  <UserRound size={21} />

                  <span className="mt-2 text-sm font-semibold">Job Seeker</span>

                  <span className="mt-0.5 text-[10px] opacity-75">
                    Find your next job
                  </span>
                </button>

                {/* Employer */}
                <button
                  type="button"
                  onClick={() =>
                    setValue("accountType", "employer", {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className={`
                    relative
                    flex
                    min-h-[88px]
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    px-3
                    py-4
                    text-center
                    transition-all
                    ${
                      accountType === "employer"
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB] ring-1 ring-[#2563EB]"
                        : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]"
                    }
                  `}
                >
                  {accountType === "employer" && (
                    <span
                      className="
                        absolute
                        right-2.5
                        top-2.5
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2563EB]
                        text-white
                      "
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}

                  <Building2 size={21} />

                  <span className="mt-2 text-sm font-semibold">Employer</span>

                  <span className="mt-0.5 text-[10px] opacity-75">
                    Hire great talent
                  </span>
                </button>
              </div>

              {errors.accountType && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.accountType.message}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-600
                "
              >
                {serverError}
              </div>
            )}

            {/* Register Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#111827]
                  "
                >
                  {accountType === "candidate" ? "Full name" : "Your name"}
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  placeholder="John Doe"
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

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Company */}
              {accountType === "employer" && (
                <div>
                  <label
                    htmlFor="company"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#111827]
                    "
                  >
                    Company name
                  </label>

                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Inc."
                    {...register("company")}
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

                  {errors.company && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.company.message}
                    </p>
                  )}
                </div>
              )}

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
                  type="email"
                  {...register("email")}
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

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#111827]
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password")}
                    placeholder="Create a password"
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

                {errors.password ? (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="mt-1.5 text-[11px] text-[#94A3B8]">
                    Use at least 8 characters.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#111827]
                  "
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                    placeholder="Confirm your password"
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
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
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
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="pt-1">
                <div className="flex items-start gap-2">
                  <input
                    id="terms"
                    type="checkbox"
                    {...register("terms")}
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      cursor-pointer
                      rounded
                      border-[#CBD5E1]
                      accent-[#2563EB]
                    "
                  />

                  <label
                    htmlFor="terms"
                    className="
                      cursor-pointer
                      text-xs
                      leading-5
                      text-[#64748B]
                    "
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="
                        font-medium
                        text-[#2563EB]
                        underline
                        underline-offset-2
                      "
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="
                        font-medium
                        text-[#2563EB]
                        underline
                        underline-offset-2
                      "
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {errors.terms && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* Create Account */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  group
                  mt-1
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? "Creating account..." : "Create account"}

                {!isSubmitting && (
                  <ArrowRight
                    size={17}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                    "
                  />
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E5E7EB]" />

              <span
                className="
                  text-[11px]
                  font-medium
                  text-[#94A3B8]
                "
              >
                OR
              </span>

              <div className="h-px flex-1 bg-[#E5E7EB]" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
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

            {/* Login */}
            <p
              className="
                mt-7
                text-center
                text-sm
                text-[#64748B]
              "
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="
                  font-semibold
                  text-[#2563EB]
                  hover:text-[#1D4ED8]
                "
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>

        {/* =================================
            DESKTOP VISUAL SECTION
        ================================== */}
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
              Start your journey
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
              Your next career
              <br />
              move starts here.
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
              Create your free account and discover opportunities that fit your
              skills, experience, and career goals.
            </p>

            {/* Feature cards */}
            <div className="mt-10 space-y-3">
              <Feature
                icon={<Search size={18} />}
                title="Discover opportunities"
                description="Find jobs that match your skills."
              />

              <Feature
                icon={<BriefcaseBusiness size={18} />}
                title="Build your career"
                description="Manage applications from one place."
              />

              <Feature
                icon={<UserRound size={18} />}
                title="Create your profile"
                description="Show employers what you can do."
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =================================
   FEATURE
================================== */

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-xl
        border
        border-white/10
        bg-white/10
        p-4
        backdrop-blur
      "
    >
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
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-white">{title}</p>

        <p className="mt-0.5 text-xs text-blue-100">{description}</p>
      </div>
    </div>
  );
}

/* =================================
   GOOGLE ICON
================================== */

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
