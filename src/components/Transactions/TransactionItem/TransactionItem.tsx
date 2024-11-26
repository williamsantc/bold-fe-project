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
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
  const { setSelectedTransaction } = useContext(TransactionsContext);
  const statusLabel = useMemo(() => getStatusLabel(transaction.status), [transaction.status]);

  const handleEnter = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === 'Enter') {
      setSelectedTransaction(transaction);
    }
  };

  return (
    <tr key={transaction.id} tabIndex={0} onKeyDown={(e) => handleEnter(e)} onClick={() => setSelectedTransaction(transaction)}>
      <td className={styles.firstTransactionCell}>
        <div>
          <LogoSalesType salesType={transaction.salesType} />
          <span><strong>{statusLabel}</strong></span>
        </div>
      </td>
      <td>{formatFullDate(transaction.createdAt)}</td>
      <td className={styles.paymentMethodCell}>
        <div>
          <PaymentMethod
            paymentMethod={transaction.paymentMethod}
            franchise={transaction.franchise}
            transactionReference={transaction.transactionReference}
          />
        </div>
      </td>
      <td>{transaction.id}</td>
      <td>
        <strong>{formatCurrency(transaction.amount)}</strong>
        {transaction.deduction ? (
          <div>
            <span>
                    Deducción Bold:
            </span>
            <span className={styles.deduction}>
              {formatCurrency(transaction.deduction)}
            </span>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default TransactionItem;
