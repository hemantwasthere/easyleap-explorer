"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900 px-4 py-5 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-400"
            >
              <path d="M6 9h6a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H6" />
              <path d="M15 5h3" />
              <path d="M18 5v14" />
              <path d="M18 9h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2" />
              <path d="M6 5v14" />
            </svg>
            Easyleap Explorer
          </Link>
        </div>
      </div>
    </nav>
  );
}
