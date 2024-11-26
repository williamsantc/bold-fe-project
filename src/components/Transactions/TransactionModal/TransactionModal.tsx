import { FC, useContext, useEffect, useMemo, useRef, useState, useTransition } from "react";
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
  const { selectedTransaction, setSelectedTransaction } = useContext(TransactionsContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false); // Controls visibility for animations

  const statusLabel = useMemo(() => getStatusLabel(selectedTransaction?.status), [selectedTransaction?.status]);

  const _closeModal = () => {
    startTransition(() => {
      setIsVisible(false); // Trigger exit animation
    });

    setTimeout(() => {
      setSelectedTransaction(null);
    }, 300);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      _closeModal();
    }
  };

  useEffect(() => {
    const closeModal = () => {
      startTransition(() => {
        setIsVisible(false);
      });

      setTimeout(() => {
        setSelectedTransaction(null);
      }, 300);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (selectedTransaction) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTransaction]);

  if (!selectedTransaction) return null;

  return (
    <div
      className={clsx(styles.backdrop, {
        [styles.visible]: isVisible,
        [styles.exiting]: !isVisible,
      })}
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div
        className={clsx(styles.modalContent, {
          [styles.slideIn]: isVisible,
          [styles.slideOut]: !isVisible,
        })}
      >
        <button
          className={styles.closeButton}
          onClick={_closeModal}
          aria-label="Close"
        >
            &times;
        </button>

        <div className={styles.modalHeader}>
          <Image
            src={selectedTransaction?.status === Status.SUCCESSFUL ? '/circle-check.svg' : '/circle-cancel.svg'}
            alt="status"
            width={32}
            height={32}
          />
          <p className={styles.status}>{statusLabel}</p>
          <h2 className={styles.amount}>{formatCurrency(selectedTransaction?.amount || 0)}</h2>
          <p className={styles.date}>{formatFullDate(selectedTransaction?.createdAt || 0)}</p>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.row}>
            <span className={styles.title}>ID transacción Bold:</span>
            <span className={styles.description}>
              <strong>{selectedTransaction?.id}</strong>
            </span>
          </div>
          {selectedTransaction?.deduction && (
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
                paymentMethod={selectedTransaction?.paymentMethod}
                franchise={selectedTransaction?.franchise}
                transactionReference={selectedTransaction?.transactionReference}
              />
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Tipo de pago:</span>
            <span className={styles.description}>
              <LogoSalesType salesType={selectedTransaction?.salesType || ""} />
                &nbsp;
              <strong>{getSalesTypeLabel(selectedTransaction?.salesType || "")}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
