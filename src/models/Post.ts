import { Pool } from "pg";
import { pgUser, pgHost, pgDatabase, pgPassword, pgPort } from "../config";

const pool = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});

export const findAll = async () => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};
