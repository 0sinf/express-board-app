import { User } from "../models/User";

export async function findUserById(userId: string) {
  const user = await User.findUserById(userId);
  const { id, nickname, firstName, lastName, profile } = user;
  return { id, nickname, firstName, lastName, profile };
}
