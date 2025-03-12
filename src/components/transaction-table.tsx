"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { type Column, columns } from "./table/columns";
import { DataTable } from "./table/data-table";

// Update the component to include pagination
export default function TransactionTable({
  transactions,
}: {
  transactions: Column[];
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900">
      <DataTable columns={columns} data={currentItems} />

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-slate-800">
        <div className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-medium text-slate-300">
            {indexOfFirstItem + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-slate-300">
            {Math.min(indexOfLastItem, transactions.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-300">
            {transactions.length}
          </span>{" "}
          transactions
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100 disabled:opacity-50"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="outline"
                size="sm"
                onClick={() => goToPage(page)}
                className={cn(
                  "h-8 w-8 p-0 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100",
                  currentPage === page &&
                    "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                )}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100 disabled:opacity-50"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
