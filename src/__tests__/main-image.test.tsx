import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MainImage } from "../components/main-image";

describe("MainImage", () => {
  it("renders image and handles events", () => {
    const setMainImageLoaded = vi.fn();
    const setHideInfoOnMouseOver = vi.fn();
    render(
      <MainImage
        imageSrc="/users/alice.jpg"
        imageAlt="Alice"
        setMainImageLoaded={setMainImageLoaded}
        setHideInfoOnMouseOver={setHideInfoOnMouseOver}
      />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/users/alice.jpg");
    expect(img).toHaveAttribute("alt", "Alice");
    fireEvent.load(img);
    expect(setMainImageLoaded).toHaveBeenCalledWith(true);
    fireEvent.mouseOver(img);
    expect(setHideInfoOnMouseOver).toHaveBeenCalledWith(true);
    fireEvent.mouseOut(img);
    expect(setHideInfoOnMouseOver).toHaveBeenCalledWith(false);
  });

  it("calls setMainImageLoaded(false) on error", () => {
    const setMainImageLoaded = vi.fn();
    const setHideInfoOnMouseOver = vi.fn();
    render(
      <MainImage
        imageSrc="/broken.jpg"
        imageAlt="Broken"
        setMainImageLoaded={setMainImageLoaded}
        setHideInfoOnMouseOver={setHideInfoOnMouseOver}
      />
    );
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(setMainImageLoaded).toHaveBeenCalledWith(false);
  });

  it("sets correct alt text for accessibility", () => {
    render(
      <MainImage
        imageSrc="/users/alice.jpg"
        imageAlt="Profile picture of Alice"
        setMainImageLoaded={() => {}}
        setHideInfoOnMouseOver={() => {}}
      />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Profile picture of Alice");
  });

  it("renders nothing if imageSrc is undefined", () => {
    const setMainImageLoaded = vi.fn();
    const setHideInfoOnMouseOver = vi.fn();
    const { container } = render(
      <MainImage
        imageSrc={undefined}
        imageAlt=""
        setMainImageLoaded={setMainImageLoaded}
        setHideInfoOnMouseOver={setHideInfoOnMouseOver}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
