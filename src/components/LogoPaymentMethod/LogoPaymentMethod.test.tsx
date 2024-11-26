import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LogoPaymentMethod from "./LogoPaymentMethod";
import { PaymentMethod } from "@/lib/constants/PaymentMethod";
import { Franchise } from "@/lib/constants/Franchise";

vi.mock("@/components/LogoFranchise", () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="logo-franchise" />),
}));

describe("LogoPaymentMethod component", () => {
  it("renders NEQUI logo for NEQUI payment method", () => {
    render(<LogoPaymentMethod paymentMethod={PaymentMethod.NEQUI} />);

    const img = screen.getByAltText("NEQUI");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/nequi.svg");
  });

  it("renders BANCOLOMBIA logo for BANCOLOMBIA payment method", () => {
    render(<LogoPaymentMethod paymentMethod={PaymentMethod.BANCOLOMBIA} />);

    const img = screen.getByAltText("BANCOLOMBIA");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/bancolombia.png");
  });

  it("renders DAVIPLATA logo for DAVIPLATA payment method", () => {
    render(<LogoPaymentMethod paymentMethod={PaymentMethod.DAVIPLATA} />);

    const img = screen.getByAltText("DAVIPLATA");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/daviplata.png");
  });

  it("renders LogoFranchise for CARD payment method with franchise", () => {
    render(<LogoPaymentMethod paymentMethod={PaymentMethod.CARD} franchise={Franchise.VISA} />);

    const logoFranchise = screen.getByTestId("logo-franchise");
    expect(logoFranchise).toBeInTheDocument();
  });

  it("does not render LogoFranchise for CARD payment method without franchise and warns", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<LogoPaymentMethod paymentMethod={PaymentMethod.CARD} />);

    expect(screen.queryByTestId("logo-franchise")).not.toBeInTheDocument();
    expect(consoleWarnSpy).toHaveBeenCalledWith("Franchise is required for CARD payment method");
    consoleWarnSpy.mockRestore();
  });

  it("renders PSE logo for PSE payment method", () => {
    render(<LogoPaymentMethod paymentMethod={PaymentMethod.PSE} />);

    const img = screen.getByAltText("PSE");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/pse.jpg");
  });

  it("renders nothing for unsupported payment method", () => {
    render(<LogoPaymentMethod paymentMethod={"UNSUPPORTED_METHOD" as PaymentMethod} />);

    expect(screen.queryByAltText("NEQUI")).not.toBeInTheDocument();
    expect(screen.queryByAltText("BANCOLOMBIA")).not.toBeInTheDocument();
    expect(screen.queryByAltText("DAVIPLATA")).not.toBeInTheDocument();
    expect(screen.queryByAltText("PSE")).not.toBeInTheDocument();
    expect(screen.queryByTestId("logo-franchise")).not.toBeInTheDocument();
  });
});
