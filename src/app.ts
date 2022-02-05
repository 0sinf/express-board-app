import express from "express";
import { port } from "./config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Start App");
  });
}

export default app;
