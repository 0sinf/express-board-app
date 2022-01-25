import { Router } from "express";
import { findUserById } from "../../services/user";
import asyncHandler from "../middlewares/async-handler";

export default (app: Router) => {
  const route = Router();

  route.get(
    "/:userId",
    asyncHandler(async (req, res) => {
      const { userId } = req.params;
      const user = await findUserById(userId);
      res.status(200).json(user);
    })
  );

  app.use("/users", route);
};
