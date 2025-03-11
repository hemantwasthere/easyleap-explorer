"use client";

import { ChevronLeft, ChevronRight, Copy, ExternalLink } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Update the sample data to include amount information
// const transactions = [
//   {
//     id: 1,
//     sourceTransaction: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
//     sourceChain: "Ethereum",
//     bridgeTransaction: "0xabcdef1234567890abcdef1234567890abcdef12",
//     amount: "100 ETH",
//     status: "Successful",
//   },
//   {
//     id: 2,
//     sourceTransaction: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
//     sourceChain: "Polygon",
//     bridgeTransaction: "0x1234567890abcdef1234567890abcdef12345678",
//     amount: "10000 MATIC",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     sourceTransaction: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
//     sourceChain: "Arbitrum",
//     bridgeTransaction: "0x7890abcdef1234567890abcdef1234567890abcd",
//     amount: "500 ARB",
//     status: "Refunded",
//   },
//   {
//     id: 4,
//     sourceTransaction: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
//     sourceChain: "Optimism",
//     bridgeTransaction: "0xef1234567890abcdef1234567890abcdef123456",
//     amount: "250 OP",
//     status: "Successful",
//   },
//   {
//     id: 5,
//     sourceTransaction: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d",
//     sourceChain: "Avalanche",
//     bridgeTransaction: "0x90abcdef1234567890abcdef1234567890abcdef",
//     amount: "10000 STRK",
//     status: "Pending",
//   },
//   {
//     id: 6,
//     sourceTransaction: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e",
//     sourceChain: "Ethereum",
//     bridgeTransaction: "0xabcdef1234567890abcdef1234567890abcdef34",
//     amount: "75 ETH",
//     status: "Successful",
//   },
//   {
//     id: 7,
//     sourceTransaction: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f",
//     sourceChain: "Polygon",
//     bridgeTransaction: "0x1234567890abcdef1234567890abcdef12345612",
//     amount: "5000 MATIC",
//     status: "Pending",
//   },
//   {
//     id: 8,
//     sourceTransaction: "0x8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g",
//     sourceChain: "Arbitrum",
//     bridgeTransaction: "0x7890abcdef1234567890abcdef1234567890ef12",
//     amount: "300 ARB",
//     status: "Refunded",
//   },
// ];

// Update the component to include pagination
export default function TransactionTable({ txns }: { txns: any }) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // filter the transactions if any txn has status as "pending" and same request id of that txn also exists with status "confirmed" then only take the txn with status "confirmed"
  const filteredTxns = txns?.findManyDestination_requests.filter((txn: any) => {
    const pendingTxn = txns?.findManyDestination_requests.find(
      (tx: any) => tx.request_id === txn.request_id && tx.status === "pending"
    );
    return txn.status === "confirmed" || !pendingTxn;
  });

  const transactions = filteredTxns.map((txn: any) => ({
    id: txn.request_id,
    sourceTransaction: txn.txHash,
    sourceChain: txn.chain,
    bridgeTransaction: txn.txHash,
    amount: txn.amount_raw,
    status: txn.status,
  }));

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Function to truncate transaction hash
  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 3)}`;
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

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

  console.log(txns, "txns");

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-900">
            <TableHead className="text-slate-300">Request ID</TableHead>
            <TableHead className="text-slate-300">Source Transaction</TableHead>
            <TableHead className="text-slate-300">Source Chain</TableHead>
            <TableHead className="text-slate-300">Bridge Transaction</TableHead>
            <TableHead className="text-slate-300">Amount</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((transaction: any) => (
            <TableRow
              key={transaction.id}
              className="border-slate-800 hover:bg-slate-800/50"
            >
              <TableCell>{transaction.id}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="cursor-pointer text-blue-400 hover:underline">
                    {truncateHash(transaction.sourceTransaction)}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(transaction.sourceTransaction)
                    }
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedText === transaction.sourceTransaction && (
                      <span className="absolute ml-1 text-xs text-green-400">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </TableCell>
              <TableCell>{transaction.sourceChain}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="cursor-pointer text-blue-400 hover:underline">
                    {truncateHash(transaction.bridgeTransaction)}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(transaction.bridgeTransaction)
                    }
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedText === transaction.bridgeTransaction && (
                      <span className="absolute ml-1 text-xs text-green-400">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </TableCell>
              <TableCell className="font-medium text-slate-300">
                {transaction.amount}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      transaction.status === "Successful" &&
                        "bg-green-900/20 text-green-400",
                      transaction.status === "Pending" &&
                        "bg-yellow-900/20 text-yellow-400",
                      transaction.status === "Refunded" &&
                        "bg-red-900/20 text-red-400"
                    )}
                  >
                    {transaction.status}
                  </span>
                  {(transaction.status === "Successful" ||
                    transaction.status === "Refunded") && (
                    <a
                      href="#"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                      title="View on explorer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
          <div className="flex items-center">
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
