import { Pool } from "pg";
import bcrypt from "bcrypt";
import db from "./db";
import { IUser, IUserDto } from "../types/users";
import { bcryptSalt } from "../config";

export class UserRepository {
  private db: Pool;

  constructor() {
    this.db = db;
  }

  async save(userDto: IUserDto): Promise<IUser> {
    const { email, password, username, nickname } = userDto;
    const passhash = bcrypt.hashSync(password, bcryptSalt);
    const query =
      "INSERT INTO users (email, passhash, username, nickname) VALUES ($1, $2, $3, $4) RETURNING *";

    const result = await db.query(query, [email, passhash, username, nickname]);
    return result.rows[0];
  }
}
