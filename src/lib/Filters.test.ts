import { describe, expect, it, vi } from "vitest";
import {
  buildDateFiltersWithVisualLabels,
  filterTransactionByFreeText,
  filterTransactionBySalesType,
  filterTransactionsByDateFilter,
  getDateLabelForDateFilter,
  getVisualLabelForDateFilter,
} from "./Filters";
import { DateFilters } from "@/lib/constants/Filters";
import { Transaction } from "@/lib/type/Transaction";
import { SalesType } from "@/lib/constants/SalesType";
import { getDayFromTimestamp, getMonthFromTimestamp, getStartOfWeek } from "@/lib/Time";
import { Status } from "@/lib/constants/Status";
import { PaymentMethod } from "@/lib/constants/PaymentMethod";

vi.mock("@/lib/Time", () => ({
  getDayFromTimestamp: vi.fn(),
  getMonthFromTimestamp: vi.fn(),
  getStartOfWeek: vi.fn(),
}));

describe("Filters", () => {
  describe("getDateLabelForDateFilter", () => {
    it("returns today's date for TODAY filter", () => {
      vi.mocked(getDayFromTimestamp).mockReturnValue("25 de noviembre");

      const result = getDateLabelForDateFilter(DateFilters.TODAY);
      expect(result).toBe("25 de noviembre");
    });

    it("returns week range for THIS_WEEK filter", () => {
      vi.mocked(getDayFromTimestamp).mockImplementation((timestamp) => {
        return timestamp === Date.now() ? "25 de noviembre" : "20 de noviembre";
      });

      const startOfWeek = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
      vi.mocked(getStartOfWeek).mockReturnValue(startOfWeek);

      const result = getDateLabelForDateFilter(DateFilters.THIS_WEEK);
      expect(result).toBe("20 de noviembre - 25 de noviembre");
    });

    it("returns month name for CURRENT_MONTH filter", () => {
      vi.mocked(getMonthFromTimestamp).mockReturnValue("noviembre");

      const result = getDateLabelForDateFilter(DateFilters.CURRENT_MONTH);
      expect(result).toBe("noviembre");
    });
  });

  describe("getVisualLabelForDateFilter", () => {
    it("returns 'Hoy' for TODAY filter", () => {
      const result = getVisualLabelForDateFilter(DateFilters.TODAY);
      expect(result).toBe("Hoy");
    });

    it("returns 'Esta semana' for THIS_WEEK filter", () => {
      const result = getVisualLabelForDateFilter(DateFilters.THIS_WEEK);
      expect(result).toBe("Esta semana");
    });

    it("returns month name for CURRENT_MONTH filter", () => {
      vi.mocked(getMonthFromTimestamp).mockReturnValue("noviembre");

      const result = getVisualLabelForDateFilter(DateFilters.CURRENT_MONTH);
      expect(result).toBe("noviembre");
    });
  });

  describe("buildDateFiltersWithVisualLabels", () => {
    it("builds date filters with visual labels", () => {
      vi.mocked(getMonthFromTimestamp).mockReturnValue("noviembre");

      const result = buildDateFiltersWithVisualLabels();
      expect(result).toEqual([
        { label: "Hoy", value: DateFilters.TODAY },
        { label: "Esta semana", value: DateFilters.THIS_WEEK },
        { label: "noviembre", value: DateFilters.CURRENT_MONTH },
      ]);
    });
  });

  describe("filterTransactionsByDateFilter", () => {
    it("filters transactions based on the provided filter", () => {
      const transactions: Transaction[] = [
        { id: "1", createdAt: Date.now(), salesType: SalesType.TERMINAL, amount: 1000, status: Status.SUCCESSFUL, paymentMethod: PaymentMethod.CARD },
        { id: "2", createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, salesType: SalesType.TERMINAL, amount: 2000, status: Status.SUCCESSFUL, paymentMethod: PaymentMethod.CARD },
      ];

      const result = filterTransactionsByDateFilter(transactions, DateFilters.TODAY);
      expect(result.length).toBe(1);
    });
  });

  describe("filterTransactionBySalesType", () => {
    it("filters transactions by sales type", () => {
      const transaction: Transaction = { id: "1", createdAt: Date.now(), salesType: SalesType.TERMINAL, amount: 1000, status: Status.SUCCESSFUL, paymentMethod: PaymentMethod.CARD };

      const result = filterTransactionBySalesType(transaction, [SalesType.TERMINAL]);
      expect(result).toBe(true);

      const resultFalse = filterTransactionBySalesType(transaction, [SalesType.PAYMENT_LINK]);
      expect(resultFalse).toBe(false);
    });
  });

  describe("filterTransactionByFreeText", () => {
    it("filters transactions by free text", () => {
      const transaction: Transaction = { id: "123", createdAt: Date.now(), salesType: SalesType.TERMINAL, amount: 1000, status: Status.SUCCESSFUL, paymentMethod: PaymentMethod.CARD };

      const result = filterTransactionByFreeText(transaction, "123");
      expect(result).toBe(true);

      const resultFalse = filterTransactionByFreeText(transaction, "not-included");
      expect(resultFalse).toBe(false);
    });
  });
});
