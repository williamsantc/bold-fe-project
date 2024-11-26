'use client';
import { FC, useContext } from 'react';
import styles from '../Transaction.module.scss';
import { Transaction } from "@/lib/type/Transaction";
import TransactionItem from "@/components/Transactions/TransactionItem";
import SearchBar from "@/components/SearchBar";
import { TransactionsContext } from "@/context/TransactionsContext";

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: FC<TransactionListProps> = ({ transactions }) => {
    const { selectedFilterLabel, freeText, setFreeText } = useContext(TransactionsContext);

    return (
        <div className={styles.tableContainer}>
            <div>
                <h3 className={styles.title}>Tus ventas de {selectedFilterLabel}</h3>
            </div>
            <SearchBar freeText={freeText} setFreeText={setFreeText} />
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
