import { beforeEach, describe, expect, it } from "vitest";
import * as api from "../api/db";

describe("db API", () => {
  beforeEach(() => {
    api.resetAllUsers();
  });

  it("should export all expected functions", () => {
    expect(typeof api.getAllUsers).toBe("function");
    expect(typeof api.resetAllUsers).toBe("function");
    expect(typeof api.getUserById).toBe("function");
    expect(typeof api.getRemainingUsers).toBe("function");
    expect(typeof api.updateCurrentUser).toBe("function");
  });

  it("getAllUsers returns an array of users", () => {
    const users = api.getAllUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it("getUserById returns a user for valid id", () => {
    const users = api.getAllUsers();
    const user = api.getUserById(users[0].id);
    expect(user).toBeDefined();
    expect(user?.id).toBe(users[0].id);
  });

  it("getUserById returns null for invalid id", () => {
    const user = api.getUserById(-1);
    expect(user).toBeNull();
  });

  it("getRemainingUsers returns correct users", () => {
    const users = api.getAllUsers();
    const currentUser = users[0];
    const remaining = api.getRemainingUsers(currentUser.id);
    expect(Array.isArray(remaining)).toBe(true);
    expect(remaining.find((u) => u.id === currentUser.id)).toBeUndefined();
  });

  it("updateCurrentUser updates liked/disliked arrays", () => {
    const users = api.getAllUsers();
    const currentUser = { ...users[0], liked: [], disliked: [] };
    api.updateCurrentUser(currentUser);
    const updated = api.getUserById(currentUser.id);
    expect(updated?.liked).toEqual([]);
    expect(updated?.disliked).toEqual([]);
  });
});
