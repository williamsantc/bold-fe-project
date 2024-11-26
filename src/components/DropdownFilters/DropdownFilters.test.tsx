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

  it("renders the filter button with proper aria attributes", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveAttribute("aria-expanded", "false");
    expect(filterButton).toHaveAttribute("aria-controls", "dropdown-filters");
  });

  it("opens the dropdown and updates aria-expanded when the filter button is clicked", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    expect(filterButton).toHaveAttribute("aria-expanded", "true");
    const dropdown = screen.getByRole("dialog");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveAttribute("aria-labelledby", "filters-title");
  });

  it("closes the dropdown when the close button is clicked", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    const closeButton = screen.getByLabelText("Cerrar");
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(filterButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the dropdown when Escape is pressed", () => {
    renderWithContext();
    const filterButton = screen.getByRole("button", { name: /Filtrar/i });
    fireEvent.click(filterButton);

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(filterButton).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles checkbox states correctly", () => {
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
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("initializes checkboxes based on context state", () => {
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
