import { FC, useContext, useMemo, useRef } from "react";
import styles from "./DateFilterButtons.module.scss";
import { TransactionsContext } from "@/context/TransactionsContext";
import { buildDateFiltersWithVisualLabels } from "@/lib/Filters";
import { DateFilters } from "@/lib/constants/Filters";
import { clsx } from "clsx";

interface DateFilterButtonsProps {
  onFilterChange?: (filter: string) => void;
}

const DateFilterButtons: FC<DateFilterButtonsProps> = ({ onFilterChange }) => {
  const { selectedFilter, setSelectedFilter } = useContext(TransactionsContext);
  const filtersWLabels = useMemo(() => buildDateFiltersWithVisualLabels(), []);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  const handleFilterClick = (filter: DateFilters) => {
    setSelectedFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % filtersWLabels.length;
      buttonsRef.current[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + filtersWLabels.length) % filtersWLabels.length;
      buttonsRef.current[prevIndex]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFilterClick(filtersWLabels[index].value);
    }
  };

  return (
    <div
      className={styles.filterButtons}
      role="radiogroup"
      aria-labelledby="date-filters-label"
    >
      <span id="date-filters-label" className="sr-only">
        Filtros de fecha
      </span>
      {filtersWLabels.map((filter, index) => (
        <button
          key={filter.value}
          className={clsx(styles.button, { [styles.active]: selectedFilter === filter.value })}
          onClick={() => handleFilterClick(filter.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => {
            buttonsRef.current[index] = el!;
          }}
          role="radio"
          aria-checked={selectedFilter === filter.value}
          aria-label={`Filtro: ${filter.label}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default DateFilterButtons;
