import { Jwt, JwtPayload } from "jsonwebtoken";
import { Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserDocument extends IUser {
  verifyPassword: (password: string) => boolean;
}

export interface IUserModel extends Model<IUser> {
  createUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<string>;
  findUserByEmail: (email: string) => Promise<IUserDocument>;
  findUserById: (id: string | Jwt | JwtPayload) => Promise<IUserDocument>;
}

declare global {
  namespace Express {
    export interface User extends IUserDocument {}
  }
}
