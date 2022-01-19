import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import { verifyToken } from "../../utils/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer" &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    next("로그인이 필요합니다.");
    return;
  }
  verifyToken(token, async (error, decoded) => {
    if (error) {
      next("로그인이 필요합니다.");
      return;
    }
    const user = await User.findUserById(decoded);
    req.user = user;
    next();
  });
};
