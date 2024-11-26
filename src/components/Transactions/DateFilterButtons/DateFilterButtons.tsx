'use client';
import React, {FC, useContext, useMemo} from "react";
import styles from "./DateFilterButtons.module.scss";
import { TransactionsContext } from "@/context/TransactionsContext";
import { buildDateFiltersWithVisualLabels } from "@/lib/Filters";
import { DateFilters } from "@/lib/constants/Filters";

interface DateFilterButtonsProps {
    onFilterChange?: (filter: string) => void;
}

const DateFilterButtons: FC<DateFilterButtonsProps> = ({ onFilterChange }) => {
    const { selectedFilter, setSelectedFilter } = useContext(TransactionsContext);
    const filtersWLabels = useMemo(() => buildDateFiltersWithVisualLabels(), []);

    const handleFilterClick = (filter: DateFilters) => {
        if(!filter) return;

        setSelectedFilter(filter);
        if (onFilterChange) {
            onFilterChange(filter);
        }
    };

    return (
        <div className={styles.filterButtons}>
            {filtersWLabels.map((filter) => (
                <button
                    key={filter.value}
                    className={`${styles.button} ${
                        selectedFilter === filter.value ? styles.active : ""
                    }`}
                    onClick={() => handleFilterClick(filter.value)}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

export default DateFilterButtons;
