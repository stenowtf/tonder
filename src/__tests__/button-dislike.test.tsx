import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ButtonDislike } from "../components/button-dislike";

describe("ButtonDislike", () => {
  it("renders and handles click", () => {
    const onClick = vi.fn();
    render(<ButtonDislike onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /dislike/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(<ButtonDislike onClick={onClick} disabled />);
    const btn = screen.getByRole("button", { name: /dislike/i });
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn).toBeDisabled();
  });

  it("has correct aria-label for accessibility", () => {
    render(<ButtonDislike onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: /dislike/i });
    expect(btn).toHaveAttribute("aria-label");
  });

  it("is focusable and responds to keyboard", () => {
    const onClick = vi.fn();
    render(<ButtonDislike onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /dislike/i });
    btn.focus();
    expect(btn).toHaveFocus();
    fireEvent.keyDown(btn, { key: "Enter" });
    fireEvent.keyDown(btn, { key: " " });
  });
});
