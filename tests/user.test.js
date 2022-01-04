import "regenerator-runtime";
import request from "supertest";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import server from "../app.js";

describe("유저 생성 테스트", () => {
  afterAll(async () => {
    await User.deleteOne({
      email: "create@example.com",
      password: "password",
      name: "myName",
    });
  });

  it("유저 생성 성공 테스트", async () => {
    const res = await request(server).post("/api/users/signup").send({
      email: "create@example.com",
      password: "password",
      name: "myName",
    });

    expect(res.statusCode).toEqual(201);
  });
});

describe("유저 로그인 테스트", () => {
  beforeAll(async () => {
    await User.create({
      email: "email@example.com",
      password: bcrypt.hashSync("password", 10),
      name: "myName",
    });
  });

  it("유저 로그인 성공", async () => {
    const res = await request(server).post("/api/users/login").send({
      email: "email@example.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
  });

  it("유저 로그인 실패 이메일", async () => {
    const res = await request(server).post("/api/users/login").send({
      email: "noexist@example.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않거나 비밀번호가 틀렸습니다.");
  });

  it("유저 로그인 실패 패스워드", async () => {
    const res = await request(server).post("/api/users/login").send({
      email: "email@example.com",
      password: "passworngword",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("존재하지 않거나 비밀번호가 틀렸습니다.");
  });

  afterAll(async () => {
    await User.deleteOne({
      email: "email@example.com",
      password: "password",
      name: "myName",
    });
  });
});
