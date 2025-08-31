import { describe, expect, it } from "vitest";
import { users } from "../fixtures/users";

describe("Fixtures", () => {
  it("should contain user data", () => {
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });
});
