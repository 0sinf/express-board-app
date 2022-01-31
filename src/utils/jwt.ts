import jwt, { Secret, VerifyCallback, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserDocument } from "../models/User";

dotenv.config();
const secretKey: Secret = String(process.env.JWT_SECRET);

export function createToken(payload: object, signOpt: SignOptions) {
  const token = jwt.sign(payload, secretKey, signOpt);
  return token;
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
