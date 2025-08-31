import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DialogMatch } from "../components/dialog-match";

describe("DialogMatch", () => {
  it("renders dialog with correct content", () => {
    const handleBack = vi.fn();
    render(
      <DialogMatch
        open={true}
        userAName="Alice"
        userAPhoto="/users/alice.jpg"
        userBName="Bob"
        userBPhoto="/users/bob.jpg"
        handleBack={handleBack}
      />
    );
    expect(screen.getByText(/You/)).toBeInTheDocument();
    expect(screen.getByText(/Bob/)).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls handleBack when back button is clicked", () => {
    const handleBack = vi.fn();
    render(
      <DialogMatch
        open={true}
        userAName="Alice"
        userAPhoto="/users/alice.jpg"
        userBName="Bob"
        userBPhoto="/users/bob.jpg"
        handleBack={handleBack}
      />
    );
    const backBtn = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalled();
  });

  it("does not render dialog when open is false", () => {
    const handleBack = vi.fn();
    const { queryByRole } = render(
      <DialogMatch
        open={false}
        userAName="Alice"
        userAPhoto="/users/alice.jpg"
        userBName="Bob"
        userBPhoto="/users/bob.jpg"
        handleBack={handleBack}
      />
    );
    expect(queryByRole("dialog")).toBeNull();
  });
});
