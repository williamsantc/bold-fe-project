'use client';
import { FC, useContext } from 'react';
import styles from '../Transaction.module.scss';
import Skeleton from 'react-loading-skeleton';
import TransactionItem from "@/components/Transactions/TransactionItem";
import SearchBar from "@/components/SearchBar";
import { TransactionsContext } from "@/context/TransactionsContext";
import Card from "@/components/@core/Card";

interface TransactionListProps {}

const TransactionList: FC<TransactionListProps> = () => {
    const { selectedFilterLabel, freeText, setFreeText, transactions, areTransactionsLoading } = useContext(TransactionsContext);

    return (
        <Card className={styles.tableContainer}>
            <Card.Header>
                <h3 className={styles.title}>Tus ventas de {selectedFilterLabel}</h3>
            </Card.Header>
            <Card.Body className={styles.cardContent}>
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
                    {areTransactionsLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                                <td><Skeleton width="200px" /></td>
                                <td><Skeleton width="200px" /></td>
                                <td><Skeleton width="150px" /></td>
                                <td><Skeleton width="150px" /></td>
                                <td><Skeleton width="150px" /></td>
                            </tr>
                        ))
                    ) : null}
                    {!areTransactionsLoading ? transactions.map((transaction) => (
                        <TransactionItem transaction={transaction} key={transaction.id} />
                    )) : null}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
};

export default TransactionList;
