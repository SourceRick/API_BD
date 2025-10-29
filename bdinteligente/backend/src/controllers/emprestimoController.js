// exemplo de função no controller para listar os empréstimos
import pool from "../config/db.js";

export const listarEmprestimos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM emprestimos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar os empréstimos." });
  }
};

// exemplo de função no controller para criar um empréstimo
export const criarEmprestimo = async (req, res) => {
  const { itens_id, funcionario_id, data_prevista_devolucao, responsavel, observacao } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO emprestimos (itens_id, funcionario_id, data_prevista_devolucao, responsavel, observacao) VALUES (?, ?, ?, ?, ?)",
      [itens_id, funcionario_id, data_prevista_devolucao, responsavel, observacao]
    );
    res.status(201).json({ id: result.insertId, itens_id, funcionario_id, data_prevista_devolucao, responsavel, observacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar empréstimo." });
  }
};

// exemplo de função no controller para atualizar um empréstimo
export const atualizarEmprestimo = async (req, res) => {
  const { id } = req.params;
  const { itens_id, funcionario_id, data_prevista_devolucao, responsavel, observacao } = req.body;
  try {
    await pool.query(
      "UPDATE emprestimos SET itens_id = ?, funcionario_id = ?, data_prevista_devolucao = ?, responsavel = ?, observacao = ? WHERE id_emprestimo = ?",
      [itens_id, funcionario_id, data_prevista_devolucao, responsavel, observacao, id]
    );
    res.status(200).json({ message: "Empréstimo atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar empréstimo." });
  }
};

// exemplo de função no controller para excluir um empréstimo
export const excluirEmprestimo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM emprestimos WHERE id_emprestimo = ?", [id]);
    res.status(200).json({ message: "Empréstimo excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir empréstimo." });
  }
};
