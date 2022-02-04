import { Pool } from "pg";
import { pgUser, pgHost, pgDatabase, pgPassword, pgPort } from "../config";

export const pool = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});
