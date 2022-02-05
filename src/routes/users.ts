import { Router } from "express";
import { UserService } from "../services/UserService";

const route = Router();

route.post("/", async (req, res) => {
  const userService = new UserService();
  const userId = await userService.create(req.body);
  res.status(201).json({ isOk: true, userId });
});

route.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const userService = new UserService();
  const user = await userService.getUserInfo(userId);
  res.status(200).json({ isOk: true, user });
});

export default route;
