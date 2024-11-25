import React from 'react';
import TotalSales from '@/components/TotalSales';
import styles from './Dashboard.module.scss';
import { getDashboard } from "@/api/BoldApi";
import TransactionList from "../../components/Transactions/TransactionList";

const Dashboard = async () => {
    const dashboard = await getDashboard();
    return (
        <div className={styles.dashboard}>
            <div className={styles.totalSalesSection}>
                <TotalSales total={394561894} date="2024-06-01" />
            </div>
            <TransactionList transactions={dashboard} />
            <pre>
                {JSON.stringify(dashboard, null, 2)}
            </pre>
        </div>
    );
};

export default Dashboard;
