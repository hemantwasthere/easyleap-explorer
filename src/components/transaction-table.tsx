"use client";

import React, { useState } from "react";

import Pagination from "./pagination";
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
    <main>
      <div className="container mx-auto px-4 py-8">
        <DataTable
          searchKey="bridgeTxn"
          columns={columns}
          data={currentItems}
        />

        <div className="rounded-b-lg border border-t-0 border-slate-800 bg-slate-900 px-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
            goToPage={goToPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            transactionsLength={transactions.length}
          />
        </div>
      </div>
    </main>
  );
}
