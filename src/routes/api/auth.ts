import { Router } from "express";
import passport from "passport";
import asyncHandler from "../middlewares/async-handler";

export default (app: Router) => {
  const route = Router();

  route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  route.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    asyncHandler(async (req, res) => {
      res.status(200).json({ isOk: true });
    })
  );

  app.use("/auth", route);
};
