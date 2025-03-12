"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  copyToClipboard,
  getTokenInfoFromAddr,
  truncateHash,
} from "@/lib/utils";

export type Column = {
  requestId: string;
  srcTxn: string;
  srcChain: string;
  bridgeTxn: string;
  amount: string;
  status: "pending" | "confirmed" | "failed";
  txHash: string;
  token: string;
};

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "request_id",
    header: "Request ID",
    cell: ({ row }) => row.original.requestId,
  },
  {
    accessorKey: "srcTxn",
    header: "Source Transaction",
    cell: ({ row }) => {
      const [isCopied, setIsCopied] = React.useState(false);

      const handleCopy = () => {
        copyToClipboard(row.original.srcTxn);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      };

      return row.original.srcTxn ? (
        <div className="flex items-center gap-2">
          <span className="cursor-pointer text-blue-400 hover:underline">
            {truncateHash(row.original.srcTxn)}
          </span>
          <button
            onClick={handleCopy}
            className="relative text-slate-400 hover:text-blue-400 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
            {isCopied && (
              <span className="absolute top-0 -right-12 text-xs text-green-400">
                Copied!
              </span>
            )}
          </button>
        </div>
      ) : (
        <span className="ml-4">-</span>
      );
    },
  },
  {
    accessorKey: "srcChain",
    header: "Source Chain",
    cell: ({ row }) => row.original.srcChain ?? <span className="ml-0">-</span>,
  },
  {
    accessorKey: "bridgeTxn",
    header: "Bridge Transaction",
    cell: ({ row }) => {
      const [isCopied, setIsCopied] = React.useState(false);

      const handleCopy = () => {
        copyToClipboard(row.original.bridgeTxn);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      };

      return (
        <div className="flex items-center gap-2">
          <span className="cursor-pointer text-blue-400 hover:underline">
            {truncateHash(row.original.bridgeTxn)}
          </span>
          <button
            onClick={handleCopy}
            className="relative text-slate-400 hover:text-blue-400 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
            {isCopied && (
              <span className="absolute top-0 -right-12 text-xs text-green-400">
                Copied!
              </span>
            )}
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span>
        {Number(row.original.amount) / 10 ** 18}{" "}
        {getTokenInfoFromAddr(row.original.token).name}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      if (status === "pending") {
        return (
          <span className="bg-yellow-900/20 text-yellow-400 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
            Pending
          </span>
        );
      }

      if (status === "confirmed") {
        return (
          <div className="flex items-center gap-2">
            <span className="bg-green-900/20 text-green-400 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
              Successful
            </span>

            <Link
              href={`https://sepolia.voyager.online/tx/${row.original?.txHash}`}
              target="_blank"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              title="View on explorer"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2">
          <span className="bg-red-900/20 text-red-400 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
            Refunded
          </span>

          <Link
            href={`https://sepolia.voyager.online/tx/${row.original?.txHash}`}
            target="_blank"
            className="text-slate-400 hover:text-blue-400 transition-colors"
            title="View on explorer"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      );
    },
  },
];
