import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.status(200).send("good");
});

app.listen(3000, () => {
  console.log("ok");
});
