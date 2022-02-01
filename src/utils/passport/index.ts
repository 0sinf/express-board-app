import passport from "passport";
import GoogleStrategy from "./strategy/GoogleStrategy";
import { JwtStrategy, refreshJwtStrategy } from "./strategy/JwtStrategy";

export default () => {
  passport.use("google", GoogleStrategy);
  passport.use("jwt", JwtStrategy);
  passport.use("refresh-jwt", refreshJwtStrategy);
  passport.initialize();
};
