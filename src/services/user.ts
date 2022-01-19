import { User } from "../models/User";
import bcrypt from "bcrypt";

async function createUser(
  email: string,
  password: string,
  name: string
): Promise<string> {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userId = await User.createUser(email, hashedPassword, name);
  return userId;
}

export { createUser };
