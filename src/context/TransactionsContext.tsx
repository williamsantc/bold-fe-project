'use client';
import {createContext, ReactNode, useEffect, useMemo, useState} from "react";
import { DateFilters } from "@/lib/constants/Filters";
import {calculateTotalSales, getTransactionsForDateFilter, getVisualLabelForDateFilter} from "@/lib/Filters";
import { Transaction } from "@/lib/type/Transaction";
import { useGetDashboard } from "@/api/BoldApi";

type TransactionsContextType = {
    selectedFilter?: DateFilters | null;
    selectedFilterLabel?: string;
    setSelectedFilter: (filter: DateFilters) => void;
    totalSales?: number;
    transactions: Transaction[];
    areTransactionsLoading?: boolean;
}

export const TransactionsContext = createContext<TransactionsContextType>({
    setSelectedFilter: () => {},
    transactions: [],
});


export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const { isLoading, error, data } = useGetDashboard();
    const [selectedFilter, setSelectedFilter] = useState<DateFilters>(DateFilters.TODAY);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalSales, setTotalSales] = useState<number>(0);

    const selectedFilterLabel = useMemo(() => getVisualLabelForDateFilter(selectedFilter), [selectedFilter]);

    const setFilter = (filter: DateFilters) => {
        setSelectedFilter(filter);
    };

    useEffect(() => {
        setTransactions(getTransactionsForDateFilter(data || [], selectedFilter));
    }, [selectedFilter, data])

    useEffect(() => {
        setTotalSales(calculateTotalSales(transactions));
    }, [transactions]);

    return (
        <TransactionsContext.Provider value={{
            selectedFilter,
            setSelectedFilter: setFilter,
            selectedFilterLabel,
            transactions: transactions || [],
            totalSales,
            areTransactionsLoading: isLoading
        }}>
    {children}
    </TransactionsContext.Provider>
);
};
