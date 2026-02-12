import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

export const db = mysql2.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// optional: test connection
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
    return;
  }
  console.log("✅ MySQL connected");
});
