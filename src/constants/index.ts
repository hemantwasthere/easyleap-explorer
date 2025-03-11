import { constants } from "starknet";

export const NETWORK =
  process.env.NEXT_PUBLIC_CHAIN_ID === "SN_SEPOLIA"
    ? constants.NetworkName.SN_SEPOLIA
    : constants.NetworkName.SN_MAIN;

export const isMainnet = () => {
  return NETWORK === constants.NetworkName.SN_MAIN;
};
