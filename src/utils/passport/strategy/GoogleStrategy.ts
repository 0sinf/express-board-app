import {
  Strategy as GooogleStrategy,
  StrategyOptions,
} from "passport-google-oauth20";
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
  async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, name, photos, provider } = profile;
    if (provider !== "google") {
      done("Incorrect access");
    }
    const user = await User.findOrCreate(id, { id, displayName, name, photos });
    done(null, user);
  }
);
