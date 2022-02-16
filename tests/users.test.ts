import request from "supertest";
import makeApp from "../src/app";
import { jest } from "@jest/globals";

const createUser = jest.fn();

const app = makeApp({ createUser });

describe("POST /users", () => {
  beforeEach(() => {
    createUser.mockReset();
  });

  describe("when passed a username and password", () => {
    test("should save the username and password in the database", async () => {
      const bodyData = [
        {
          username: "username1",
          password: "password1",
        },
        {
          username: "username2",
          password: "password2",
        },
      ];
      for (const body of bodyData) {
        createUser.mockReset();
        const response = await request(app).post("/users").send(body);

        // api가 호출되었을 때, 제대로 createUser에 값을 전달하는지
        expect(createUser.mock.calls[0][0]).toBe(body.username);
        expect(createUser.mock.calls[0][1]).toBe(body.password);
      }
    });
  });
});
