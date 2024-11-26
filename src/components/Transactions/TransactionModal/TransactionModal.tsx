import { FC, useContext, useEffect, useMemo, useRef } from "react";
import styles from "./TransactionModal.module.scss";
import { TransactionsContext } from "@/context/TransactionsContext";
import { clsx } from "clsx";
import { getSalesTypeLabel, getStatusLabel } from "@/lib/Transaction";
import { formatCurrency } from "@/lib/Currency";
import { formatFullDate } from "@/lib/Time";
import PaymentMethod from "@/components/Transactions/PaymentMethod";
import Image from "next/image";
import { Status } from "@/lib/constants/Status";
import LogoSalesType from "@/components/LogoSalesType";

const TransactionModal: FC = () => {
  const { selectedTransaction, setSelectedTransaction } =
        useContext(TransactionsContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const statusLabel = useMemo(() => getStatusLabel(selectedTransaction?.status), [selectedTransaction?.status]);


  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      setSelectedTransaction(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedTransaction(null);
    }
  };

  useEffect(() => {
    if (selectedTransaction) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTransaction]);

  if (!selectedTransaction) return null;

  return (
    <div
      className={clsx(styles.backdrop, styles.visible)}
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div className={clsx(styles.modalContent, styles.slideIn)}>
        <button
          className={styles.closeButton}
          onClick={() => setSelectedTransaction(null)}
          aria-label="Close"
        >
                    &times;
        </button>

        <div className={styles.modalHeader}>
          <Image
            src={selectedTransaction.status === Status.SUCCESSFUL ? '/circle-check.svg' : '/circle-cancel.svg'}
            alt="status"
            width={32}
            height={32}/>
          <p className={styles.status}>
            {statusLabel}
          </p>
          <h2 className={styles.amount}>
            {formatCurrency(selectedTransaction.amount)}
          </h2>
          <p className={styles.date}>
            {formatFullDate(selectedTransaction.createdAt)}
          </p>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.row}>
            <span className={styles.title}>ID transacción Bold:</span>
            <span className={styles.description}><strong>{selectedTransaction.id}</strong></span>
          </div>
          {selectedTransaction.deduction && (
            <div className={styles.row}>
              <span className={styles.title}>Deducción Bold:</span>
              <span className={clsx(styles.deduction, styles.description)}>
                <strong>-{formatCurrency(selectedTransaction.deduction)}</strong>
              </span>
            </div>
          )}
          <div className={styles.divider} />
          <div className={styles.row}>
            <span className={styles.title}>Método de pago:</span>
            <span className={clsx(styles.paymentMethod, styles.description)}>

              <PaymentMethod
                paymentMethod={selectedTransaction.paymentMethod}
                franchise={selectedTransaction.franchise}
                transactionReference={selectedTransaction.transactionReference}
              />
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Tipo de pago:</span>
            <span className={styles.description}>
              <LogoSalesType salesType={selectedTransaction.salesType} />
              &nbsp;
              <strong>
                {getSalesTypeLabel(selectedTransaction.salesType)}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
