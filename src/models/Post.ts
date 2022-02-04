import { pool } from "./pool";

export const findAll = async () => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};

export const create = async (title: string, contents: string) => {
  const result = await pool.query(
    "INSERT INTO posts(title, contents) VALUES ($1, $2) RETURNING *",
    [title, contents]
  );
  return result.rows[0];
};

export const findOne = async (postId: string) => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
    postId,
  ]);
  return result.rows[0];
};
