import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { User } from "../../../models/User";

export const loginRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, _user, info) => {
      if (error) {
        return next(error);
      }
      if (!_user) {
        if (info instanceof TokenExpiredError) {
          return next("만료된 토큰입니다.");
        }
        return next("로그인이 필요합니다.");
      }

      const user = await User.findOneByGoogleId(_user);

      req.user = user;
      return next();
    }
  )(req, res, next);
};
