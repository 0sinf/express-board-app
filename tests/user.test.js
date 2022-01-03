import "regenerator-runtime";
import request from "supertest";
import mongoose from "mongoose";
import server from "../app.js";

describe("유저 생성 테스트", () => {
  afterAll(() => {
    mongoose.connection.db.dropCollection("users");
  });

  it("유저 생성 성공 테스트", async () => {
    const res = await request(server).post("/api/users/signup").send({
      email: "email@example.com",
      password: "password",
      name: "myName",
    });

    expect(res.statusCode).toEqual(201);
  });
});
