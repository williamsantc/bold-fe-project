import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card";
import { RefObject } from "react";

describe("Card component", () => {
  it("renders Card with children", () => {
    render(
      <Card>
        <p>Card Content</p>
      </Card>
    );

    const card = screen.getByText("Card Content");
    expect(card).toBeInTheDocument();
    expect(card.parentElement).toHaveClass("card");
  });

  it("accepts additional className", () => {
    render(
      <Card className="custom-class">
        <p>Card Content</p>
      </Card>
    );

    const card = screen.getByText("Card Content").parentElement;
    expect(card).toHaveClass("card");
    expect(card).toHaveClass("custom-class");
  });

  it("renders Card.Header with children", () => {
    render(
      <Card>
        <Card.Header>
          <h1>Header Content</h1>
        </Card.Header>
      </Card>
    );

    const header = screen.getByText("Header Content");
    expect(header).toBeInTheDocument();
    expect(header.parentElement).toHaveClass("cardHeader");
  });

  it("renders Card.Body with children", () => {
    render(
      <Card>
        <Card.Body>
          <p>Body Content</p>
        </Card.Body>
      </Card>
    );

    const body = screen.getByText("Body Content");
    expect(body).toBeInTheDocument();
    expect(body.parentElement).toHaveClass("cardBody");
  });

  it("forwards ref to the Card container", () => {
    const ref = { current: null } as RefObject<HTMLDivElement>;
    render(<Card ref={ref}>Card Content</Card>);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass("card");
  });

  it("forwards ref to Card.Header", () => {
    const ref = { current: null } as RefObject<HTMLDivElement>;
    render(
      <Card>
        <Card.Header ref={ref}>Header Content</Card.Header>
      </Card>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass("cardHeader");
  });

  it("forwards ref to Card.Body", () => {
    const ref = { current: null } as RefObject<HTMLDivElement>;
    render(
      <Card>
        <Card.Body ref={ref}>Body Content</Card.Body>
      </Card>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveClass("cardBody");
  });
});
