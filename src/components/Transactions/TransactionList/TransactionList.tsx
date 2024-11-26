import { FC, useContext } from "react";
import styles from "../Transaction.module.scss";
import Skeleton from "react-loading-skeleton";
import TransactionItem from "@/components/Transactions/TransactionItem";
import SearchBar from "@/components/SearchBar";
import { TransactionsContext } from "@/context/TransactionsContext";
import Card from "@/components/@core/Card";

const TransactionList: FC = () => {
  const {
    selectedFilterLabel,
    freeText,
    setFreeText,
    transactions,
    areTransactionsLoading,
  } = useContext(TransactionsContext);

  return (
    <Card className={styles.tableContainer}>
      <Card.Header>
        <h2 className={styles.title}>
            Tus ventas de {selectedFilterLabel}
        </h2>
      </Card.Header>
      <Card.Body className={styles.cardContent}>
        <SearchBar freeText={freeText} setFreeText={setFreeText} />
        <table
          className={styles.table}
          aria-label={`Listado de transacciones para ${selectedFilterLabel}`}
        >
          <thead>
            <tr>
              <th scope="col">Transacción</th>
              <th scope="col">Fecha y hora</th>
              <th scope="col">Método de pago</th>
              <th scope="col">ID transacción Bold</th>
              <th scope="col">Monto</th>
            </tr>
          </thead>
          <tbody>
            {areTransactionsLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} aria-busy="true" aria-live="polite">
                    <td>
                      <Skeleton width="200px" />
                    </td>
                    <td>
                      <Skeleton width="200px" />
                    </td>
                    <td>
                      <Skeleton width="150px" />
                    </td>
                    <td>
                      <Skeleton width="150px" />
                    </td>
                    <td>
                      <Skeleton width="150px" />
                    </td>
                  </tr>
                ))}
              </>
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionItem transaction={transaction} key={transaction.id} />
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div
                    className={styles.noTransactions}
                    aria-live="polite"
                  >
                    <p>No hay ventas para mostrar</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

export default TransactionList;
