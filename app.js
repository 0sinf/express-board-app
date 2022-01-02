import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = parseInt(process.env.PORT) || 3000;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri + "/board", () => {
  console.log("db connected");
});

const app = express();

app.use("/", (req, res) => {
  res.status(200).send("good");
});

app.listen(port, () => {
  console.log("ok");
});
