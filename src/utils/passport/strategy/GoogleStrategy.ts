import {
  Strategy as GooogleStrategy,
  StrategyOptions,
} from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../../models/User";

dotenv.config();

const opts: StrategyOptions = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
};

export default new GooogleStrategy(
  opts,
  async (_accessToken, _refreshToken, profile, done) => {
    const { id, displayName, name, photos, provider } = profile;
    if (provider !== "google") {
      done("Incorrect access");
    }

    // access token, refresh token 생성
    // 유저 정보 저장
    // 토큰 생성하고 어떻게 전달할까ㅏㅏㅏㅏ
    // 여기선 리프레시 토큰 생성하고 디비에 저장하고, 유저 값 전달?
    // 그리고 라우터에서 받아서 액세스 토큰 생성하고 전달?
    const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });

    const user = await User.findOrCreate(id, {
      displayName,
      name,
      photos,
      refreshToken,
    });
    done(null, user);
  }
);
