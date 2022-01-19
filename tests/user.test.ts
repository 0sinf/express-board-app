import "regenerator-runtime";
import request from "supertest";
import bcrypt from "bcrypt";
import { sign, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../src/models/User";
import server from "../src/app";
import mongoose from "mongoose";
import { IUser } from "../src/types/index";

dotenv.config();

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

    expect(res.statusCode).toEqual(401);
  });

  it("유저 로그인 실패 패스워드", async () => {
    const res = await request(server).post("/api/users/login").send({
      email: "email@example.com",
      password: "passworngword",
    });

    expect(res.statusCode).toEqual(401);
  });
});

describe("유저 로그인 required 테스트", () => {
  let token = "Bearer ";
  let user: IUser;
  beforeAll(async () => {
    user = await User.create({
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

    token += res.body.token;
  });

  it("유저 로그인 필요 테스트 성공", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ email: "email@example.com", name: "myName" });
  });

  // it("유저 로그인 필요 테스트 실패", async () => {
  //   const res = await request(server).get("/api/users").send();
  // });
  it("만료된 토큰으로 로그인 필요 접근", async () => {
    const payload = { _id: user._id.toString() };
    const signOpt: SignOptions = {
      expiresIn: "1d",
    };
    const secretKey = process.env.JWT_SECRET;
    const expToken = sign(payload, secretKey, signOpt);

    const res = await request(server)
      .get("/api/users")
      .set("authorization", expToken)
      .send();

    expect(res.statusCode).toEqual(403);
    expect(res.body.isOk).toEqual(false);
    expect(res.body.msg).toEqual("로그인이 필요합니다.");
  });

  afterAll(async () => {
    await mongoose
      .createConnection(process.env.MONGO_URI + "/boardTest")
      .collection("users")
      .deleteMany({});
  });
});
