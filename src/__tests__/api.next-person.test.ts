import { beforeEach, describe, expect, it } from "vitest";
import * as api from "../api/db";

import actionHandler from "../api/action";
import nextUserHandler, { type NextUserResponse } from "../api/next-user";

describe("next-user API", () => {
  beforeEach(() => {
    api.resetAllUsers();
  });

  it("returns error if currentUserId is missing", () => {
    const res: NextUserResponse = nextUserHandler({
      currentUserId: undefined,
    });
    expect(res.errorCode).toBe("currentUserIdIsRequired");
    expect(res.nextUser).toBeUndefined();
  });

  it("returns error if user not found", () => {
    const res: NextUserResponse = nextUserHandler({ currentUserId: 999 });
    expect(res.errorCode).toBe("userNotFound");
    expect(res.nextUser).toBeNull();
  });

  it("returns a next user for valid user", () => {
    const users = api.getAllUsers();
    const res: NextUserResponse = nextUserHandler({
      currentUserId: users[0].id,
    });
    expect(res.nextUser).toBeDefined();
    expect(res.nextUser?.id).not.toBe(users[0].id);
  });

  it("returns error if no more profiles available", () => {
    const users = api.getAllUsers();
    // Like all other users
    users.slice(1).forEach((u) =>
      actionHandler({
        currentUserId: users[0].id,
        likedUserId: u.id,
        action: "like",
      })
    );
    const res: NextUserResponse = nextUserHandler({
      currentUserId: users[0].id,
    });
    expect(res.errorCode).toBe("noMoreProfilesAvailable");
    expect(res.nextUser).toBeNull();
  });
});
