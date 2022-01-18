import { Document, Model } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
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
  findUserById: (id: string) => Promise<IUserDocument>;
}
