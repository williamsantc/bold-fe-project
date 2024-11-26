import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DropdownFilters from "./DropdownFilters";
import { TransactionsContext, TransactionsContextType } from "@/context/TransactionsContext";
import { SalesType } from "@/lib/constants/SalesType";

describe("DropdownFilters component", () => {
  const mockSetSalesTypeFilter = vi.fn();

  const renderWithContext = (salesTypeFilter: SalesType[] = []) =>
    render(
      <TransactionsContext.Provider
        value={{
          salesTypeFilter,
          setSalesTypeFilter: mockSetSalesTypeFilter,
        } as unknown as TransactionsContextType}
      >
        <DropdownFilters />
      </TransactionsContext.Provider>
    );

  it("renders the filter button", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    expect(filterButton).toBeInTheDocument();
  });

  it("opens the dropdown when the filter button is clicked", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);
    expect(screen.getByText("Cobro con datáfono")).toBeInTheDocument();
    expect(screen.getByText("Cobro con link de pago")).toBeInTheDocument();
    expect(screen.getByText("Ver todos")).toBeInTheDocument();
  });

  it("closes the dropdown when the close button is clicked", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Cobro con datáfono")).not.toBeInTheDocument();
  });

  it("updates the filters when checkboxes are toggled", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    const terminalCheckbox = screen.getByLabelText("Cobro con datáfono");
    const paymentLinkCheckbox = screen.getByLabelText("Cobro con link de pago");
    const allCheckbox = screen.getByLabelText("Ver todos");

    fireEvent.click(terminalCheckbox);
    expect(terminalCheckbox).toBeChecked();
    expect(allCheckbox).not.toBeChecked();

    fireEvent.click(paymentLinkCheckbox);
    expect(paymentLinkCheckbox).toBeChecked();
    expect(allCheckbox).toBeChecked();

    fireEvent.click(allCheckbox);
    expect(terminalCheckbox).not.toBeChecked();
    expect(paymentLinkCheckbox).not.toBeChecked();
    expect(allCheckbox).not.toBeChecked();
  });

  it("applies filters and closes the dropdown when 'Aplicar' is clicked", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    const terminalCheckbox = screen.getByLabelText("Cobro con datáfono");
    fireEvent.click(terminalCheckbox);

    const applyButton = screen.getByRole("button", { name: /Aplicar/i });
    fireEvent.click(applyButton);

    expect(mockSetSalesTypeFilter).toHaveBeenCalledWith([SalesType.TERMINAL]);
    expect(screen.queryByText("Cobro con datáfono")).not.toBeInTheDocument();
  });

  it("initializes filters from the context", () => {
    renderWithContext([SalesType.TERMINAL]);
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    const terminalCheckbox = screen.getByLabelText("Cobro con datáfono");
    const paymentLinkCheckbox = screen.getByLabelText("Cobro con link de pago");
    const allCheckbox = screen.getByLabelText("Ver todos");

    expect(terminalCheckbox).toBeChecked();
    expect(paymentLinkCheckbox).not.toBeChecked();
    expect(allCheckbox).not.toBeChecked();
  });
});
