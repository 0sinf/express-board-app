import { Router } from "express";
import { createPost, findPostById } from "../../services/post";
import loginRequried from "../middlewares/login-requried";

export default (app) => {
  const route = Router();

  route.post("/", loginRequried, async (req, res) => {
    const userId = req.user.id;
    const { title, contents } = req.body;
    const postId = await createPost(title, contents, userId);
    res.status(200).json({ isOk: true, postId });
  });

  route.get("/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await findPostById(postId);
    res.status(201).json(post);
  });

  app.use("/posts", route);
};
