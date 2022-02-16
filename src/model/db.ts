import { Pool } from "pg";
import { pgUser, pgPassword, pgHost, pgPort, pgDatabase } from "../config";

const pool = new Pool({
  user: pgUser,
  password: pgPassword,
  host: pgHost,
  port: pgPort,
  database: pgDatabase,
});

export default pool;
