import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextUser } from "../components/next-user";

vi.mock("../api/next-user", () => ({
  default: vi.fn(() => ({
    nextUser: {
      id: 99,
      name: "Mock User",
      photo: "mock.jpg",
      age: 30,
      bio: "Mock bio",
    },
    errorCode: undefined,
  })),
}));

describe("NextUser", () => {
  it("renders without crashing", () => {
    render(
      <NextUser
        currentUserId={1}
        currentUserName="Test"
        currentUserPhoto="test.jpg"
      />
    );
  });

  it("renders a random user card", async () => {
    render(
      <NextUser
        currentUserId={1}
        currentUserName="Test"
        currentUserPhoto="test.jpg"
      />
    );
    await waitFor(() => {
      const img = screen.getByRole("img") as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.alt).toBe("Profile picture of Mock User");
    });
  });
});
