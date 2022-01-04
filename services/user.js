import { User } from "../models/User.js";
import bcrypt from "bcrypt";

async function createUser(email, password, name) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.createUser(email, hashedPassword, name);
  return user.id;
}

async function checkUser(email, password) {
  const user = await User.findUserById(email);
  if (!user) {
    return false;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return false;
  }
  return true;
}

export { createUser, checkUser };
