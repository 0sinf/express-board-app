import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { User } from "../../../models/User";

export const isLogined = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, _user, info) => {
      req.user = _user;
      return next();
    }
  )(req, res, next);
};

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

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "refresh-jwt",
    { session: false },
    async (error, _user, info) => {
      if (!_user && !req.user) {
        return next("로그인이 필요합니다.");
      }
      req.user = req.user || _user;
      return next();
    }
  )(req, res, next);
};
