import { users } from "../fixtures/users";
import { type Person } from "../types/person";

let allUsers: Person[] = users;

export const getAllUsers = () => {
  return allUsers;
};

export const resetAllUsers = () => {
  allUsers = users;
};

export const getUserById = (id: number) => {
  return users.find((user) => user.id === id) || null;
};

export const initUserForCurrentUser = (currentUserId: number) => {
  return users.find((user) => user.id === currentUserId) || null;
};

export const getOtherUsers = (currentUserId: number) => {
  return users.filter((user) => user.id !== currentUserId);
};

export const updateUserLikes = (
  userId: number,
  likedId: number,
  isLiked: boolean
) => {
  const currentUser: Person | undefined = allUsers.find((u) => u.id === userId);

  console.log("updateUserLikes:", userId, likedId);

  if (currentUser) {
    if (isLiked) {
      if (!currentUser.liked.includes(likedId)) {
        currentUser.liked.push(likedId);
      }
    } else {
      if (!currentUser.disliked.includes(likedId)) {
        currentUser.disliked.push(likedId);
      }
    }

    allUsers = allUsers.map((user) =>
      user.id === userId ? currentUser : user
    );

    console.log("Updated allUsers:", allUsers);
  }
};
