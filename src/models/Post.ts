import { pool } from "./pool";

export const findAll = async () => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};

export const create = async (title: string, contents: string) => {
  const result = await pool.query(
    "INSERT INTO posts(title, contents) VALUES ($1, $2)",
    [title, contents]
  );
  return result;
};
