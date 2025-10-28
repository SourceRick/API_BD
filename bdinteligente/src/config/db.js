import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "API",
  password: process.env.DB_PASS || "senha",
  database: process.env.DB_NAME || "almoxarifado_inteligente",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT DATABASE() AS db");
    console.log("Conectado ao banco:", rows[0].db);
    conn.release();
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  }
})();

export default pool;
