import pool from "../config/db.js";

export const getSaidas = async () => {
  const [rows] = await pool.query(`
    SELECT s.*, i.nome AS nome_item
    FROM saida_itens s
    JOIN itens i ON s.id_item = i.id_item
    ORDER BY s.data_saida DESC
  `);
  return rows;
};

export const createSaida = async (saida) => {
  const { id_item, quantidade, responsavel, destino, tipo_saida, observacao } = saida;

  const [result] = await pool.query(
    `INSERT INTO saida_itens 
     (id_item, quantidade, responsavel, destino, tipo_saida, observacao)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id_item, quantidade, responsavel, destino, tipo_saida || "consumo", observacao || null]
  );

  return { id: result.insertId, ...saida };
};
