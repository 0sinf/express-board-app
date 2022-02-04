import { Client } from "pg";
import { pgUser, pgHost, pgDatabase, pgPassword, pgPort } from "../config";

const client = new Client({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});
