import { Router } from "express";
import passport from "passport";

export default (app: Router) => {
  const route = Router();

  route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

  route.get("/google/callback", async (req, res, next) => {
    passport.authenticate(
      "google",
      { session: false },
      async (error, user, info) => {
        if (error) {
          next("not logined");
        }
        // 받은 user 데이터로 유저 정보 저장
        // access token, refresh token 생성해서 refresh는 유저정보에 저장
        // access token, refresh token 쿠키로 발급
      }
    );
  });

  app.use("/auth", route);
};
