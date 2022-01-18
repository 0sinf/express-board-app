import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserDocument, IUserModel } from "../types/index";
import { JwtPayload } from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.createUser = async function (
  email: string,
  password: string,
  name: string
) {
  const user: IUser = await User.create({
    email,
    password,
    name,
  });
  return user._id;
};

UserSchema.statics.findUserByEmail = async function (email: string) {
  const user = await User.findOne({ email });
  return user;
};

UserSchema.statics.findUserById = async function (id: string) {
  const user = await User.findById(id);
  return user;
};

UserSchema.methods.verifyPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export { User };
