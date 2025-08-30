import { users } from "../fixtures/users";
import { type Person } from "../types/person";
import { resetAllUsers } from "./db";

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
      nextPerson: null,
      errorCode: "currentUserIdIsRequired",
    };
  }

  const currentUser = users.find((u) => u.id === currentUserId);
  const shownIds: number[] = currentUser
    ? [...currentUser.liked, ...currentUser.disliked]
    : [];

  console.log("Current user:", currentUser);
  console.log("Shown IDs:", shownIds);

  if (!currentUser) {
    return { nextPerson: null, errorCode: "userNotFound" };
  }

  const remainingPersons = users.filter(
    (user) => user.id !== currentUserId && !shownIds.includes(user.id)
  );
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
