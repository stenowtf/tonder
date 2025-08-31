import { users } from "../fixtures/users";
import type { Person } from "../types/person";
import { printDebugInfo } from "../utils/print-debug-info";

type InitResponse = {
  currentUser: Person | null;
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
