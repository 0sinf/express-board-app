import passport from "passport";
import local from "./strategy/LocalStrategy.js";

export default () => {
  passport.use(local);
  passport.initialize();

  passport.serializeUser((token, done) => {
    return done(null, token);
  });

  passport.deserializeUser((token, done) => {
    return done(null, token);
  });
};
