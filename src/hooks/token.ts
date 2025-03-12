import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { standariseAddress } from "@/lib/utils";

export const useGetTokensInfo = (tokenAddr: string) => {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["tokens"],
    queryFn: async () => {
      const res = await axios(
        "https://starknet.api.avnu.fi/v1/starknet/tokens"
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
  });

  if (isSuccess) {
    const tokenInfo = data.content.find(
      (token: any) => token.address === standariseAddress(tokenAddr)
    );

    return tokenInfo;
  }

  if (isError) {
    console.error("Error fetching tokens info");
    return null;
  }
};
