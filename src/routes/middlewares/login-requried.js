import { User } from "../../models/User.js";
import { verifyToken } from "../../utils/jwt.js";

export default (req, res, next) => {
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
    req.user = await User.findById(decoded.data);
    next();
  });
};
