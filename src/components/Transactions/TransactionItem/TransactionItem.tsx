import {FC, useMemo} from "react";
import {Dashboard} from "@/lib/type/Dashboard";
import { formatFullDate } from "@/lib/Time";
import { formatCurrency } from "@/lib/Currency";
import styles from "@/components/Transactions/Transaction.module.scss";

type TransactionItemProps = {
    transaction: Dashboard;
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
    const statusLabel = useMemo(() => transaction.status === 'SUCCESSFUL' ? 'Cobro exitoso' : 'Cobro no realizado', [transaction.status])

    return (
        <tr key={transaction.id}>
            <td>
                {statusLabel}
            </td>
            <td>{formatFullDate(transaction.createdAt)}</td>
            <td>
                {transaction.paymentMethod}
                {transaction.franchise ? ` - ${transaction.franchise}` : ''}
            </td>
            <td>{transaction.id}</td>
            <td>
                {formatCurrency(transaction.amount)}
                {transaction.deduction && (
                    <span className={styles.deduction}>
                    Deduction Bold: {formatCurrency(transaction.deduction)}
                  </span>
                )}
            </td>
        </tr>
    );
}

export default TransactionItem;
