import Funcionario from "../models/funcionarioModel.js";

export const listarFuncionarios = async (req, res) => {
  try {
    const [rows] = await Funcionario.getAll();
    res.json(rows);
  } catch (error) {
    console.error("Erro ao listar funcionários:", error);
    res.status(500).json({ error: "Erro ao listar funcionários" });
  }
};

export const obterFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await Funcionario.getById(id);
    if (rows.length === 0)
      return res.status(404).json({ error: "Funcionário não encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar funcionário" });
  }
};

export const criarFuncionario = async (req, res) => {
  try {
    const novoFuncionario = req.body;
    const [result] = await Funcionario.create(novoFuncionario);
    res.status(201).json({ id: result.insertId, ...novoFuncionario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar funcionário" });
  }
};

export const atualizarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await Funcionario.update(id, dados);
    res.json({ id, ...dados });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar funcionário" });
  }
};

export const excluirFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    await Funcionario.delete(id);
    res.json({ message: "Funcionário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir funcionário" });
  }
};
