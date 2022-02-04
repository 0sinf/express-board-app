import express from "express";
import { port } from "./config";
import postRouter from "./routes/posts";

const app = express();

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log("Start App");
});
