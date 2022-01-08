import express from "express";
import passport from "passport";
import { createUser } from "../../services/user.js";
import loginRequried from "../middlewares/login-requried.js";

export default (app) => {
  const route = express.Router();

  app.use("/users", route);

  route.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
    const userId = await createUser(email, password, name);
    res.status(201).json({ userId });
  });

  route.post(
    "/login",
    passport.authenticate("local", {
      session: false,
    }),
    async (req, res) => {
      res.status(200).json({ isOk: true, token: req.user });
    }
  );

  route.get("/", loginRequried, async (req, res) => {
    const { email, name } = req.user;
    res.status(200).json({ email, name });
  });

  route.post("/passport");
};
