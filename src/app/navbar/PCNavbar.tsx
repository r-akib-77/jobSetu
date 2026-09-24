"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  GraduationCap,
  Laptop,
  Lightbulb,
  Menu,
} from "lucide-react";

const careerResources = [
  {
    title: "Resume & CV",
    description: "Build a professional resume",
    href: "/career-resources/resume",
    icon: FileText,
  },
  {
    title: "Interview Preparation",
    description: "Prepare for your next interview",
    href: "/career-resources/interview",
    icon: GraduationCap,
  },
  {
    title: "Remote Work Guide",
    description: "Learn how to work remotely",
    href: "/career-resources/remote-work",
    icon: Laptop,
  },
  {
    title: "Career Advice",
    description: "Tips to grow your career",
    href: "/career-resources/advice",
    icon: Lightbulb,
  },
];

const navItems = [
  {
    label: "Find Jobs",
    href: "/jobs",
  },
  {
    label: "Companies",
    href: "/companies",
  },
  {
    label: "For Employers",
    href: "/employers",
  },
];

export default function PCNavbar() {
  const [careerOpen, setCareerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BriefcaseBusiness size={20} strokeWidth={2.2} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            JobSetu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Find Jobs */}
          <Link
            href="/jobs"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            Find Jobs
          </Link>

          {/* Companies */}
          <Link
            href="/companies"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            Companies
          </Link>

          {/* Career Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCareerOpen(true)}
            onMouseLeave={() => setCareerOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
              onClick={() => setCareerOpen((prev) => !prev)}
            >
              Career Resources
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  careerOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {careerOpen && (
              <div className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-4">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                  {careerResources.map((resource) => {
                    const Icon = resource.icon;

                    return (
                      <Link
                        key={resource.title}
                        href={resource.href}
                        className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Icon size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {resource.title}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {resource.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}

                  <div className="mt-1 border-t border-gray-100 px-3 py-3">
                    <Link
                      href="/career-resources"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View all resources →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* For Employers */}
          <Link
            href="/employers"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            For Employers
          </Link>
        </div>

        {/* Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>
    </header>
  );
}
