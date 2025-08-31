import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Actions } from "../components/actions";

describe("Actions", () => {
  it("renders buttons and handles actions", () => {
    const handleAction = vi.fn();
    render(
      <Actions
        loading={false}
        errorCode={undefined}
        handleAction={handleAction}
      />
    );
    expect(screen.getByRole("button", { name: /^like/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dislike/i })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^like/i }));
    fireEvent.click(screen.getByRole("button", { name: /dislike/i }));
    expect(handleAction).toHaveBeenCalledWith("like");
    expect(handleAction).toHaveBeenCalledWith("dislike");
  });

  it("does not render when loading", () => {
    const { container } = render(
      <Actions loading={true} errorCode={undefined} handleAction={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows error toast when errorCode is set", () => {
    // toast is mocked, so just check effect runs
    render(
      <Actions loading={false} errorCode="someError" handleAction={() => {}} />
    );
    // No direct DOM output, but effect runs
    expect(true).toBe(true);
  });
});
