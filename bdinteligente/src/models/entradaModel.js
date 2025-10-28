import pool from "../config/db.js";

export const getEntradas = async () => {
  const [rows] = await pool.query(`
    SELECT e.*, i.nome AS nome_item
    FROM entrada_itens e
    JOIN itens i ON e.id_item = i.id_item
    ORDER BY e.data_entrada DESC
  `);
  return rows;
};

export const createEntrada = async (entrada) => {
  const { id_item, quantidade, responsavel, observacao } = entrada;

  const [result] = await pool.query(
    "INSERT INTO entrada_itens (id_item, quantidade, responsavel, observacao) VALUES (?, ?, ?, ?)",
    [id_item, quantidade, responsavel || null, observacao || null]
  );

  return { id: result.insertId, ...entrada };
};
