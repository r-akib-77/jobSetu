"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  GraduationCap,
  Laptop,
  Lightbulb,
  Menu,
  X,
} from "lucide-react";

const careerResources = [
  {
    title: "Resume & CV",
    description: "Build a resume that gets noticed",
    href: "/career-resources/resume",
    icon: FileText,
  },
  {
    title: "Interview Preparation",
    description: "Prepare with confidence",
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
    description: "Practical tips for your career",
    href: "/career-resources/advice",
    icon: Lightbulb,
  },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setCareerOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="relative z-50 lg:hidden">
      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}
      <nav className="sticky top-0 z-50 flex h-[68px] items-center justify-between border-b border-gray-200 bg-white px-5">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <BriefcaseBusiness size={20} strokeWidth={2.2} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            JobSetu
          </span>
        </Link>

        {/* Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-all duration-200 hover:bg-gray-100 active:scale-95"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`absolute transition-all duration-300 ${
              isOpen
                ? "rotate-90 scale-100 opacity-100"
                : "rotate-0 scale-100 opacity-100"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </span>
        </button>
      </nav>

      {/* =====================================================
          BACKDROP
      ====================================================== */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 top-[68px] z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <div
        className={`absolute left-0 right-0 top-[68px] z-50 overflow-hidden border-b border-gray-200 bg-white shadow-xl transition-all duration-300 ease-out ${
          isOpen
            ? "visible max-h-[calc(100vh-68px)] translate-y-0 opacity-100"
            : "invisible max-h-0 -translate-y-3 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto px-5 pb-6">
          {/* =================================================
              NAVIGATION
          ================================================== */}
          <div className="space-y-1 py-4">
            {/* Find Jobs */}
            <Link
              href="/jobs"
              onClick={closeMenu}
              className="group flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <span>Find Jobs</span>

              <ArrowRight
                size={17}
                className="translate-x-0 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600 group-hover:opacity-100"
              />
            </Link>

            {/* Companies */}
            <Link
              href="/companies"
              onClick={closeMenu}
              className="group flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <span>Companies</span>

              <ArrowRight
                size={17}
                className="translate-x-0 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600 group-hover:opacity-100"
              />
            </Link>

            {/* =================================================
                CAREER RESOURCES
            ================================================== */}
            <div className="overflow-hidden rounded-xl">
              <button
                type="button"
                onClick={() => setCareerOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left transition-all duration-200 ${
                  careerOpen
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                aria-expanded={careerOpen}
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                      careerOpen
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <GraduationCap size={18} />
                  </div>

                  {/* Text */}
                  <div>
                    <span className="block text-sm font-semibold">
                      Career Resources
                    </span>

                    <span
                      className={`mt-0.5 block text-[11px] font-normal ${
                        careerOpen ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      Guides, tips & career advice
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                    careerOpen
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${
                      careerOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Career Resources Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  careerOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="ml-3 mt-2 space-y-1 border-l-2 border-blue-100 pl-3">
                    {careerResources.map((resource, index) => {
                      const Icon = resource.icon;

                      return (
                        <Link
                          key={resource.title}
                          href={resource.href}
                          onClick={closeMenu}
                          style={{
                            transitionDelay: careerOpen
                              ? `${index * 40}ms`
                              : "0ms",
                          }}
                          className={`group flex items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-blue-50 ${
                            careerOpen
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-2 opacity-0"
                          }`}
                        >
                          {/* Resource Icon */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-all duration-200 group-hover:bg-blue-100 group-hover:text-blue-600">
                            <Icon size={18} />
                          </div>

                          {/* Resource Information */}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                              {resource.title}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-gray-400">
                              {resource.description}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            size={16}
                            className="shrink-0 -translate-x-1 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-blue-600 group-hover:opacity-100"
                          />
                        </Link>
                      );
                    })}

                    {/* View All Resources */}
                    <Link
                      href="/career-resources"
                      onClick={closeMenu}
                      className={`group mt-2 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 transition-all duration-300 hover:bg-blue-600 ${
                        careerOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      <span className="text-xs font-semibold text-gray-600 transition-colors group-hover:text-white">
                        View all career resources
                      </span>

                      <ArrowRight
                        size={15}
                        className="text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <Link
              href="/employers"
              onClick={closeMenu}
              className="group flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <span>For Employers</span>

              <ArrowRight
                size={17}
                className="translate-x-0 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600 group-hover:opacity-100"
              />
            </Link>
          </div>

          {/* =================================================
              AUTH BUTTONS
          ================================================== */}
          <div className="border-t border-gray-100 pt-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Login */}
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
              >
                Login
              </Link>

              {/* Sign Up */}
              <Link
                href="/register"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
