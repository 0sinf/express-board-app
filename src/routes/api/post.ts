import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  createPost,
  findPostById,
  findAllPosts,
  updatePost,
  deletePost,
} from "../../services/post";
import { loginRequired } from "../../utils/passport/guards/jwt-guard";
import asyncHandler from "../middlewares/async-handler";
import checkPermission from "../middlewares/check-permission";

export default (app: Router) => {
  const route = Router();

  route.post(
    "/",
    loginRequired,
    body("title")
      .isString()
      .isLength({ max: 50 })
      .withMessage("제목이 너무 깁니다. 50자 이내로 적어주세요."),
    body("contents")
      .isString()
      .isLength({ max: 200 })
      .withMessage("내용이 너무 깁니다. 200자 이내로 적어주세요."),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new Error(errors.array()[0].msg);
      }

      const userId: string = req.user.id;
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
    checkPermission,
    body("title")
      .isString()
      .isLength({ max: 50 })
      .withMessage("제목이 너무 깁니다. 50자 이내로 적어주세요."),
    body("contents")
      .isString()
      .isLength({ max: 200 })
      .withMessage("내용이 너무 깁니다. 200자 이내로 적어주세요."),
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const { title, contents } = req.body;
      const post = await updatePost(postId, title, contents);
      res.status(200).json(post);
    })
  );

  route.delete(
    "/:postId",
    checkPermission,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      await deletePost(postId);
      res.status(204).json();
    })
  );

  app.use("/posts", route);
};
