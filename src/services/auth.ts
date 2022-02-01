import { sign } from "jsonwebtoken";
import { jwtSecretKey } from "../config";
import { IUserModel, IUser, User, IUserDocument } from "../models/User";

export class AuthService {
  UserModel: IUserModel;

  constructor(UserModel: IUserModel) {
    this.UserModel = UserModel;
  }

  // access token, refresh token 발급
  async login(user: IUserDocument) {
    const accessToken = sign(user, jwtSecretKey, { expiresIn: "1h" });
    const refreshToken = sign(user, jwtSecretKey, { expiresIn: "14d" });

    // refresh token 저장
    await User.findByGoogleIdAndUpdateToken(user, refreshToken);

    return [accessToken, refreshToken];
  }
}
