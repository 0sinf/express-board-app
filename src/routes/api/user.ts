import { Router } from "express";
import { findUserById } from "../../services/user";
import { isLoginedRequired } from "../../utils/passport/guards/jwt-guard";
import asyncHandler from "../middlewares/async-handler";

export default (app: Router) => {
  const route = Router();

  route.get(
    "/",
    isLoginedRequired,
    asyncHandler(async (req, res) => {
      const id = req.user.id;
      const user = await findUserById(id);
      res.status(200).json(user);
    })
  );

  app.use("/users", route);
};
