import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

export function createToken(user) {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      data: user.id,
    },
    secretKey
  );

  return token;
}

export function verifyToken(token, cb) {
  return jwt.verify(token, secretKey, cb);
}
