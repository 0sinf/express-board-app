import dotenv from "dotenv";

dotenv.config();

export const port = Number(process.env.EXPRESS_PORT);

export const pgHost = process.env.PGHOST;
export const pgUser = process.env.PGUSER;
export const pgDatabase = process.env.PGDATABASE;
export const pgPassword = process.env.PGPASSWORD;
export const pgPort = Number(process.env.PGPORT);
