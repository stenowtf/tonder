import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NextPerson } from "../components/next-person";

vi.mock("../api/next-person", () => ({
  default: vi.fn(() => ({
    nextPerson: {
      id: 99,
      name: "Mock User",
      photo: "mock.jpg",
      age: 30,
      bio: "Mock bio",
    },
    errorCode: undefined,
  })),
}));

describe("NextPerson", () => {
  it("renders without crashing", () => {
    render(
      <NextPerson
        currentUserId={1}
        currentUserName="Test"
        currentUserPhoto="test.jpg"
      />
    );
  });

  it("renders a random user card", async () => {
    render(
      <NextPerson
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
