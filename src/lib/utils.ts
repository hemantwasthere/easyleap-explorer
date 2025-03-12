import { clsx, type ClassValue } from "clsx";
import { num } from "starknet";
import { twMerge } from "tailwind-merge";

import { TOKENS } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function standariseAddress(address: string | bigint) {
  let _a = address;
  if (!address) {
    _a = "0";
  }
  const a = num.getHexString(num.getDecimalString(_a.toString()));
  return a;
}

export function getTokenInfoFromAddr(tokenAddr: string) {
  const info = TOKENS.find(
    (t) => standariseAddress(t.token!) === standariseAddress(tokenAddr)
  );
  if (!info) {
    throw new Error("Token not found");
  }
  return info;
}

export const truncateHash = (
  hash: string,
  start: number = 6,
  end: number = 3
) => {
  return `${hash?.substring(0, start)}...${hash?.substring(hash.length - end)}`;
};

// Function to copy text to clipboard
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
