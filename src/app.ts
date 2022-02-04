import express from "express";
import { Client } from "pg";
import { port, pgUser, pgHost, pgDatabase, pgPassword, pgPort } from "./config";

const app = express();

const client = new Client({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});

client.connect().then(() => {
  console.log("DB connected");
});

app.listen(port, () => {
  console.log("Start App");
});
