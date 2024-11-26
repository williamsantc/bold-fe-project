import { Transaction } from "@/lib/type/Transaction";
import { useQuery } from "react-query";

export const useGetDashboard = () => {
  return useQuery(['dashboard'], getDashboard, {
    refetchOnWindowFocus: false,
  });
};

export const getDashboard = async (): Promise<Transaction[]> => {
  const response = await fetch('https://bold-fe-api.vercel.app/api');
  const payload = await response.json() as { data: Transaction[]; };
  return payload.data;
};
