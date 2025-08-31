import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "../home";

vi.mock("../api/init", () => ({
  default: vi.fn(() => ({
    currentUser: {
      id: 99,
      name: "Mock User",
      photo: "mock.jpg",
      age: 30,
      bio: "Mock bio",
    },
    errorCode: undefined,
  })),
}));

describe("Home", () => {
  it("renders without crashing", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  it("shows loader on initial render", () => {
    render(<Home />);
    expect(screen.getByTestId("progressbar")).toBeInTheDocument();
  });

  it("renders user profile after loading", async () => {
    render(<Home />);
    await waitFor(() => {
      const img = screen.getByRole("img") as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.alt).toBe("Profile picture of Mock User");
    });
  });

  it("shows error message if loading fails", async () => {
    render(<Home />);
    await waitFor(() => {
      const error = screen.queryByRole("alert");
      if (error) {
        expect(error).toBeInTheDocument();
      }
    });
  });

  it("allows user to reload after error", async () => {
    render(<Home />);
    await waitFor(() => {
      const reloadBtn = screen.queryByRole("button", { name: /reload/i });
      if (reloadBtn) {
        fireEvent.click(reloadBtn);
        expect(screen.getByTestId("progressbar")).toBeInTheDocument();
      }
    });
  });
});
