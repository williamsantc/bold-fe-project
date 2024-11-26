'use client';
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { DateFilters } from "@/lib/constants/Filters";
import {
    filterTransactions,
    filterTransactionsByDateFilter,
    getVisualLabelForDateFilter
} from "@/lib/Filters";
import { Transaction } from "@/lib/type/Transaction";
import { useGetDashboard } from "@/api/BoldApi";
import {SalesType} from "@/lib/constants/SalesType";
import { calculateTotalSales } from "@/lib/Transaction";

type TransactionsContextType = {
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
    };

    useEffect(() => {
        setTransactions(filterTransactions(data || [], selectedFilter, freeText, salesTypeFilter));
    }, [selectedFilter, freeText, salesTypeFilter, data])

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
            setFreeText,
            error: (error) as Error,
            salesTypeFilter,
            setSalesTypeFilter,
            selectedTransaction,
            setSelectedTransaction,
        }}>
    {children}
    </TransactionsContext.Provider>
);
};
