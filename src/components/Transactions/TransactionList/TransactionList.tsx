import { FC } from 'react';
import styles from '../Transaction.module.scss';
import { Transaction } from "@/lib/type/Transaction";
import TransactionItem from "@/components/Transactions/TransactionItem";

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: FC<TransactionListProps> = ({ transactions }) => {

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Transacción</th>
                    <th>Fecha y hora</th>
                    <th>Método de pago</th>
                    <th>ID transacción Bold</th>
                    <th>Monto</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <TransactionItem transaction={transaction} key={transaction.id} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
