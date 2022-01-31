import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const isLoginedRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user, info) => {
      if (error || !user) {
        return next("로그인이 필요합니다.");
      }
      req.user = user;
      next();
    }
  );
};
