import mysql from "mysql2/promise";
import fs from "fs";

export async function connectDB() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 10479,
    ssl: {
      ca: fs.readFileSync("ca.pem")  // upload this file in your project root
    }
  });
}
