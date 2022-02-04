import request from "supertest";
import "regenerator-runtime";
import server from "../src/app";
import { pool } from "../src/models/pool";

describe("Post 테스트", () => {
  let postId: number;

  it("모든 포스트 조회 테스트", async () => {
    const res = await request(server).get("/posts").send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "posts"])
    );
  });

  it("포스트 생성 테스트", async () => {
    const res = await request(server).post("/posts").send({
      title: "titleee",
      contents: "contentssss",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.post.title).toEqual("titleee");
    expect(res.body.post.contents).toEqual("contentssss");

    postId = res.body.post.id;
  });

  it("포스트 조회 테스트", async () => {
    const res = await request(server).get(`/posts/${postId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.post.id).toEqual(postId);
    expect(res.body.post.title).toEqual("titleee");
    expect(res.body.post.contents).toEqual("contentssss");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM posts");
  });
});
