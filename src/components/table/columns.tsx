"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { useGetTokensInfo } from "@/hooks/token";
import { formatDate, getTokenInfoFromAddr, truncateHash } from "@/lib/utils";

import { CopyButton } from "../copy-button";
import { StatusBadge, StatusBadgeProps } from "../status-badge";

export type Column = {
  requestId: string;
  srcTxn: string;
  srcChain: string;
  bridgeTxn: string;
  amount: string;
  status: StatusBadgeProps["status"];
  txHash: string;
  token: string;
  srcBlockNo: string;
  srcTimestamp: string;
  destBlockNo: string;
  destTimestamp: string;
};

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "requestId",
    header: "Request ID",
    cell: ({ row }) => row.original.requestId,
  },
  {
    accessorKey: "srcTxn",
    header: "Source Transaction",
    cell: ({ row }) => {
      const srcTxn = row.original.srcTxn;

      return srcTxn ? (
        <div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer text-blue-400 hover:underline font-medium">
              {truncateHash(srcTxn)}
            </span>
            <CopyButton text={srcTxn} />
          </div>
          <div className="mt-1 text-xs text-slate-400 flex flex-col font-medium">
            <span>Block: {row.original.srcBlockNo}</span>
            <span>
              {formatDate(new Date(Number(row.original.srcTimestamp) * 1000))}
            </span>
          </div>
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
      const bridgeTxn = row.original.bridgeTxn;
      return (
        <div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer text-blue-400 hover:underline font-medium">
              {truncateHash(bridgeTxn)}
            </span>
            <CopyButton text={bridgeTxn} />
          </div>
          <div className="mt-1 text-xs text-slate-400 flex flex-col font-medium">
            <span>Block: {row.original.destBlockNo}</span>
            <span>
              {formatDate(new Date(Number(row.original.destTimestamp) * 1000))}
            </span>
          </div>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const searchableRowContent = `${row.original.txHash} ${row.original.srcTxn} ${row.original.bridgeTxn} ${row.original.srcChain} ${row.original.status}`;

      return searchableRowContent
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const tokenInfo = useGetTokensInfo(row.original.token);

      const amount =
        Number(row.original.amount) / 10 ** (tokenInfo?.decimals ?? 18);

      return (
        <p className="font-medium flex items-center gap-2">
          {amount}
          <span className="text-sm font-semibold">
            {tokenInfo?.name ?? "..."}
          </span>
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} txHash={row.original.txHash} />
    ),
  },
];
