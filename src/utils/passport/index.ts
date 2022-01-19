import passport from "passport";
import local from "./strategy/LocalStrategy";

export default () => {
  passport.use(local);
  passport.initialize();
};
