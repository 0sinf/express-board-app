import express from "express";
import { createUser, checkUser } from "../services/user.js";

const route = express.Router();

route.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const userId = await createUser(email, password, name);
  res.status(201).json({ userId });
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isValid = await checkUser(email, password);
  if (isValid) {
    res.status(200).json({ isOk: true });
  } else {
    res
      .status(400)
      .json({ isOk: false, msg: "존재하지 않거나 비밀번호가 틀렸습니다." });
  }
});

export default route;
