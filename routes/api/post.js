import { Router } from "express";
import { createPost } from "../../services/post";
import loginRequried from "../middlewares/login-requried";

export default (app) => {
  const route = Router();

  route.post("/", loginRequried, async (req, res) => {
    const userId = req.user.id;
    const { title, contents } = req.body;
    const postId = await createPost(title, contents, userId);
    res.status(200).json({ isOk: true, postId });
  });

  app.use("/posts", route);
};
