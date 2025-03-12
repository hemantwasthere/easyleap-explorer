import { Copy } from "lucide-react";
import React from "react";

import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = React.memo(({ text }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    copyToClipboard(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
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
  );
});

CopyButton.displayName = "CopyButton";
