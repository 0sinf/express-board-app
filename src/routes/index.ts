import user from "./api/user";
import post from "./api/post";
import { Router } from "express";

const app: Router = Router();

export default () => {
  user(app);
  post(app);
  return app;
};
