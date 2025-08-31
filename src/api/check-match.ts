import { type User } from "../types/user";
import { getUserById } from "./db";

type CheckMatchRequest = {
  userId: number | undefined;
  targetId: number | undefined;
};

export type CheckMatchResponse = {
  match: boolean;
  matchedUser?: User;
  errorCode?: string;
};

export default function handler({
  userId,
  targetId,
}: CheckMatchRequest): CheckMatchResponse {
  if (!userId) {
    return { match: false, errorCode: "userIdIsRequired" };
  }
  if (!targetId) {
    return { match: false, errorCode: "targetIdIsRequired" };
  }

  const userA = getUserById(userId);
  const userB = getUserById(targetId);

  if (!userA || !userB) {
    return { match: false, errorCode: "userNotFound" };
  }

  const match = userA.liked.includes(targetId) && userB.liked.includes(userId);

  return { match, matchedUser: match ? userB : undefined };
}
