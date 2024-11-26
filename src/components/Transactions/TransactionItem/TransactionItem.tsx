import { FC, useContext, useMemo } from "react";
import { Transaction } from "@/lib/type/Transaction";
import { formatFullDate } from "@/lib/Time";
import { formatCurrency } from "@/lib/Currency";
import styles from "@/components/Transactions/Transaction.module.scss";
import PaymentMethod from "@/components/Transactions/PaymentMethod";
import LogoSalesType from "@/components/LogoSalesType";
import { TransactionsContext } from "@/context/TransactionsContext";
import { getStatusLabel } from "@/lib/Transaction";

type TransactionItemProps = {
    transaction: Transaction;
};

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
  const { setSelectedTransaction } = useContext(TransactionsContext);
  const statusLabel = useMemo(() => getStatusLabel(transaction.status), [transaction.status]);

  const handleEnter = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedTransaction(transaction);
    }
  };

  return (
    <tr
      key={transaction.id}
      tabIndex={0}
      role="button"
      aria-label={`Transacción con ID ${transaction.id}. Presiona Enter o Espacio para ver los detalles.`}
      onKeyDown={handleEnter}
      onClick={() => setSelectedTransaction(transaction)}
      className={styles.transactionRow}
    >
      <td className={styles.firstTransactionCell}>
        <div>
          <LogoSalesType salesType={transaction.salesType} />
          <span>
            <strong>{statusLabel}</strong>
          </span>
        </div>
      </td>
      <td>
        <span aria-label={`Fecha de la transacción: ${formatFullDate(transaction.createdAt)}`}>
          {formatFullDate(transaction.createdAt)}
        </span>
      </td>
      <td className={styles.paymentMethodCell}>
        <div>
          <PaymentMethod
            paymentMethod={transaction.paymentMethod}
            franchise={transaction.franchise}
            transactionReference={transaction.transactionReference}
            aria-label={`Método de pago: ${transaction.paymentMethod}`}
          />
        </div>
      </td>
      <td>
        <span aria-label={`ID de la transacción: ${transaction.id}`}>{transaction.id}</span>
      </td>
      <td>
        <span>
          <strong aria-label={`Monto de la transacción: ${formatCurrency(transaction.amount)}`}>
            {formatCurrency(transaction.amount)}
          </strong>
        </span>
        {transaction.deduction && (
          <div>
            <span aria-hidden="true">Deducción Bold:</span>
            <span
              className={styles.deduction}
              aria-label={`Deducción: ${formatCurrency(transaction.deduction)}`}
            >
              {formatCurrency(transaction.deduction)}
            </span>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TransactionItem;
