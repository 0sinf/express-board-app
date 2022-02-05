import express from "express";
import { port } from "./config";
import { userRouter } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Start App");
  });
}

export default app;
