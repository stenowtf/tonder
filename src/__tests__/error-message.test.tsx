import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorMessage } from "../components/error-message";

describe("ErrorMessage", () => {
  it("renders error message", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders with role alert for accessibility", () => {
    render(<ErrorMessage message="Alert!" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders nothing if message is empty", () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders reload button and handles click", () => {
    const onClick = vi.fn();
    render(
      <ErrorMessage message="Error!" showReload={true} onClick={onClick} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("does not render reload button if showReload is false", () => {
    render(<ErrorMessage message="Error!" showReload={false} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
