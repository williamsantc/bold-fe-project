import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TotalSales from "./TotalSales";
import { formatCurrency } from "@/lib/Currency";

vi.mock("react-loading-skeleton", () => ({
  default: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("@/lib/Currency", () => ({
  formatCurrency: (value: number) => `$${value.toLocaleString()}`,
}));

describe("TotalSales component", () => {
  it("renders loading skeletons when transactions are loading", () => {
    render(
      <TotalSales
        areTransactionsLoading={true}
        headerLabel="Hoy"
        descriptionLabel="25 de noviembre"
      />
    );

    expect(screen.getAllByTestId("skeleton")).toBeTruthy();
    expect(screen.queryByText("Total ventas de Hoy")).not.toBeInTheDocument();
  });

  it("renders total sales information when not loading", () => {
    render(
      <TotalSales
        total={100000}
        headerLabel="Hoy"
        descriptionLabel="25 de noviembre"
        areTransactionsLoading={false}
      />
    );

    expect(screen.getByText("Total ventas de Hoy")).toBeInTheDocument();
    expect(screen.getByText("$100,000")).toBeInTheDocument();
    expect(screen.getByText("25 de noviembre")).toBeInTheDocument();
  });

  it("applies the correct styles for skeletons when loading", () => {
    render(
      <TotalSales
        areTransactionsLoading={true}
        headerLabel="Hoy"
        descriptionLabel="25 de noviembre"
      />
    );

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(3); // [header, total, date] sections
  });

  it("formats the total amount correctly when not loading", () => {
    render(
      <TotalSales
        total={2500000}
        headerLabel="Noviembre"
        descriptionLabel="25 de noviembre"
        areTransactionsLoading={false}
      />
    );

    expect(screen.getByText("$2,500,000")).toBeInTheDocument();
  });
});
