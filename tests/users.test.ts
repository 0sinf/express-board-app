import request from "supertest";
import "regenerator-runtime";
import server from "../src/app";

describe("유저 테스트", () => {
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
  });
});
