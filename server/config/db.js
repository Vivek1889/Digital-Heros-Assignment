import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

export default db;
