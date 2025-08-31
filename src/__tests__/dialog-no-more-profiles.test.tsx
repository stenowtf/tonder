import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DialogNoMoreProfiles } from "../components/dialog-no-more-profiles";

describe("DialogNoMoreProfiles", () => {
  it("renders dialog and handles CTA click", () => {
    const onClick = vi.fn();
    render(<DialogNoMoreProfiles open={true} onClick={onClick} />);
    expect(screen.getByText(/no more profiles/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("does not render dialog when open is false", () => {
    const onClick = vi.fn();
    const { queryByRole } = render(
      <DialogNoMoreProfiles open={false} onClick={onClick} />
    );
    expect(queryByRole("dialog")).toBeNull();
  });
});
