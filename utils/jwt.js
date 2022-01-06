import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

export async function createToken(user) {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      data: user.id,
    },
    secretKey
  );

  return token;
}

export async function verifyToken(token, cb) {
  return verify(token, secretKey, cb);
}
