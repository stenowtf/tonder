import { users } from "../fixtures/users";
import { type User } from "../types/user";
import { printDebugInfo } from "../utils/print-debug-info";

let allUsers: User[] = users;

export const getAllUsers = () => {
  return allUsers;
};

export const resetAllUsers = () => {
  allUsers = users;
};

export const getUserById = (id: number) => {
  return allUsers.find((user) => user.id === id) || null;
};

const getShownUserIds = (id: number) => {
  const currentUser = getUserById(id);

  if (!currentUser) {
    return [];
  }

  return [...currentUser.liked, ...currentUser.disliked];
};

export const getRemainingUsers = (id: number) => {
  const shownIds = getShownUserIds(id);

  return allUsers.filter(
    (user) => user.id !== id && !shownIds.includes(user.id)
  );
};

export const updateCurrentUser = (updatedUser: User) => {
  allUsers = allUsers.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  printDebugInfo(allUsers, updatedUser.id);
};
