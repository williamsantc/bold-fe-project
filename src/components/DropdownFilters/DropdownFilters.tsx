import { useState, FC, ChangeEvent, useContext, useEffect, useRef } from "react";
import styles from "./DropdownFilters.module.scss";
import Image from "next/image";
import { TransactionsContext } from "@/context/TransactionsContext";
import { SalesType } from "@/lib/constants/SalesType";
import Checkbox from "@/components/@core/Checkbox";
import FocusLock from "react-focus-lock";

const DropdownFilters: FC = () => {
  const { setSalesTypeFilter, salesTypeFilter } = useContext(TransactionsContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [filters, setFilters] = useState({
    [SalesType.TERMINAL]: false,
    [SalesType.PAYMENT_LINK]: false,
    all: false,
  });

  useEffect(() => {
    const terminalFilter = salesTypeFilter.includes(SalesType.TERMINAL);
    const paymentLinkFilter = salesTypeFilter.includes(SalesType.PAYMENT_LINK);
    const allChecked = terminalFilter && paymentLinkFilter;
    setFilters({
      [SalesType.TERMINAL]: terminalFilter,
      [SalesType.PAYMENT_LINK]: paymentLinkFilter,
      all: allChecked,
    });
  }, [salesTypeFilter]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      dropdownRef.current?.focus();
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFilters((prevFilters) => {
      if (value === "all") {
        return { [SalesType.TERMINAL]: checked, [SalesType.PAYMENT_LINK]: checked, all: checked };
      } else {
        const updatedFilters = {
          ...prevFilters,
          [value]: checked,
        };
        const allChecked = updatedFilters[SalesType.TERMINAL] && updatedFilters[SalesType.PAYMENT_LINK];
        return { ...updatedFilters, all: allChecked };
      }
    });
  };

  const handleApply = () => {
    const baseFilters: Record<string, boolean> = {
      [SalesType.TERMINAL]: filters[SalesType.TERMINAL],
      [SalesType.PAYMENT_LINK]: filters[SalesType.PAYMENT_LINK],
    };
    const selectedFilters = Object.keys(baseFilters).filter((key) => baseFilters[key]) as SalesType[];
    setSalesTypeFilter(selectedFilters);
    closeDropdown();
  };

  return (
    <div className={styles.filterContainer}>
      <button
        ref={buttonRef}
        className={styles.filterButton}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="dropdown-filters"
      >
          Filtrar
        <span className={styles.icon}>
          <Image src="/filters.svg" alt="Filtros por tipo de transacción" width={20} height={20} />
        </span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
          id="dropdown-filters"
          role="dialog"
          aria-labelledby="filters-title"
          tabIndex={-1}
        >
          <FocusLock disabled={!isOpen} returnFocus>
            <div className={styles.header}>
              <span id="filters-title">Filtrar</span>
              <button
                className={styles.closeButton}
                onClick={closeDropdown}
                aria-label="Cerrar"
              >
                  &times;
              </button>
            </div>
            <div className={styles.options} role="group" aria-labelledby="filters-title">
              <Checkbox
                value={SalesType.TERMINAL}
                checked={filters[SalesType.TERMINAL]}
                onChange={handleCheckboxChange}
                label="Cobro con datáfono"
              />
              <Checkbox
                value={SalesType.PAYMENT_LINK}
                checked={filters[SalesType.PAYMENT_LINK]}
                onChange={handleCheckboxChange}
                label="Cobro con link de pago"
              />
              <Checkbox
                value="all"
                checked={filters.all}
                onChange={handleCheckboxChange}
                label="Ver todos"
              />
            </div>
            <button className={styles.applyButton} onClick={handleApply}>
                Aplicar
            </button>
          </FocusLock>
        </div>
      )}
    </div>
  );
};

export default DropdownFilters;
