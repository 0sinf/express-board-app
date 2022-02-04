import request from "supertest";
import "regenerator-runtime";
import server from "../src/app";

describe("Post 테스트", () => {
  it("모든 포스트 조회 테스트", async () => {
    const res = await request(server).get("/posts").send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["isOk", "posts"])
    );
  });
});
