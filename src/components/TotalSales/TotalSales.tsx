import { FC } from 'react';
import styles from './TotalSales.module.scss';
import {formatCurrency} from "@/lib/Currency";

interface TotalSalesProps {
    total: number;
    date: string;
}

const TotalSales: FC<TotalSalesProps> = ({ total, date }) => {

    const formattedDate = new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
    }).format(new Date(date));

    return (
        <div className={styles.totalSales}>
            <div className={styles.header}>
                <span>Total ventas de {formattedDate}</span>
                <span className={styles.infoIcon}>i</span>
            </div>
            <div className={styles.body}>
                <div className={styles.total}>{formatCurrency(total)}</div>
                <div className={styles.date}>{formattedDate}</div>
            </div>
        </div>
    );
};

export default TotalSales;
