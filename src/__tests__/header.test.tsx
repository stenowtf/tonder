import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "../components/header";

describe("Header", () => {
  it("renders title and user info", () => {
    render(
      <Header currentUserName="Alice" currentUserPhoto="/users/alice.jpg" />
    );
    expect(screen.getByText(/tonder/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/users/alice.jpg");
  });

  it("renders title only if user info missing", () => {
    render(<Header currentUserName={undefined} currentUserPhoto={undefined} />);
    expect(screen.getByText(/tonder/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alice/)).toBeNull();
  });
});
