import { type Action } from "../types/action";
import { getUserById, updateCurrentUser } from "./db";

type ActionRequest = {
  currentUserId: number | undefined;
  likedUserId: number | undefined;
  action: Action;
};

export type ActionResponse = {
  errorCode?: string;
};

export default function handler({
  currentUserId,
  likedUserId,
  action,
}: ActionRequest): ActionResponse {
  if (!currentUserId) {
    return { errorCode: "currentUserIdIsRequired" };
  }

  if (!likedUserId) {
    return { errorCode: "likedUserIdIsRequired" };
  }

  const currentUser = getUserById(currentUserId);

  if (currentUser) {
    switch (action) {
      case "like":
        if (!currentUser.liked.includes(likedUserId)) {
          currentUser.liked.push(likedUserId);
        }
        break;
      case "dislike":
        if (!currentUser.disliked.includes(likedUserId)) {
          currentUser.disliked.push(likedUserId);
        }
        break;
      default:
        return { errorCode: "invalidAction" };
    }

    updateCurrentUser(currentUser);
  }

  return {};
}
