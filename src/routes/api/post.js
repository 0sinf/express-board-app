import { Router } from "express";
import {
  createPost,
  findPostById,
  findAllPosts,
  updatePost,
  deletePost,
} from "../../services/post.js";
import loginRequried from "../middlewares/login-requried.js";
import asyncHandler from "../middlewares/async-handler.js";
import checkPermission from "../middlewares/check-permission.js";

export default (app) => {
  const route = Router();

  route.post(
    "/",
    loginRequried,
    asyncHandler(async (req, res) => {
      const userId = req.user.id;
      const { title, contents } = req.body;
      const postId = await createPost(title, contents, userId);
      res.status(200).json({ isOk: true, postId });
    })
  );

  route.get(
    "/:postId",
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const post = await findPostById(postId);
      res.status(201).json(post);
    })
  );

  route.get(
    "/",
    asyncHandler(async (req, res) => {
      const posts = await findAllPosts();
      res.status(200).json({ posts });
    })
  );

  route.put(
    "/:postId",
    loginRequried,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { title, contents } = req.body;
      const post = await updatePost(postId, title, contents);
      res.status(200).json(post);
    })
  );

  route.delete(
    "/:postId",
    loginRequried,
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      await deletePost(postId);
      res.status(204).json();
    })
  );

  app.use("/posts", route);
};
