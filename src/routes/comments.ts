import { Router } from "express";

const route = Router({ mergeParams: true });

// 댓글 리스트 조회
route.get("/", async (req, res) => {});

// 댓글 생성
route.post("/", async (req, res) => {});

// 댓글 수정
route.put("/", async (req, res) => {});

// 댓글 삭제
route.delete("/", async (req, res) => {});

export default route;
