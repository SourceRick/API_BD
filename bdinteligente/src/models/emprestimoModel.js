import pool from "../config/db.js";

export const getEmprestimos = async () => {
  const [rows] = await pool.query(`
    SELECT e.*, i.nome AS nome_item, f.nome AS nome_funcionario
    FROM emprestimos e
    JOIN itens i ON e.id_item = i.id_item
    JOIN funcionario f ON e.id_funcionario = f.id_funcionario
    ORDER BY e.data_emprestimo DESC
  `);
  return rows;
};

export const createEmprestimo = async (emprestimo) => {
  const { id_item, id_funcionario, quantidade, data_devolucao_prevista } = emprestimo;

  const [result] = await pool.query(
    `INSERT INTO emprestimos (id_item, id_funcionario, quantidade, data_devolucao_prevista)
     VALUES (?, ?, ?, ?)`,
    [id_item, id_funcionario, quantidade, data_devolucao_prevista]
  );

  await pool.query(
    `UPDATE itens SET quantidade = quantidade - ? WHERE id_item = ?`,
    [quantidade, id_item]
  );

  return { id: result.insertId, ...emprestimo };
};

export const updateEmprestimo = async (id, dados) => {
  const { data_devolucao_real, observacao } = dados;
  await pool.query(
    `UPDATE emprestimos SET data_devolucao_real = ?, observacao = ? WHERE id_emprestimo = ?`,
    [data_devolucao_real, observacao, id]
  );
  return { id, ...dados };
};

export const deleteEmprestimo = async (id) => {
  await pool.query("DELETE FROM emprestimos WHERE id_emprestimo = ?", [id]);
  return { message: "Empréstimo excluído com sucesso" };
};


export default {
  getEmprestimos,
  createEmprestimo,
  updateEmprestimo,
  deleteEmprestimo,
};
