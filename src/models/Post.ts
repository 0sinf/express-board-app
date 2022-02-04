import { pool } from "./pool";

export const findAll = async () => {
  const result = await pool.query("SELECT * FROM posts");
  return result.rows;
};
