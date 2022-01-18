import jwt, { Secret, VerifyCallback, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserDocument } from "../types/index";

dotenv.config();
const secretKey: Secret = String(process.env.JWT_SECRET);

export function createToken(user: IUserDocument) {
  const payload = user._id;
  const signOpt: SignOptions = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, secretKey, signOpt);

  return token;
}

export function verifyToken(token: string, cb: VerifyCallback) {
  return jwt.verify(token, secretKey, cb);
}
