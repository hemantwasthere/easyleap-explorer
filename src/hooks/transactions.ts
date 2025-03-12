"use server";

import { gql } from "@apollo/client";

import apolloClient from "@/lib/apollo-client";
// import { standariseAddress } from "@/lib/utils";

export const getTransactions = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query Query {
        findManyDestination_requests {
          amount_raw
          block_number
          chain
          l2_owner
          status
          cursor
          eventIndex
          request_id
          timestamp
          token
          txHash
          txIndex
        }
        findManySource_requests {
          status
          receiver
          amount_raw
          block_number
          chain
          cursor
          eventIndex
          request_id
          sender
          timestamp
          token
          txHash
          txIndex
        }
      }
    `,
  });

  return data;
};
