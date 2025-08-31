import { beforeEach, describe, expect, it } from "vitest";
import * as api from "../api/db";

import actionHandler from "../api/action";
import nextPersonHandler, { type NextPersonResponse } from "../api/next-person";

describe("next-person API", () => {
  beforeEach(() => {
    api.resetAllUsers();
  });

  it("returns error if currentUserId is missing", () => {
    const res: NextPersonResponse = nextPersonHandler({
      currentUserId: undefined,
    });
    expect(res.errorCode).toBe("currentUserIdIsRequired");
    expect(res.nextPerson).toBeUndefined();
  });

  it("returns error if user not found", () => {
    const res: NextPersonResponse = nextPersonHandler({ currentUserId: 999 });
    expect(res.errorCode).toBe("userNotFound");
    expect(res.nextPerson).toBeNull();
  });

  it("returns a next person for valid user", () => {
    const users = api.getAllUsers();
    const res: NextPersonResponse = nextPersonHandler({
      currentUserId: users[0].id,
    });
    expect(res.nextPerson).toBeDefined();
    expect(res.nextPerson?.id).not.toBe(users[0].id);
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
    const res: NextPersonResponse = nextPersonHandler({
      currentUserId: users[0].id,
    });
    expect(res.errorCode).toBe("noMoreProfilesAvailable");
    expect(res.nextPerson).toBeNull();
  });
});
