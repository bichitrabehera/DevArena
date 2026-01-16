import React from "react";
import { Github, Linkedin, Globe } from "lucide-react";

const people = [
  {
    name: "Matharishwa S",
    description:
      "A third-year student at AMC Engineering College, Bangalore. I enjoy building practical products that solve real problems for students and developers. DevArena came from the idea that discovering hackathons shouldn’t be scattered or confusing.",
    social: {
      linkedin:
        "https://www.linkedin.com/in/matharishwa-s-322518325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Masaru124",
      portfolio: "https://port-react.vercel.app",
    },
  },
  {
    name: "Bichitra Behera",
    description:
      "I’m a full-stack developer building fast, reliable, user-centric products across web and mobile. I focus on clean architecture, thoughtful UI/UX, and scalable systems, with an emphasis on performance and long-term maintainability.",
    social: {
      linkedin: "https://linkedin.com/in/bichitrabehera",
      github: "https://github.com/bichitrabehera",
      portfolio: "https://bichitrabehera.vercel.app",
    },
  },
];

export default function page() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <div className="mb-14 text-center">
        <h1 className="text-xl font-semibold text-gray-900">About DevArena</h1>
        <p className="mt-4 text-sm text-gray-600">
          Built by students who love building things.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {people.map((p, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900">{p.name}</h2>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              {p.description}
            </p>

            <div className="mt-5 flex gap-4">
              <a
                href={p.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-gray-700 hover:bg-gray-50"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>

              <a
                href={p.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-gray-700 hover:bg-gray-50"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>

              <a
                href={p.social.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-gray-700 hover:bg-gray-50"
                aria-label="Portfolio"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
