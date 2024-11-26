import { useContext } from 'react';
import TotalSales from '@/components/TotalSales';
import styles from './Dashboard.module.scss';
import TransactionList from "@/components/Transactions/TransactionList";
import DateFilterButtons from "@/components/Transactions/DateFilterButtons";
import { TransactionsContext } from "@/context/TransactionsContext";
import { DateFilters } from "@/lib/constants/Filters";
import DropdownFilters from "../../components/DropdownFilters";

const Dashboard = () => {
    const { totalSales, selectedFilterLabel, selectedFilter, areTransactionsLoading } = useContext(TransactionsContext);

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
                    <DropdownFilters />
                </div>
            </div>
            <div className={styles.bottomSection}>
                <TransactionList />
            </div>
        </div>
    );
};

export default Dashboard;
