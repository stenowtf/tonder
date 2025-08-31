import { beforeEach, describe, expect, it } from "vitest";
import * as api from "../api/db";

import actionHandler from "../api/action";
import checkMatchHandler, { type CheckMatchResponse } from "../api/check-match";

describe("check-match API", () => {
  beforeEach(() => {
    api.resetAllUsers();
  });

  it("returns error if userAId is missing", () => {
    const res: CheckMatchResponse = checkMatchHandler({
      userId: undefined,
      targetId: 2,
    });
    expect(res.errorCode).toBe("userAIdIsRequired");
    expect(res.match).toBe(false);
  });

  it("returns error if userBId is missing", () => {
    const res: CheckMatchResponse = checkMatchHandler({
      userId: 1,
      targetId: undefined,
    });
    expect(res.errorCode).toBe("userBIdIsRequired");
    expect(res.match).toBe(false);
  });

  it("returns error if user not found", () => {
    const res: CheckMatchResponse = checkMatchHandler({
      userId: 999,
      targetId: 2,
    });
    expect(res.errorCode).toBe("userNotFound");
    expect(res.match).toBe(false);
  });

  it("returns match false if not mutual", () => {
    const res: CheckMatchResponse = checkMatchHandler({
      userId: 1,
      targetId: 3,
    });
    expect(res.match).toBe(false);
  });

  it("returns match true if mutual", () => {
    // Make mutual like
    actionHandler({ currentUserId: 1, likedUserId: 2, action: "like" });
    actionHandler({ currentUserId: 2, likedUserId: 1, action: "like" });
    const res: CheckMatchResponse = checkMatchHandler({
      userId: 1,
      targetId: 2,
    });
    expect(res.match).toBe(true);
    expect(res.matchedUser?.id).toBe(2);
  });
});
