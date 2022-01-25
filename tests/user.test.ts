import request from "supertest";
import server from "../src/app";
import mongoose from "mongoose";
import { sign, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import "regenerator-runtime";

dotenv.config();

describe("유저 정보 가져오기 테스트", () => {
  const secretKey = process.env.JWT_SECRET;
  let token = "Bearer ";

  beforeAll(async () => {
    await mongoose
      .createConnection(process.env.MONGO_URI + "/boardTest")
      .collection("users")
      .insertOne({
        googleId: "0198109283120948",
        nickname: "owner",
        firstName: "dummy",
        lastName: "dummy",
        profile: "lksjadlkfjkslkjdf",
      });

    const signOpt: SignOptions = {
      expiresIn: "1d",
    };
    token += sign({ googleId: "0198109283120948" }, secretKey, signOpt);
  });

  it("유저 정보 가져오기 테스트", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("authorization", token)
      .send();

    console.log(res.body);

    expect(res.status).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "id",
        "nickname",
        "firstName",
        "lastName",
        "profile",
      ])
    );
  });
});
