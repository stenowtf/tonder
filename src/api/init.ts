import { users } from "../fixtures/users";
import type { Person } from "../types/person";

type InitResponse = {
  currentUser: Person | null;
};

export default function handler(): InitResponse {
  if (!users.length) {
    return { currentUser: null };
  }

  const idx = Math.floor(Math.random() * users.length);
  const currentUser = users[idx];

  return { currentUser };
}
