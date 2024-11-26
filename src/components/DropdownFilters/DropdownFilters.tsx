import { useState, FC, ChangeEvent, useContext } from "react";
import styles from "./DropdownFilters.module.scss";
import Image from "next/image";
import { TransactionsContext } from "@/context/TransactionsContext";
import { SalesType } from "@/lib/constants/SalesType";

const DropdownFilters: FC = () => {
    const { setSalesTypeFilter } = useContext(TransactionsContext);
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        [SalesType.TERMINAL]: false,
        [SalesType.PAYMENT_LINK]: false,
        all: false,
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

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
        const baseFilters: Record<string, boolean> = { [SalesType.TERMINAL]: filters[SalesType.TERMINAL], [SalesType.PAYMENT_LINK]: filters[SalesType.PAYMENT_LINK] };
        const selectedFilters = Object.keys(baseFilters).filter((key) => baseFilters[key]) as SalesType[];
        setSalesTypeFilter(selectedFilters);
        closeDropdown();
    };

    return (
        <div className={styles.filterContainer}>
            <button
                className={styles.filterButton}
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                Filtrar
                <span className={styles.icon}>
          <Image src="/filters.svg" alt="Filters" width={20} height={20} />
        </span>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.header}>
                        <span>Filtrar</span>
                        <button
                            className={styles.closeButton}
                            onClick={closeDropdown}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </div>
                    <div className={styles.options}>
                        <label>
                            <input
                                type="checkbox"
                                value={SalesType.TERMINAL}
                                checked={filters[SalesType.TERMINAL]}
                                onChange={handleCheckboxChange}
                            />
                            Cobro con datáfono
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value={SalesType.PAYMENT_LINK}
                                checked={filters[SalesType.PAYMENT_LINK]}
                                onChange={handleCheckboxChange}
                            />
                            Cobro con link de pago
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="all"
                                checked={filters.all}
                                onChange={handleCheckboxChange}
                            />
                            Ver todos
                        </label>
                    </div>
                    <button className={styles.applyButton} onClick={handleApply}>
                        Aplicar
                    </button>
                </div>
            )}
        </div>
    );
};

export default DropdownFilters;
