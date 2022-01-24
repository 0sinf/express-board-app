import "regenerator-runtime";
import request from "supertest";
import dotenv from "dotenv";
import server from "../src/app";
import { sign, SignOptions } from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

describe("포스트 테스트", () => {
  const secretKey = process.env.JWT_SECRET;
  let postId: string;
  let token = "Bearer ";
  let notOnwerToken = "Bearer ";

  beforeAll(async () => {
    // 가짜 유저 생성
    await mongoose
      .createConnection(process.env.MONGO_URI + "/boardTest")
      .collection("users")
      .insertOne({
        googleId: "123451234512345",
        nickname: "owner",
        firstName: "dummy",
        lastName: "dummy",
        profile: "lksjadlkfjkslkjdf",
      });

    await mongoose
      .createConnection(process.env.MONGO_URI + "/boardTest")
      .collection("users")
      .insertOne({
        googleId: "543215432154321",
        nickname: "not owner",
        firstName: "dummy",
        lastName: "dummy",
        profile: "lksjadlkfjkslkjdf",
      });

    const signOpt: SignOptions = {
      expiresIn: "1d",
    };
    token += sign({ googleId: "123451234512345" }, secretKey, signOpt);

    notOnwerToken += sign({ googleId: "543215432154321" }, secretKey, signOpt);
  });

  it("포스트 생성 테스트", async () => {
    const res = await request(server)
      .post("/api/posts")
      .set("authorization", token)
      .send({
        title: "title",
        contents: "contents",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "postId"])
    );
    postId = res.body.postId;
  });

  it("Fail 포스트 생성 테스트 너무 긴 타이틀", async () => {
    const res = await request(server)
      .post("/api/posts")
      .set("authorization", token)
      .send({
        title:
          "titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle",
        contents: "contents",
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("제목이 너무 깁니다. 50자 이내로 적어주세요.");
  });

  it("Fail 포스트 생성 테스트 너무 긴 내용", async () => {
    const res = await request(server)
      .post("/api/posts")
      .set("authorization", token)
      .send({
        title: "titletest",
        contents:
          "asdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfgasdfgzxcvbqwertasdfg",
      });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual(
      "내용이 너무 깁니다. 200자 이내로 적어주세요."
    );
  });

  it("생성된 포스트 get", async () => {
    const res = await request(server)
      .get("/api/posts/" + postId)
      .send();

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["title", "contents", "author"])
    );
    expect(res.body.title).toEqual("title");
    expect(res.body.author).toEqual("owner");
  });

  it("포스트 수정하기", async () => {
    const res = await request(server)
      .put("/api/posts/" + postId)
      .set("authorization", token)
      .send({ title: "updatedTitle", contents: "updatedContents" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.postId).toEqual(postId);
    expect(res.body.title).toEqual("updatedTitle");
    expect(res.body.contents).toEqual("updatedContents");
  });

  it("Fail 로그인 없이 포스트 수정하기", async () => {
    const res = await request(server)
      .put("/api/posts/" + postId)
      .send({ title: "updatedTitle", contents: "updatedContents" });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다.");
  });

  it("Fail 권한 없는데 포스트 수정하기", async () => {
    const res = await request(server)
      .put("/api/posts/" + postId)
      .set("authorization", notOnwerToken)
      .send({ title: "updatedTitle", contents: "updatedContents" });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없습니다.");
  });

  it("없는 포스트 수정하기", async () => {
    const res = await request(server)
      .put("/api/posts/" + "notexistspost")
      .set("authorization", token)
      .send({ title: "updatedTitle", contents: "updatedContents" });

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("없는 포스트 찾기", async () => {
    const res = await request(server)
      .get("/api/posts/" + "notexistpost")
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  it("포스트 리스트 호출", async () => {
    const res = await request(server).get("/api/posts").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.posts.length).toBeGreaterThanOrEqual(1);
  });

  it("Fail 로그인 없이 포스트 삭제하기", async () => {
    const res = await request(server)
      .delete("/api/posts/" + postId)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다.");
  });

  it("Fail 권한 없는데 포스트 삭제하기", async () => {
    const res = await request(server)
      .delete("/api/posts/" + postId)
      .set("authorization", notOnwerToken)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("권한이 없습니다.");
  });

  it("포스트 삭제하기", async () => {
    const res = await request(server)
      .delete("/api/posts/" + postId)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(204);
  });

  it("없는 포스트 삭제하기", async () => {
    const res = await request(server)
      .delete("/api/posts/" + "notexist")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않는 글입니다.");
  });

  afterAll(async () => {
    await mongoose
      .createConnection(process.env.MONGO_URI + "/boardTest")
      .collection("posts")
      .deleteMany({});

    await mongoose
      .createConnection(process.env.MONGO_URI + "/boardTest")
      .collection("users")
      .deleteMany({});
  });
});
