import db from "./db";

export async function createUser(
  username: string,
  password: string
): Promise<number> {
  const result = await db.query(
    "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *",
    [username, password]
  );
  return result.rows[0].userId;
}
