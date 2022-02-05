import { Pool } from "pg";
import { pgUser, pgPassword, pgHost, pgPort, pgDatabase } from "../config";

const pool = new Pool({
  user: pgUser,
  password: pgPassword,
  host: pgHost,
  database: pgDatabase,
  port: pgPort,
});

export default pool;
