import pool from "../config/db.js";

export const getFuncionariosItens = async () => {
  const [rows] = await pool.query("SELECT * FROM vw_funcionarios_itens ORDER BY data_movimentacao DESC");
  return rows;
};
