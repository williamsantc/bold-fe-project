import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Tooltip from "./Tooltip";

describe("Tooltip component", () => {
  it("renders children correctly", () => {
    render(
      <Tooltip text="Tooltip Text">
        <button>Hover or Click Me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover or Click Me");
    expect(button).toBeInTheDocument();
  });

  it("shows tooltip on hover when trigger is 'hover'", async () => {
    render(
      <Tooltip text="Tooltip Text" trigger="hover">
        <button>Hover Me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover Me");

    expect(screen.queryByText("Tooltip Text")).not.toBeInTheDocument();

    fireEvent.mouseEnter(button);

    expect(screen.getByText("Tooltip Text")).toBeInTheDocument();

    fireEvent.mouseLeave(button);

    expect(screen.queryByText("Tooltip Text")).not.toBeInTheDocument();
  });

  it("shows tooltip on click when trigger is 'click'", async () => {
    render(
      <Tooltip text="Tooltip Text" trigger="click">
        <button>Click Me</button>
      </Tooltip>
    );

    const button = screen.getByText("Click Me");

    expect(screen.queryByText("Tooltip Text")).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText("Tooltip Text")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText("Tooltip Text")).not.toBeInTheDocument();
  });

  it("does not render the tooltip by default", () => {
    render(
      <Tooltip text="Tooltip Text">
        <button>Hover Me</button>
      </Tooltip>
    );

    expect(screen.queryByText("Tooltip Text")).not.toBeInTheDocument();
  });

  it("renders tooltip text correctly when visible", () => {
    render(
      <Tooltip text="Tooltip Text" trigger="click">
        <button>Click Me</button>
      </Tooltip>
    );

    const button = screen.getByText("Click Me");

    fireEvent.click(button);

    expect(screen.getByText("Tooltip Text")).toBeInTheDocument();
  });
});
