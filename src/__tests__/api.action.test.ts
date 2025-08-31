import { beforeEach, describe, expect, it } from "vitest";
import * as api from "../api/db";

import actionHandler, { type ActionResponse } from "../api/action";

describe("action API", () => {
  beforeEach(() => {
    api.resetAllUsers();
  });

  it("returns error if currentUserId is missing", () => {
    const res: ActionResponse = actionHandler({
      currentUserId: undefined,
      likedUserId: 2,
      action: "like",
    });
    expect(res.errorCode).toBe("currentUserIdIsRequired");
  });

  it("returns error if likedUserId is missing", () => {
    const res: ActionResponse = actionHandler({
      currentUserId: 1,
      likedUserId: undefined,
      action: "like",
    });
    expect(res.errorCode).toBe("likedUserIdIsRequired");
  });

  it("returns error for invalid action", () => {
    const res: ActionResponse = actionHandler({
      currentUserId: 1,
      likedUserId: 2,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: "invalid" as any,
    });
    expect(res.errorCode).toBe("invalidAction");
  });

  it("adds liked user to liked array", () => {
    actionHandler({ currentUserId: 1, likedUserId: 3, action: "like" });
    const user = api.getUserById(1);
    expect(user?.liked).toContain(3);
  });

  it("adds disliked user to disliked array", () => {
    actionHandler({ currentUserId: 1, likedUserId: 4, action: "dislike" });
    const user = api.getUserById(1);
    expect(user?.disliked).toContain(4);
  });
});
