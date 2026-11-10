import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="mx-auto max-h-[90vh] bg-white text-black">
      <div className="relative isolate bg-white mt-20 md:mt-0 px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-indigo-500 to-cyan-500 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl py-22 sm:py-48 lg:py-56 text-center">
          <div className="inline-flex items-center gap-1.5 rounded border border-gray-200 bg-white px-4 py-1 text-sm text-gray-600 mb-8">
            Discover hackathons from top platforms{" "}
            <Link href="/hackathon" className="font-semibold text-blue-600">
              Explore now<span aria-hidden="true"> →</span>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="md:text-6xl text-5xl font-[Header] font-bold tracking-tight text-gray-900 sm:text-7xl">
              Find hackathons.
              <br />
              Build. Compete. Win.
            </h1>

            <p className="mt-8 text-sm md:text-lg text-gray-600">
              Discover global hackathons across Web, AI, Blockchain, and Open
              Source. Track deadlines, prizes, and platforms all in one place.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button className="bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition">
                Browse Hackathons
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
