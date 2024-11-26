import { FC } from 'react';
import styles from './TotalSales.module.scss';
import { formatCurrency } from "@/lib/Currency";
import Skeleton from 'react-loading-skeleton';

interface TotalSalesProps {
    total?: number;
    label?: string;
    areTransactionsLoading?: boolean;
}

const TotalSales: FC<TotalSalesProps> = ({ total, label, areTransactionsLoading }) => {

    if (areTransactionsLoading) {
        return (
            <div className={styles.totalSales}>
                <div className={styles.header}>
                    <span>
                        <Skeleton
                        baseColor="var(--blue-company)"
                        highlightColor="var(--red-company)"
                        width="200px" />
                    </span>
                    <span className={styles.infoIcon}>i</span>
                </div>
                <div className={styles.body}>
                    <div className={styles.total}><Skeleton width="280px" /></div>
                    <div className={styles.date}><Skeleton width="100px" /></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.totalSales}>
            <div className={styles.header}>
                <span>Total ventas de {label}</span>
                <span className={styles.infoIcon}>i</span>
            </div>
            <div className={styles.body}>
                <div className={styles.total}>{formatCurrency(total)}</div>
                <div className={styles.date}>{label}</div>
            </div>
        </div>
    );
};

export default TotalSales;
