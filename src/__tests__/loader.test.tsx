import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loader } from "../components/loader";

describe("Loader", () => {
  it("renders backdrop and spinner", () => {
    render(<Loader />);
    expect(screen.getByTestId("progressbar")).toBeInTheDocument();
  });
});
