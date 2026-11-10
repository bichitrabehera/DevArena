"use client";
import Link from "next/link";
import React from "react";
import { GithubIcon } from "lucide-react";

const navigation = [
  { name: "Hackathons", href: "/hackathon" },
  { name: "About", href: "/about" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50  backdrop-blur-xl bg-white/5">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-[Header] font-semibold text-blue-600">
              DevArena
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 font-[Header]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-700 hover:text-blue-600 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
