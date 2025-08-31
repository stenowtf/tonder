import { type User } from "../types/user";
import { getRemainingUsers, getUserById, resetAllUsers } from "./db";

type NextUserRequest = {
  currentUserId: number | undefined;
};

export type NextUserResponse = {
  nextUser: User | undefined | null;
  errorCode?: string;
};

export default function handler({
  currentUserId,
}: NextUserRequest): NextUserResponse {
  if (!currentUserId) {
    return {
      nextUser: undefined,
      errorCode: "currentUserIdIsRequired",
    };
  }

  const currentUser = getUserById(currentUserId);

  if (!currentUser) {
    return { nextUser: null, errorCode: "userNotFound" };
  }

  const remainingUsers = getRemainingUsers(currentUserId);

  const nextUser =
    remainingUsers.length > 0
      ? remainingUsers[Math.floor(Math.random() * remainingUsers.length)]
      : undefined;

  if (nextUser) {
    return { nextUser };
  }

  resetAllUsers();

  return {
    nextUser: null,
    errorCode: "noMoreProfilesAvailable",
  };
}
