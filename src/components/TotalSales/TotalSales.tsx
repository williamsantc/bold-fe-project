import { FC } from 'react';
import styles from './TotalSales.module.scss';
import { formatCurrency } from "@/lib/Currency";
import Skeleton from 'react-loading-skeleton';
import Card from "@/components/@core/Card";

interface TotalSalesProps {
    total?: number;
    headerLabel: string;
    descriptionLabel: string;
    areTransactionsLoading?: boolean;
}

const TotalSales: FC<TotalSalesProps> = ({ total, headerLabel, areTransactionsLoading, descriptionLabel }) => {

    if (areTransactionsLoading) {

        return (
            <Card className={styles.totalSales}>
                <Card.Header className={styles.header}>
                    <span>
                        <Skeleton
                            baseColor="var(--blue-company)"
                            highlightColor="var(--red-company)"
                            width="200px"/>
                    </span>
                    <span className={styles.infoIcon}>i</span>
                </Card.Header>
                <Card.Body className={styles.body}>
                    <div className={styles.total}><Skeleton width="280px"/></div>
                    <div className={styles.date}><Skeleton width="100px"/></div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className={styles.totalSales}>
            <Card.Header className={styles.header}>
                <span>Total ventas de {headerLabel}</span>
                <span className={styles.infoIcon}>i</span>
            </Card.Header>
            <Card.Body className={styles.body}>
                <div className={styles.total}>{formatCurrency(total)}</div>
                <div className={styles.date}>{descriptionLabel}</div>
            </Card.Body>
        </Card>
    );
};

export default TotalSales;
