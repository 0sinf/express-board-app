import passport from "passport";
import GoogleStrategy from "./strategy/GoogleStrategy";
import { JwtStrategy } from "./strategy/JwtStrategy";

export default () => {
  passport.use("google", GoogleStrategy);
  passport.use("jwt", JwtStrategy);
  passport.initialize();
};
