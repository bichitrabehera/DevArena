import { GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between text-sm text-gray-600">
        <p>
          DevArena is an open-source project
        </p>

        <a
          href="https://github.com/bichitrabehera/DevArena.git"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="DevArena GitHub Repository"
          className="text-gray-600 hover:text-gray-900 transition"
        >
          <GithubIcon className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
