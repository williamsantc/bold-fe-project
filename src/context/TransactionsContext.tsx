'use client';
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { DateFilters } from "@/lib/constants/Filters";
import {
  filterTransactions,
  filterTransactionsByDateFilter,
  getVisualLabelForDateFilter
} from "@/lib/Filters";
import { Transaction } from "@/lib/type/Transaction";
import { useGetDashboard } from "@/api/BoldApi";
import { SalesType } from "@/lib/constants/SalesType";
import { calculateTotalSales } from "@/lib/Transaction";
import { CookieKey } from "@/lib/constants/cookie";

export type TransactionsContextType = {
    selectedFilter?: DateFilters | null;
    selectedFilterLabel?: string;
    setSelectedFilter: (filter: DateFilters) => void;
    totalSales?: number;
    transactions: Transaction[];
    areTransactionsLoading?: boolean;
    freeText?: string;
    setFreeText: (text: string) => void;
    error?: Error;
    salesTypeFilter: SalesType[];
    setSalesTypeFilter: (salesType: SalesType[]) => void;
    selectedTransaction?: Transaction | null;
    setSelectedTransaction: (transaction: Transaction | null) => void;
}

export const TransactionsContext = createContext<TransactionsContextType>({
  setSelectedFilter: () => {},
  transactions: [],
  setFreeText: () => {},
  salesTypeFilter: [],
  setSalesTypeFilter: () => {},
  setSelectedTransaction: () => {},
});

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, error, data } = useGetDashboard();
  const [selectedFilter, setSelectedFilter] = useState<DateFilters>(DateFilters.TODAY);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [freeText, setFreeText] = useState<string>('');
  const [salesTypeFilter, setSalesTypeFilter] = useState<SalesType[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const selectedFilterLabel = useMemo(() => getVisualLabelForDateFilter(selectedFilter), [selectedFilter]);

  const setFilter = (filter: DateFilters) => {
    setSelectedFilter(filter);
    Cookies.set(CookieKey.SELECTED_DATE_FILTER, filter, { expires: 7 });
  };

  const updateFreeText = (text: string) => {
    setFreeText(text);
    Cookies.set(CookieKey.FREE_TEXT, text, { expires: 7 });
  };

  const updateSalesTypeFilter = (salesType: SalesType[]) => {
    setSalesTypeFilter(salesType);
    Cookies.set(CookieKey.SALES_TYPE_FILTER, JSON.stringify(salesType), { expires: 7 });
  };

  useEffect(() => {
    const cookiesAccepted = Cookies.get(CookieKey.ACCEPTED_COOKIES);
    if (!cookiesAccepted) {
      return;
    }
    const initialFilter = Cookies.get(CookieKey.SELECTED_DATE_FILTER) || DateFilters.TODAY;
    const initialFreeText = Cookies.get(CookieKey.FREE_TEXT) || '';
    const initialSalesTypeFilter = Cookies.get(CookieKey.SALES_TYPE_FILTER) ? JSON.parse(Cookies.get(CookieKey.SALES_TYPE_FILTER)!) : [];
    setSelectedFilter(initialFilter as DateFilters);
    setFreeText(initialFreeText);
    setSalesTypeFilter(initialSalesTypeFilter);
  }, []);

  useEffect(() => {
    setTransactions(filterTransactions(data || [], selectedFilter, freeText, salesTypeFilter));
  }, [selectedFilter, freeText, salesTypeFilter, data]);

  useEffect(() => {
    setTotalSales(calculateTotalSales(filterTransactionsByDateFilter(data || [], selectedFilter)));
  }, [data, selectedFilter]);

  return (
    <TransactionsContext.Provider value={{
      selectedFilter,
      setSelectedFilter: setFilter,
      selectedFilterLabel,
      transactions: transactions || [],
      totalSales,
      areTransactionsLoading: isLoading,
      freeText,
      setFreeText: updateFreeText,
      error: (error) as Error,
      salesTypeFilter,
      setSalesTypeFilter: updateSalesTypeFilter,
      selectedTransaction,
      setSelectedTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};
