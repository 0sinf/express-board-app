import dotenv from "dotenv";

dotenv.config();

export const jwtSecretKey = process.env.JWT_SECRET;
