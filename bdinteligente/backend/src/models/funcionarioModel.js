import pool from "../config/db.js";

export const getFuncionarios = async () => {
  const [rows] = await pool.query("SELECT * FROM funcionario ORDER BY nome ASC");
  return rows;
};

export const getFuncionarioById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM funcionario WHERE id_funcionario = ?", [id]);
  return rows[0];
};

export const createFuncionario = async (funcionario) => {
  const { nome, cargo, telefone } = funcionario;
  const [result] = await pool.query(
    "INSERT INTO funcionario (nome, cargo, telefone) VALUES (?, ?, ?)",
    [nome, cargo, telefone]
  );
  return { id: result.insertId, ...funcionario };
};

export const updateFuncionario = async (id, funcionario) => {
  const { nome, cargo, telefone } = funcionario;
  await pool.query(
    "UPDATE funcionario SET nome = ?, cargo = ?, telefone = ? WHERE id_funcionario = ?",
    [nome, cargo, telefone, id]
  );
  return { id, ...funcionario };
};

export const deleteFuncionario = async (id) => {
  await pool.query("DELETE FROM funcionario WHERE id_funcionario = ?", [id]);
  return { message: "Funcionário removido com sucesso" };
};

export default {
  getFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
