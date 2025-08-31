import { type Person } from "../types/person";

export const printDebugInfo = (users: Person[], currentUserId: number) => {
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
