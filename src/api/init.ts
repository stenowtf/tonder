import { users } from "../fixtures/users";
import type { User } from "../types/user";
import { printDebugInfo } from "../utils/print-debug-info";

type InitResponse = {
  currentUser: User | null;
};

export default function handler(): InitResponse {
  if (!users.length) {
    return { currentUser: null };
  }

  const idx = Math.floor(Math.random() * users.length);
  const currentUser = users[idx];

  printDebugInfo(users, currentUser.id);

  return { currentUser };
}
