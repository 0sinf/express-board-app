import { Jwt, JwtPayload } from "jsonwebtoken";
import mongoose, { Model, Document } from "mongoose";

interface IUser {
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  photos: {
    value: string;
  }[];
  refreshToken: string;
}

export interface IUserDocument extends Document {
  googleId: string;
  nickname: string;
  firstName: string;
  lastName: string;
  profile: string;
  provider: "google";
  refreshToken: string;
  _raw?: object;
  _json?: object;
}

interface IUserModel extends Model<IUserDocument> {
  findOrCreate: (
    googleId: string | Jwt | JwtPayload,
    user?: IUser
  ) => Promise<IUserDocument>;

  findUserById: (userId: string) => Promise<IUserDocument>;

  findByGoogleId: (googleId: string) => Promise<IUserDocument>;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    googleId: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.statics.findOrCreate = async (decoded, user) => {
  const googleUser = await User.findOne({ googleId: decoded.googleId });
  // 있는 경우 리턴
  if (googleUser) {
    return googleUser;
  }
  // 없는 경우 생성
  return await User.create({
    googleId: decoded.googleId,
    nickname: user.displayName,
    firstName: user.name.givenName,
    lastName: user.name.familyName,
    profile: user.photos[0].value,
    refreshToken: user.refreshToken,
  });
};

UserSchema.statics.findUserById = async (userId: string) => {
  const user = await User.findById(userId);
  return user;
};

UserSchema.statics.findByGoogleId = async (googleId: string) => {
  const user = await User.findOne({ googleId });
  return user;
};

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);

export { User };
