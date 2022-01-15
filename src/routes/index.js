import user from "./api/user.js";
import post from "./api/post.js";
import { Router } from "express";

const app = Router();

export default () => {
  user(app);
  post(app);
  return app;
};
