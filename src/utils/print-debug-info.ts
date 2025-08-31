import { type User } from "../types/user";

export const printDebugInfo = (users: User[], currentUserId: number) => {
  console.table(
    users.map((user) => ({
      id: user.id,
      name: user.name,
      liked: user.liked?.join(", ") || " ",
      disliked: user.disliked?.join(", ") || " ",
      currentUser: user.id === currentUserId ? "✅" : " ",
      ...Object.fromEntries(
        Object.entries(user).filter(
          ([key]) => !["id", "name", "liked", "disliked"].includes(key)
        )
      ),
    }))
  );
};
