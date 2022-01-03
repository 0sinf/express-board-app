import { User } from "../models/User.js";

async function createUser(email, password, name) {
  const user = await User.createUser(email, password, name);
  return user.id;
}

export { createUser };
