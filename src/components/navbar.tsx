"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Input } from "@/components/ui/input";

import { truncateHash } from "@/lib/utils";
import { type Column } from "./table/columns";

export default function Navbar({ transactions }: { transactions: Column[] }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState<any[]>([]);
  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredResults([]);
        return;
      }
      const results = transactions.filter((txn) =>
        txn.bridgeTxn.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, transactions]);

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

        <div className="mx-4 flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-full bg-slate-800 border-slate-700 pl-8 pr-4 text-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </div>

          {showResults && filteredResults.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-20">
              {filteredResults.map((txn) => (
                <div
                  key={txn.txHash}
                  className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-slate-200 flex items-center text-xs"
                >
                  Request ID: {txn.requestId} - {"  "}
                  {truncateHash(txn.bridgeTxn, 16, 16)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
