import { FC, useContext } from 'react';
import styles from '../Transaction.module.scss';
import Skeleton from 'react-loading-skeleton';
import TransactionItem from "@/components/Transactions/TransactionItem";
import SearchBar from "@/components/SearchBar";
import { TransactionsContext } from "@/context/TransactionsContext";
import Card from "@/components/@core/Card";

const TransactionList: FC = () => {
  const { selectedFilterLabel, freeText, setFreeText, transactions, areTransactionsLoading } = useContext(TransactionsContext);

  return (
    <Card className={styles.tableContainer}>
      <Card.Header>
        <span className={styles.title}>Tus ventas de {selectedFilterLabel}</span>
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
            ) : transactions.map((transaction) => (
              <TransactionItem transaction={transaction} key={transaction.id} />
            ))}
          </tbody>
        </table>
        {!areTransactionsLoading && transactions.length === 0 && (
          <div className={styles.noTransactions}>
            <p>No hay ventas para mostrar</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TransactionList;
