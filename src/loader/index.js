import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import logger from "../utils/logger.js";
import passport from "../utils/passport/index.js";
import route from "../routes/index.js";

export default function loader() {
  const app = express();
  passport();
  dotenv.config();

  const mongoUri = process.env.MONGO_URI;

  if (process.env.NODE_ENV !== "test") {
    mongoose.connect(mongoUri + "/board", () => {
      logger.info("DB connected");
    });
  } else {
    mongoose.connect(mongoUri + "/boardTest", () => {
      logger.info("DB connected");
    });
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api", route());

  app.use((req, res, next) => {
    next("404 Not Found");
  });

  app.use((err, req, res, next) => {
    res.status(403).json({ isOk: false, msg: err });
  });

  return app;
}
