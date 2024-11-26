import React, {useContext} from 'react';
import TotalSales from '@/components/TotalSales';
import styles from './Dashboard.module.scss';
import TransactionList from "@/components/Transactions/TransactionList";
import DateFilterButtons from "@/components/Transactions/DateFilterButtons";
import {TransactionsContext} from "@/context/TransactionsContext";
import {DateFilters} from "@/lib/constants/Filters";

const Dashboard = () => {
    const { transactions, totalSales, selectedFilterLabel, selectedFilter, areTransactionsLoading } = useContext(TransactionsContext);

    const totalSalesLabel = selectedFilter === DateFilters.CURRENT_MONTH ? `${selectedFilterLabel}, 2024` : selectedFilterLabel;

    return (
        <div className={styles.dashboard}>
            <div className={styles.topSection}>
                <div className={styles.leftTopSection}>
                    <TotalSales
                        total={totalSales}
                        label={totalSalesLabel}
                        areTransactionsLoading={areTransactionsLoading}
                    />
                </div>
                <div className={styles.rightTopSection}>
                    <DateFilterButtons />
                </div>
            </div>
            <div className={styles.bottomSection}>
                <TransactionList transactions={transactions} />
            </div>
        </div>
    );
};

export default Dashboard;
