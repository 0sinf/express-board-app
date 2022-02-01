import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/async-handler";

dotenv.config();

export default (app: Router) => {
  const route = Router();

  route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  route.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    asyncHandler(async (req, res) => {
      const { user } = req;
      const accessToken = jwt.sign(
        { googleId: user.googleId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res.status(200).json({ isOk: true });
    })
  );

  app.use("/auth", route);
};
