import { User } from "../../models/User";
import { verifyToken } from "../../utils/jwt";

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
    // 만료된 경우 로그인 요구
    req.user = await User.findById(decoded.data);
    next();
  });
};
