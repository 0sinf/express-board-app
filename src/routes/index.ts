import post from "./api/post";
import auth from "./api/auth";
import { Router } from "express";

const app: Router = Router();

export default () => {
  post(app);
  auth(app);
  return app;
};
