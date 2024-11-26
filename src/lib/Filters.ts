import { DateFilters } from "@/lib/constants/Filters";
import { getMonthFromTimestamp } from "@/lib/Time";
import { Transaction } from "@/lib/type/Transaction";

export const getVisualLabelForDateFilter = (filter?: DateFilters | null) => {
    switch (filter) {
        case DateFilters.TODAY:
            return "Hoy";
        case DateFilters.THIS_WEEK:
            return "Esta semana";
        case DateFilters.CURRENT_MONTH:
            return getMonthFromTimestamp(Date.now());
        default:
            return "";
    }
}

export const buildDateFiltersWithVisualLabels = () => {
    return [
        {
            label: getVisualLabelForDateFilter(DateFilters.TODAY),
            value: DateFilters.TODAY
        },
        {
            label: getVisualLabelForDateFilter(DateFilters.THIS_WEEK),
            value: DateFilters.THIS_WEEK
        },
        {
            label: getVisualLabelForDateFilter(DateFilters.CURRENT_MONTH),
            value: DateFilters.CURRENT_MONTH
        }
    ]
}

export const filterTransactions = (transactions: Transaction[], filter: DateFilters, freeText: string) => {
    return transactions.filter(transaction => {
        return filterTransactionByDateFilter(transaction, filter) && filterTransactionByFreeText(transaction, freeText);
    });
}

export const filterTransactionByDateFilter = (transaction: Transaction, filter: DateFilters) => {
    const now = new Date();
    switch (filter) {
        case DateFilters.TODAY:
            return new Date(transaction.createdAt).getDate() === now.getDate();
        case DateFilters.THIS_WEEK:
            const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
            return new Date(transaction.createdAt) >= startOfWeek;
        case DateFilters.CURRENT_MONTH:
            return new Date(transaction.createdAt).getMonth() === now.getMonth();
        default:
            return true;
    }
}

export function filterTransactionByFreeText(transaction: Transaction, freeText: string) {
    if (!freeText) return true;

    const query = freeText.toLowerCase();

    return Boolean(
        transaction.id.toLowerCase().includes(query) ||
        transaction.status.toLowerCase().includes(query) ||
        transaction.paymentMethod.toLowerCase().includes(query) ||
        transaction.salesType.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query) ||
        transaction.franchise?.toLowerCase().includes(query) ||
        transaction.transactionReference?.toString().includes(query)
    );;
}

export const calculateTotalSales = (transactions: Transaction[]) => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
}
