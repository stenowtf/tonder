import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type User } from "../types/user";
import { printDebugInfo } from "../utils/print-debug-info";

describe("printDebugInfo", () => {
  const users: User[] = [
    {
      id: 1,
      name: "Alice",
      liked: [2, 3],
      disliked: [4],
      age: 25,
      gender: "f",
      bio: "Hello!",
      photo: "alice.jpg",
    },
    {
      id: 2,
      name: "Bob",
      liked: [],
      disliked: [],
      age: 30,
      gender: "m",
      bio: "Hi there!",
      photo: "bob.jpg",
    },
  ];

  let tableSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    tableSpy = vi.spyOn(console, "table").mockImplementation(() => {});
  });

  afterEach(() => {
    tableSpy.mockRestore();
  });

  it("calls console.table with correct data in development", () => {
    printDebugInfo(users, 2);

    expect(tableSpy).toHaveBeenCalledTimes(1);
    const arg = tableSpy.mock.calls[0][0];
    expect(arg).toEqual([
      {
        id: 1,
        name: "Alice",
        liked: "2, 3",
        disliked: "4",
        currentUser: " ",
        age: 25,
        gender: "f",
        bio: "Hello!",
        photo: "alice.jpg",
      },
      {
        id: 2,
        name: "Bob",
        liked: " ",
        disliked: " ",
        currentUser: "✅",
        age: 30,
        gender: "m",
        bio: "Hi there!",
        photo: "bob.jpg",
      },
    ]);
  });
});
