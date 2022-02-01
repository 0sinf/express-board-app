import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-jwt";
import { jwtSecretKey } from "../../../config";

const jwtOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

const jwtVerify: VerifyCallback = async function (payload, done) {
  if (!payload) {
    done(null, false, "로그인이 필요합니다.");
  }
  done(null, { googleId: payload.googleId });
};

const refreshJwtOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

const refreshJwtVerify: VerifyCallback = async function (payload, done) {
  if (!payload) {
    done(null, false, "로그인이 필요합니다");
  }
  done(null, { googleId: payload.googleId });
};

export const JwtStrategy = new Strategy(jwtOpts, jwtVerify);
export const refreshJwtStrategy = new Strategy(
  refreshJwtOpts,
  refreshJwtVerify
);
