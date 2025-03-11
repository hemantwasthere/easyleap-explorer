import { Search } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900 px-4 py-3 shadow-md">
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
            BridgeTracker
          </Link>
        </div>

        <div className="mx-4 flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-full bg-slate-800 border-slate-700 pl-8 text-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Additional navbar items could go here */}
        </div>
      </div>
    </nav>
  );
}
