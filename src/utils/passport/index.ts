import passport from "passport";
import google from "./strategy/GoogleStrategy";

export default () => {
  passport.use(google);
  passport.initialize();
};
