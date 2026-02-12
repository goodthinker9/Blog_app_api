import mysql2, { createConnection } from "mysql2"
import cors from "cors";
import dotenv from "dotenv";
export const db=mysql2.createConnection({   
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 3310
})