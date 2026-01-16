import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mx-auto bg-white text-black" >
      <div className="relative isolate bg-white mt-10 md:mt-0 px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-indigo-200 to-cyan-200 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              🚀 Discover hackathons from top platforms{" "}
              <a href="/hackathon" className="font-semibold text-indigo-900">
                <span aria-hidden="true" className="absolute inset-0" />
                Explore now <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Find hackathons.
              <br />
              Build. Compete. Win.
            </h1>

            <p className="mt-8 text-lg font-medium text-gray-600 sm:text-xl">
              Discover global hackathons across Web, AI, Blockchain, and Open
              Source. Track deadlines, prizes, and platforms all in one place.
            </p>

            {/* CTA */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/hackathon"
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Browse Hackathons
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
