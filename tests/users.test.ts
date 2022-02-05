import request from "supertest";
import "regenerator-runtime";
import server from "../src/app";
import db from "../src/models/db";

describe("유저 테스트", () => {
  let userId: string;

  it("유저 생성 테스트", async () => {
    const res = await request(server).post("/users").send({
      email: "dummy@dummy.com",
      password: "password",
      username: "username",
      nickname: "nickname",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.isOk).toEqual(true);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "userId"])
    );

    userId = res.body.userId;
  });

  it("유저 정보 가져오기", async () => {
    const res = await request(server).get(`/users/${userId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.isOk).toEqual(true);
    expect(res.body.user.email).toEqual("dummy@dummy.com");
    expect(res.body.user.username).toEqual("username");
  });

  afterAll(async () => {
    db.query("DELETE FROM users");
  });
});
