import pool from "../config/db.js";

export const getAllItens = async () => {
  const [rows] = await pool.query("SELECT * FROM itens");
  return rows;
};

export const getItemById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM itens WHERE id_item = ?", [id]);
  return rows[0];
};

export const createItem = async (item) => {
  const { nome, quantidade, tag_id, tag_material } = item;
  const [result] = await pool.query(
    "INSERT INTO itens (nome, quantidade, tag_id, tag_material) VALUES (?, ?, ?, ?)",
    [nome, quantidade, tag_id, tag_material]
  );
  return { id: result.insertId, ...item };
};

export const updateItem = async (id, item) => {
  const { nome, quantidade, tag_id, tag_material } = item;
  await pool.query(
    "UPDATE itens SET nome=?, quantidade=?, tag_id=?, tag_material=? WHERE id_item=?",
    [nome, quantidade, tag_id, tag_material, id]
  );
};

export const deleteItem = async (id) => {
  await pool.query("DELETE FROM itens WHERE id_item = ?", [id]);
};

export const relatorioItem = async () => {
  const [rows] = await pool.query("CALL relatorio()");
  return rows[0];
};