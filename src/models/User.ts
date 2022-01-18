import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/index";

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
): Promise<string> {
  const user: IUser = await User.create({ email, password, name });
  return user._id;
};

UserSchema.statics.findUserById = async function (
  email: string
): Promise<IUser> {
  const user: IUser = await User.findOne({ email });
  return user;
};

UserSchema.methods.verifyPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export { User };
