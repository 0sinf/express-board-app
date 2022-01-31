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
      // 아예 말도 안되는 에러
      if (error) {
        // 액세스 토큰 만료, 리프레시 토큰 만료
        // 액세스 토큰 만료, 리프레시 토큰 ok
        return next(error);
      }
      if (!user) {
        return next("로그인이 필요합니다.");
      }

      // 액세스 토큰 ok, 리프레시 토큰 만료 시 리프레시 토큰 리프레시

      // 둘 다 ok
      req.user = user;
      next();
    }
  )(req, res, next);
};
