import express from "express";
import { createUser } from "../services/user.js";

const route = express.Router();

route.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const userId = await createUser(email, password, name);
  res.status(201).json({ userId });
});

export default route;
