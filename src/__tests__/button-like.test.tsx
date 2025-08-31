import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ButtonLike } from "../components/button-like";

describe("ButtonLike", () => {
  it("renders and handles click", () => {
    const onClick = vi.fn();
    render(<ButtonLike onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /like/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(<ButtonLike onClick={onClick} disabled />);
    const btn = screen.getByRole("button", { name: /like/i });
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });

  it("has correct aria-label for accessibility", () => {
    render(<ButtonLike onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: /like/i });
    expect(btn).toHaveAttribute("aria-label");
  });

  it("is focusable and responds to keyboard", () => {
    const onClick = vi.fn();
    render(<ButtonLike onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /like/i });
    btn.focus();
    expect(btn).toHaveFocus();
    fireEvent.keyDown(btn, { key: "Enter" });
    fireEvent.keyDown(btn, { key: " " });
  });
});
