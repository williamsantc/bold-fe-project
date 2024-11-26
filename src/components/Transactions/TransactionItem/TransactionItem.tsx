import { FC, useMemo } from "react";
import { Transaction } from "@/lib/type/Transaction";
import { formatFullDate } from "@/lib/Time";
import { formatCurrency } from "@/lib/Currency";
import styles from "@/components/Transactions/Transaction.module.scss";
import { PaymentMethod } from "@/lib/constants/PaymentMethod";
import LogoPaymentMethod from "@/components/LogoPaymentMethod";
import LogoSalesType from "@/components/LogoSalesType";

type TransactionItemProps = {
    transaction: Transaction;
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
    const statusLabel = useMemo(() => transaction.status === 'SUCCESSFUL' ? 'Cobro exitoso' : 'Cobro no realizado', [transaction.status])
    const paymentMethodLabel = useMemo(() => transaction.paymentMethod === PaymentMethod.CARD ? `**** ${transaction.transactionReference}`: transaction.paymentMethod, [transaction.paymentMethod, transaction.franchise])


    return (
        <tr key={transaction.id}>
            <td className={styles.firstTransactionCell}>
                <div>
                    <LogoSalesType salesType={transaction.salesType} />
                    <span><b>{statusLabel}</b></span>
                </div>
            </td>
            <td>{formatFullDate(transaction.createdAt)}</td>
            <td className={styles.paymentMethodCell}>
                <div>
                    <LogoPaymentMethod paymentMethod={transaction.paymentMethod} franchise={transaction.franchise} />
                    <span>{paymentMethodLabel}</span>
                </div>
            </td>
            <td>{transaction.id}</td>
            <td>
                <b>{formatCurrency(transaction.amount)}</b>
                {transaction.deduction && (
                    <div>
                        <span>
                    Deduction Bold:
                  </span>
                        <span className={styles.deduction}>
                    {formatCurrency(transaction.deduction)}
                  </span>
                    </div>
                )}
            </td>
        </tr>
    );
}

export default TransactionItem;
