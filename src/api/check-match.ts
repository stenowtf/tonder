import { type Person } from "../types/person";
import { getUserById } from "./db";

type CheckMatchRequest = {
  userAId: number | undefined;
  userBId: number | undefined;
};

export type CheckMatchResponse = {
  match: boolean;
  matchedPerson?: Person;
  errorCode?: string;
};

export default function handler({
  userAId,
  userBId,
}: CheckMatchRequest): CheckMatchResponse {
  if (!userAId) {
    return { match: false, errorCode: "userAIdIsRequired" };
  }
  if (!userBId) {
    return { match: false, errorCode: "userBIdIsRequired" };
  }

  const userA = getUserById(userAId);
  const userB = getUserById(userBId);

  if (!userA || !userB) {
    return { match: false, errorCode: "userNotFound" };
  }

  const match = userA.liked.includes(userBId) && userB.liked.includes(userAId);

  return { match, matchedPerson: match ? userB : undefined };
}
