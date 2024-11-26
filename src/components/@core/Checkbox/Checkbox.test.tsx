import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import Checkbox from "./Checkbox";

describe("Checkbox component", () => {
  it("renders correctly with label", () => {
    render(
      <Checkbox
        onChange={() => {}}
        checked={false}
        value="test-value"
        label="Test Label"
      />
    );

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();

    const input = screen.getByRole("checkbox");
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it("triggers onChange when clicked", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        onChange={handleChange}
        checked={false}
        value="test-value"
        label="Test Label"
      />
    );

    const input = screen.getByRole("checkbox");
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard Enter key to toggle the checkbox", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        onChange={handleChange}
        checked={false}
        value="test-value"
        label="Test Label"
      />
    );

    const input = screen.getByRole("checkbox");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: "test-value", checked: true },
      })
    );
  });

  it("shows as checked when the checked prop is true", () => {
    render(
      <Checkbox
        onChange={() => {}}
        checked={true}
        value="test-value"
        label="Test Label"
      />
    );

    const input = screen.getByRole("checkbox");
    expect(input).toBeChecked();
  });

  it("applies custom className", () => {
    render(
      <Checkbox
        onChange={() => {}}
        checked={false}
        value="test-value"
        label="Test Label"
        className="custom-class"
      />
    );

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-class");
  });
});
