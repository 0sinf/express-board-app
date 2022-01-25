import post from "./api/post";
import auth from "./api/auth";
import user from "./api/user";
import { Router } from "express";

const app: Router = Router();

export default () => {
  post(app);
  auth(app);
  user(app);
  return app;
};
