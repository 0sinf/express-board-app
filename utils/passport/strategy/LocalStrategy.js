import { Strategy as LocalStratey } from "passport-local";

import { User } from "../../../models/User.js";
import { createToken } from "../../jwt.js";

const opts = {
  usernameField: "email",
  passwordField: "password",
};

export default new LocalStratey(opts, async function (email, password, done) {
  const user = await User.findUserById(email);
  if (!user) {
    return done(null, false);
  }
  if (!user.verifyPassword(password)) {
    return done(null, false);
  }
  const token = await createToken(user);
  return done(null, token);
});
