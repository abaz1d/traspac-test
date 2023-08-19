import type { User } from "~~/types";

export async function isUser(user?: User) {
  return user && user.token;
}
