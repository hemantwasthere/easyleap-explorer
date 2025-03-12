import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export interface PaginationProps {
  transactionsLength: number;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  indexOfFirstItem: number;
  indexOfLastItem: number;
}

const Pagination: React.FC<PaginationProps> = ({
  transactionsLength,
  currentPage,
  totalPages,
  goToPage,
  goToPrevPage,
  goToNextPage,
  indexOfFirstItem,
  indexOfLastItem,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-slate-800">
      <div className="text-sm text-slate-400">
        Showing{" "}
        <span className="font-medium text-slate-300">
          {indexOfFirstItem + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium text-slate-300">
          {Math.min(indexOfLastItem, transactionsLength)}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-300">{transactionsLength}</span>{" "}
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
  );
};

export default Pagination;
