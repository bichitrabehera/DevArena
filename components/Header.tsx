"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  const navigation = [
    { name: "Hackathons", href: "/hackathon" },
    { name: "About", href: "/about" },
    // { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b  border-black/10 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            <Link href="/">DevArena</Link>
          </h1>

          <nav className="flex items-center gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
