import { Router } from "express";
import passport from "passport";
import { AuthService } from "../../services/auth";
import { User } from "../../models/User";
import asyncHandler from "../middlewares/async-handler";

export default (app: Router) => {
  const route = Router();

  route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  route.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    asyncHandler(async (req, res) => {
      const { user } = req;

      const authService = new AuthService(User);
      const [accessToken, refreshToken] = await authService.login(user);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      res.status(200).json({ isOk: true });
    })
  );

  app.use("/auth", route);
};
