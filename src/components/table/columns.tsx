"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { getTokenInfoFromAddr, truncateHash } from "@/lib/utils";

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
      const srcTxn = row.original.srcTxn;
      return srcTxn ? (
        <div className="flex items-center gap-2">
          <span className="cursor-pointer text-blue-400 hover:underline">
            {truncateHash(srcTxn)}
          </span>
          <CopyButton text={srcTxn} />
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
        <div className="flex items-center gap-2">
          <span className="cursor-pointer text-blue-400 hover:underline">
            {truncateHash(bridgeTxn)}
          </span>
          <CopyButton text={bridgeTxn} />
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
      const amount = Number(row.original.amount) / 10 ** 18;

      const tokenName = getTokenInfoFromAddr(row.original.token).name;

      return <span>{`${amount} ${tokenName}`}</span>;
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
