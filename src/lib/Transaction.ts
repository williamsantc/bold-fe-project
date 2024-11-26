import { Transaction } from "@/lib/type/Transaction";
import { Status } from "@/lib/constants/Status";
import { SalesType } from "@/lib/constants/SalesType";

export const calculateTotalSales = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
};

export const getSalesTypeLabel = (salesType: SalesType) => {
  switch (salesType) {
  case SalesType.PAYMENT_LINK:
    return "Link de pagos";
  case SalesType.TERMINAL:
    return "Terminal";
  default:
    return "";
  }
};

export const getStatusLabel = (status?: Status) => {
  switch (status) {
  case Status.SUCCESSFUL:
    return "Cobro exitoso";
  case Status.REJECTED:
    return "Cobro no realizado";
  default:
    return "";
  }
};
