import express from "express";
import passport from "passport";
import { createUser } from "../../services/user.js";
import loginRequried from "../middlewares/login-requried.js";
import asyncHandler from "../middlewares/async-handler.js";

export default (app) => {
  const route = express.Router();

  route.post(
    "/signup",
    asyncHandler(async (req, res) => {
      const { email, password, name } = req.body;
      const userId = await createUser(email, password, name);
      res.status(201).json({ userId });
    })
  );

  route.post(
    "/login",
    passport.authenticate("local", {
      session: false,
    }),
    asyncHandler(async (req, res) => {
      res.status(200).json({ isOk: true, token: req.user });
    })
  );

  route.get(
    "/",
    loginRequried,
    asyncHandler(async (req, res) => {
      const { email, name } = req.user;
      res.status(200).json({ email, name });
    })
  );

  app.use("/users", route);
};