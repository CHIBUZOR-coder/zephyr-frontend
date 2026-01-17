import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/query/queryKeys"; 

// fake async function (Day 3 demo only)
const fetchWalletBalance = async (address: string) => {
  await new Promise((res) => setTimeout(res, 800));
  return {
    address,
    balance: 12.45,
  };
};

export const useWalletBalance = (address?: string) => {
  return useQuery({
    queryKey: address
      ? queryKeys.wallet.balance(address)
      : ["wallet", "balance", "empty"],
    queryFn: () => fetchWalletBalance(address!),
    enabled: !!address, // important
  });
};
