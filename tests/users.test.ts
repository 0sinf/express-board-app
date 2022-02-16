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
      const body = {
        username: "username",
        password: "password",
      };
      const response = await request(app).post("/users").send(body);
      expect(createUser.mock.calls[0][0]).toBe(body.username);
      expect(createUser.mock.calls[0][1]).toBe(body.password);
    });
  });
});
