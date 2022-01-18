import passport from "passport";
import local from "./strategy/LocalStrategy.js";

export default () => {
  passport.use(local);
  passport.initialize();
};
