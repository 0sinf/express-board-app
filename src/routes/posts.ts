import { Router } from "express";
import { create, findAll, findOne, updateOne } from "../models/Post";

const route = Router();

// 모든 글 조회
route.get("/", async (req, res) => {
  const posts = await findAll();
  res.status(200).json({ isOk: true, posts });
});

// 글 상세 조회
route.get("/:id", async (req, res) => {
  const postId = String(req.params.id);
  const post = await findOne(postId);
  res.status(200).json({ isOk: true, post });
});

// 글 생성
route.post("/", async (req, res) => {
  const { title, contents } = req.body;
  const post = await create(title, contents);
  res.status(201).json({ isOk: true, post });
});

// 글 수정
route.put("/:id", async (req, res) => {
  const postId = String(req.params.id);
  const { title, contents } = req.body;
  const post = await updateOne(postId, { title, contents });
  res.status(200).json({ isOk: true, post });
});

// 글 삭제
route.delete("/:id", (req, res) => {});

export default route;
