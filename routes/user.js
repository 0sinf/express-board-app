import express from "express";

const route = express.Router();

route.post("/signup", (req, res) => {
  const { email, password, name } = req.body;
  const userId = createUser(email, password, name);
  res.status(201).json({ userId });
});

export default route;
