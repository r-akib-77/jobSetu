"use client";

import { MapPin, Search } from "lucide-react";

const popularSearches = [
  {
    name: "React",
    className:
      "border-cyan-100 bg-cyan-50 text-cyan-700 hover:border-cyan-200 hover:bg-cyan-100",
  },
  {
    name: "Next.js",
    className:
      "border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-200 hover:bg-blue-100",
  },
  {
    name: "Remote",
    className:
      "border-green-100 bg-green-50 text-green-700 hover:border-green-200 hover:bg-green-100",
  },
  {
    name: "Designer",
    className:
      "border-purple-100 bg-purple-50 text-purple-700 hover:border-purple-200 hover:bg-purple-100",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA]">
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-180px]
          h-[420px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-blue-100/40
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-center
          px-4
          pb-14
          pt-12
          text-center

          sm:px-6
          sm:pb-20
          sm:pt-16

          lg:px-8
          lg:pb-24
          lg:pt-20
        "
      >
        {/* Badge */}
        <div
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-blue-100
            bg-blue-50
            px-3.5
            py-1.5
            text-xs
            font-medium
            text-blue-600

            sm:text-sm
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          Find your next opportunity
        </div>

        {/* Heading */}
        <div className="w-full max-w-4xl">
          <h1
            className="
              text-[2.15rem]
              font-bold
              leading-[1.08]
              tracking-[-0.04em]
              text-[#111827]

              sm:text-5xl

              lg:text-[4.25rem]
              lg:leading-[1.05]
          "
          >
            Find work that{" "}
            <span className="text-[#2563EB]">works for you.</span>
          </h1>

          <p
            className="
              mx-auto
              mt-5
              max-w-[350px]
              text-sm
              leading-6
              text-[#64748B]

              sm:max-w-2xl
              sm:text-base
              sm:leading-7

              lg:mt-6
              lg:max-w-2xl
              lg:text-lg
              lg:leading-8
          "
          >
            Discover jobs that match your skills, experience, and the way you
            want to work.
          </p>
        </div>

        {/* Search */}
        <div
          className="
            mt-8
            w-full
            max-w-4xl

            sm:mt-10

            lg:mt-12
            lg:max-w-5xl
          "
        >
          <form
            className="
              rounded-2xl
              border
              border-[#E5E7EB]
              bg-white
              p-2
              shadow-[0_12px_40px_rgba(15,23,42,0.08)]

              sm:p-3

              md:flex
              md:items-center
              md:gap-0
            "
          >
            {/* Job input */}
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-3
                rounded-xl
                bg-[#F8FAFC]
                px-4

                sm:px-5

                md:bg-transparent
              "
            >
              <Search size={20} className="shrink-0 text-[#64748B]" />

              <input
                type="text"
                placeholder="Job title, skill or keyword"
                className="
                  min-w-0
                  w-full
                  bg-transparent
                  py-3.5
                  text-sm
                  text-[#111827]
                  outline-none
                  placeholder:text-[#94A3B8]

                  lg:py-4
                "
              />
            </div>

            {/* Desktop divider */}
            <div
              className="
                mx-3
                my-1
                h-px
                bg-[#E5E7EB]

                md:my-0
                md:h-9
                md:w-px
              "
            />

            {/* Location input */}
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-3
                rounded-xl
                bg-[#F8FAFC]
                px-4

                sm:px-5

                md:bg-transparent
              "
            >
              <MapPin size={20} className="shrink-0 text-[#64748B]" />

              <input
                type="text"
                placeholder="Location or Remote"
                className="
                  min-w-0
                  w-full
                  bg-transparent
                  py-3.5
                  text-sm
                  text-[#111827]
                  outline-none
                  placeholder:text-[#94A3B8]

                  lg:py-4
                "
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
                mt-2
                flex
                w-full
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#2563EB]
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-[#1D4ED8]
                hover:shadow-md
                active:scale-[0.98]

                md:mt-0
                md:w-auto

                lg:px-8
                lg:py-4
              "
            >
              <Search size={17} />
              Search Jobs
            </button>
          </form>
        </div>

        {/* Popular searches */}
        <div
          className="
            mt-5
            flex
            w-full
            flex-wrap
            items-center
            justify-center
            gap-2

            sm:mt-6
          "
        >
          <span
            className="
              mr-1
              text-xs
              font-medium
              text-[#64748B]

              sm:text-sm
            "
          >
            Popular:
          </span>

          {popularSearches.map((search) => (
            <button
              key={search.name}
              type="button"
              className={`
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-semibold
                transition-all
                duration-200
                hover:-translate-y-0.5
                active:scale-95

                sm:px-3.5
                sm:py-2
                sm:text-sm

                ${search.className}
              `}
            >
              {search.name}
            </button>
          ))}
        </div>

        {/* Trust text */}
        <div
          className="
            mt-7
            flex
            items-center
            gap-2
            text-[11px]
            text-[#94A3B8]

            sm:mt-8
            sm:text-xs
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          New opportunities added regularly
        </div>
      </div>
    </section>
  );
}
