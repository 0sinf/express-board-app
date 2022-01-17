import { Strategy as LocalStratey } from "passport-local";

import { User } from "../../../models/User";
import { createToken } from "../../jwt";

const opts = {
  usernameField: "email",
  passwordField: "password",
};

export default new LocalStratey(opts, async function (
  email: string,
  password: string,
  done
) {
  const user = await User.findUserById(email);
  if (!user) {
    return done(null, false);
  }
  if (!user.verifyPassword(password)) {
    return done(null, false);
  }
  const token = createToken(user);
  return done(null, token);
});
