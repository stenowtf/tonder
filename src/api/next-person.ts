import { type Person } from "../types/person";
import { getRemainingUsers, getUserById, resetAllUsers } from "./db";

type NextPersonRequest = {
  currentUserId: number | undefined;
};

export type NextPersonResponse = {
  nextPerson: Person | undefined | null;
  errorCode?: string;
};

export default function handler({
  currentUserId,
}: NextPersonRequest): NextPersonResponse {
  if (!currentUserId) {
    return {
      nextPerson: undefined,
      errorCode: "currentUserIdIsRequired",
    };
  }

  const currentUser = getUserById(currentUserId);

  if (!currentUser) {
    return { nextPerson: null, errorCode: "userNotFound" };
  }

  const remainingPersons = getRemainingUsers(currentUserId);

  const nextPerson =
    remainingPersons.length > 0
      ? remainingPersons[Math.floor(Math.random() * remainingPersons.length)]
      : undefined;

  if (nextPerson) {
    return { nextPerson };
  }

  resetAllUsers();

  return {
    nextPerson: null,
    errorCode: "noMoreProfilesAvailable",
  };
}
