import { FC } from 'react';
import styles from '../Transaction.module.scss';
import { Dashboard } from "@/lib/type/Dashboard";
import TransactionItem from "@/components/Transactions/TransactionItem";

interface TransactionListProps {
    transactions: Dashboard[];
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
                    <th>ID de la transacción</th>
                    <th>Monto</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <TransactionItem transaction={transaction} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
