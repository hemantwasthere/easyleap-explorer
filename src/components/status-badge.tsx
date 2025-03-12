import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status: "Pending" | "Successful" | "Refunded";
  txHash?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = React.memo(
  ({ status, txHash }) => {
    const statusStyles = {
      Pending: "bg-yellow-900/20 text-yellow-400",
      Successful: "bg-green-900/20 text-green-400",
      Refunded: "bg-red-900/20 text-red-400",
    };

    return (
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusStyles[status]
          )}
        >
          {status}
        </span>

        {txHash && (
          <Link
            href={`https://sepolia.voyager.online/tx/${txHash}`}
            target="_blank"
            className="text-slate-400 hover:text-blue-400 transition-colors"
            title="View on explorer"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
    );
  }
);

StatusBadge.displayName = "StatusBadge";
