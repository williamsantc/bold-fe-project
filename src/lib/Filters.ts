import { DateFilters } from "@/lib/constants/Filters";
import { getDayFromTimestamp, getMonthFromTimestamp, getStartOfWeek } from "@/lib/Time";
import { Transaction } from "@/lib/type/Transaction";
import { SalesType } from "@/lib/constants/SalesType";

export const getDateLabelForDateFilter = (filter?: DateFilters | null) => {
  const now = Date.now();
  const today = getDayFromTimestamp(now);

  switch (filter) {
  case DateFilters.TODAY:
    return today;
  case DateFilters.THIS_WEEK:
    const startOfWeek = getStartOfWeek(now);
    const startOfWeekFormatted = getDayFromTimestamp(startOfWeek.getTime());
    return `${startOfWeekFormatted} - ${today}`;
  case DateFilters.CURRENT_MONTH:
    return getMonthFromTimestamp(now, true);
  default:
    return "";
  }
};

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
};

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
  ];
};

export const filterTransactionsByDateFilter = (transactions: Transaction[], filter: DateFilters) => {
  return transactions.filter(transaction => filterTransactionByDateFilter(transaction, filter));
};

export const filterTransactions = (transactions: Transaction[], filter: DateFilters, freeText: string, salesTypeFilter: SalesType[]) => {
  return transactions.filter(transaction => {
    return (
      filterTransactionByDateFilter(transaction, filter) &&
            filterTransactionByFreeText(transaction, freeText) &&
            filterTransactionBySalesType(transaction, salesTypeFilter)
    );
  });
};

export const filterTransactionBySalesType = (transaction: Transaction, salesTypeFilter: SalesType[]) => {
  if (salesTypeFilter.length === 0) return true;
  return salesTypeFilter.includes(transaction.salesType);
};

export const filterTransactionByDateFilter = (transaction: Transaction, filter: DateFilters) => {
  const now = Date.now();
  const dateCreatedAt = new Date(transaction.createdAt);
  switch (filter) {
  case DateFilters.TODAY:
    return dateCreatedAt.getDate() === new Date(now).getDate();
  case DateFilters.THIS_WEEK:
    const startOfWeek = getStartOfWeek(now);
    return dateCreatedAt >= startOfWeek;
  case DateFilters.CURRENT_MONTH:
    return dateCreatedAt.getMonth() === new Date(now).getMonth();
  default:
    return true;
  }
};

export function filterTransactionByFreeText(transaction: Transaction, freeText: string) {
  if (!freeText) return true;

  const query = freeText.toLowerCase().trim();

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
