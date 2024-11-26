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

    const input = screen.getByRole("checkbox", { name: "Test Label" });
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it("triggers onChange when clicked", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        onChange={handleChange}
        value="test-value"
        label="Test Label"
      />
    );
    const input = screen.getByRole("checkbox", { name: "Test Label" });

    fireEvent.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);

    const changeEvent = handleChange.mock.calls[0][0];
    expect(changeEvent.target.value).toBe("test-value");
    expect(changeEvent.target.checked).toBe(true);
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

    const input = screen.getByRole("checkbox", { name: "Test Label" });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(handleChange).toHaveBeenCalledTimes(1);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test-value",
          checked: true,
        }),
      })
    );
  });

  it("handles keyboard Space key to toggle the checkbox", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        onChange={handleChange}
        checked={false}
        value="test-value"
        label="Test Label"
      />
    );

    const input = screen.getByRole("checkbox", { name: "Test Label" });
    fireEvent.keyDown(input, { key: " ", code: "Space", charCode: 32 });

    expect(handleChange).toHaveBeenCalledTimes(1);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test-value",
          checked: true,
        }),
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

    const input = screen.getByRole("checkbox", { name: "Test Label" });
    expect(input).toBeChecked();
  });

  it("applies custom className to the wrapper", () => {
    render(
      <Checkbox
        onChange={() => {}}
        checked={false}
        value="test-value"
        label="Test Label"
        className="custom-class"
      />
    );

    const wrapper = screen.getByText("Test Label").closest("div");
    expect(wrapper).toHaveClass("custom-class");
  });
});
