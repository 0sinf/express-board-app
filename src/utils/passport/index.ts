import passport from "passport";
import google from "./strategy/GoogleStrategy";
import jwt from "./strategy/JwtStrategy";

export default () => {
  passport.use(google);
  passport.use(jwt);
  passport.initialize();
};
