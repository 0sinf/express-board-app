import "regenerator-runtime";
import request from "supertest";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import server from "../app.js";
import { User } from "../models/User";
import { sign } from "jsonwebtoken";

dotenv.config();

describe("포스트 테스트", () => {
  let token = "Bearer ";
  const email = "example@email.com";
  const password = bcrypt.hashSync("password", 10);
  const name = "young";
  const secretKey = process.env.JWT_SECRET;
  let postId;

  beforeAll(async () => {
    const userId = await User.createUser(email, password, name);
    token += sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        data: userId,
      },
      secretKey
    );
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

  afterAll(async () => {
    await User.deleteOne({
      email,
      password,
      name,
    });
  });
});
