import { standariseAddress } from "@/lib/utils";
import { constants } from "starknet";

export const NETWORK =
  process.env.NEXT_PUBLIC_CHAIN_ID === "SN_SEPOLIA"
    ? constants.NetworkName.SN_SEPOLIA
    : constants.NetworkName.SN_MAIN;

export const isMainnet = () => {
  return NETWORK === constants.NetworkName.SN_MAIN;
};

export const TOKENS = [
  {
    token: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    name: "ETH",
    decimals: 18,
    displayDecimals: 4,
  },
  {
    token: standariseAddress(
      "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d"
    ),
    name: "STRK",
    decimals: 18,
    displayDecimals: 2,
  },
  {
    token: standariseAddress(
      "0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a"
    ),
    name: "xSTRK",
    decimals: 18,
    displayDecimals: 2,
  },
  {
    token: "0x06d8fa671ef84f791b7f601fa79fea8f6ceb70b5fa84189e3159d532162efc21",
    name: "zSTRK",
    decimals: 18,
    displayDecimals: 2,
  },
  {
    token: "0x057146f6409deb4c9fa12866915dd952aa07c1eb2752e451d7f3b042086bdeb8",
    name: "iETH-c", // nostra eth collateral
    decimals: 18,
    displayDecimals: 2,
  },
  {
    token: "0x1b5bd713e72fdc5d63ffd83762f81297f6175a5e0a4771cdadbc1dd5fe72cb1",
    name: "zETH",
    decimals: 18,
    displayDecimals: 4,
  },
  {
    name: "frmzSTRK",
    decimals: 18,
    displayDecimals: 2,
  },
  {
    token: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    name: "USDC",
    decimals: 6,
    displayDecimals: 2,
  },
  {
    token: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    name: "USDT",
    decimals: 6,
    displayDecimals: 2,
  },
  {
    token: "0x047ad51726d891f972e74e4ad858a261b43869f7126ce7436ee0b2529a98f486",
    name: "zUSDC",
    decimals: 6,
    displayDecimals: 2,
  },
  {
    name: "frmzUSDC",
    decimals: 6,
    displayDecimals: 2,
  },
  {
    name: "frmxSTRK",
    decimals: 18,
    displayDecimals: 2,
  },
  {
    token: standariseAddress(
      "0x045cd05ee2caaac3459b87e5e2480099d201be2f62243f839f00e10dde7f500c"
    ),
    name: "kSTRK",
    decimals: 18,
    displayDecimals: 2,
  },
];
