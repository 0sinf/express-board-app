import { User } from "../models/User.js";

async function createUser(email, password, name) {
  const user = await User.create({
    email,
    password,
    name,
  });
  return user.id;
}
