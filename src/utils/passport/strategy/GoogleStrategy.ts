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
