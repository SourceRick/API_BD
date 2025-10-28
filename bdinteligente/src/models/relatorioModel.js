import pool from "../config/db.js";

export const relatorioMovimentacoes = async (inicio, fim, tipo, id_item) => {
  const [rows] = await pool.query("CALL relatorio_movimentacoes(?, ?, ?, ?)", [
    inicio,
    fim,
    tipo,
    id_item
  ]);
  return rows[0];
};
