import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pino from "pino";

import passport from "./passport/index.js";
import userRouter from "./routes/user.js";

passport();
dotenv.config();
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

const port = parseInt(process.env.PORT) || 3000;
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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`Start server at ${port}`);
  });
}

export default app;
