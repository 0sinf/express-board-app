import "regenerator-runtime";
import request from "supertest";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import server from "../src/app";
import { User } from "../src/models/User";
import { sign, SignOptions } from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

describe("포스트 테스트", () => {
  let token = "Bearer ";
  const email = "example@email.com";
  const password = bcrypt.hashSync("password", 10);
  const name = "young";
  const secretKey = process.env.JWT_SECRET;
  let postId: string;
  let notOnwerToken = "Bearer ";

  beforeAll(async () => {
    const userId = await User.createUser(email, password, name);
    const payload = { _id: userId.toString() };
    const signOpt: SignOptions = {
      expiresIn: "1d",
    };
    token += sign(payload, secretKey, signOpt);

    const notOnwerUserId = await User.createUser(
      "notOnwer@email.com",
      "password",
      "notOnwer"
    );
    const payload2 = { _id: notOnwerUserId.toString() };
    notOnwerToken += sign(payload2, secretKey, signOpt);
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

  it("생성된 포스트 get", async () => {
    const res = await request(server)
      .get("/api/posts/" + postId)
      .send();

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["title", "contents", "author"])
    );
    expect(res.body.title).toEqual("title");
    expect(res.body.author).toEqual("young");
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
    await User.deleteOne({
      email,
      password,
      name,
    });

    await mongoose
      .createConnection(process.env.MONGO_URI + "/boardTest")
      .collection("posts")
      .deleteMany({});
  });
});
