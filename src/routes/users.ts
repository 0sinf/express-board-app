import { Router } from "express";
import { UserService } from "../services/UserService";

const route = Router();

route.post("/", async (req, res) => {
  const userService = new UserService();
  const userId = await userService.create(req.body);
  res.status(201).json({ isOk: true, userId });
});

export default route;
