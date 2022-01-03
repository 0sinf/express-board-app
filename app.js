import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pino from "pino";

import userRouter from "./routes/user.js";

dotenv.config();
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

const port = parseInt(process.env.PORT) || 3000;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri + "/board", () => {
  logger.info("DB connected");
});

const app = express();

app.use("/users", userRouter);

app.listen(port, () => {
  logger.info(`Start server at ${port}`);
});

export default app;
