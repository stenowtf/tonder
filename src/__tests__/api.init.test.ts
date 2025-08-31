import { describe, expect, it } from "vitest";

import initHandler from "../api/init";

describe("init API", () => {
  it("returns a currentUser from users", () => {
    const res = initHandler();
    expect(res.currentUser).toBeDefined();
    expect(typeof res.currentUser?.id).toBe("number");
  });
});
