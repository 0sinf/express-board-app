import { Request, Response, NextFunction } from "express";
import { sign, verify, decode } from "jsonwebtoken";
import { ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { User } from "../../../models/User";

dotenv.config();

export const isLoginedRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req header authorization 체크
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (!token) {
    return next("로그인이 필요합니다.");
  }

  // 문제점!
  // decode는 시크릿 키를 검증하지 않는다. 그저 페이로드를 디코딩할 뿐,

  // 액세스 토큰 검증
  const { googleId, iat, exp } = Object(decode(token));
  const user = await User.findByGoogleId({ googleId });

  // 리프레시 토큰 확인
  const { refreshToken } = user;
  const { iat: refreshIat, exp: refreshExp } = Object(decode(refreshToken));

  // 만료된 액세스 토큰
  if (iat >= exp) {
    // 리프레시 토큰도 만료
    if (refreshIat >= refreshExp) {
      return next("로그인이 필요합니다.");
    }

    // 리프레시 토큰은 만료 아님
    const newAccessToken = sign({ googleId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  req.user = user;
  return next();
};

export const isLoginedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  const { googleId } = Object(decode(token));
  const user = await User.findByGoogleId({ googleId });
  req.user = user;
  return next();
};
