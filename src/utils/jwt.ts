import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../types/index";

dotenv.config();
const secretKey: Secret = String(process.env.JWT_SECRET);

export function createToken(user: IUser) {
  const jwtPayload: JwtPayload = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    data: user.id,
  };
  const token = jwt.sign(jwtPayload, secretKey);

  return token;
}

export function verifyToken(token: string, cb: () => void) {
  return jwt.verify(token, secretKey, cb);
}
