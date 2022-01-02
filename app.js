import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pino from "pino";

dotenv.config();
const logger = pino();

const port = parseInt(process.env.PORT) || 3000;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri + "/board", () => {
  logger.info("DB connected");
});

const app = express();

app.use("/", (req, res) => {
  res.status(200).send("good");
});

app.listen(port, () => {
  logger.info(`Start server at ${port}`);
});
