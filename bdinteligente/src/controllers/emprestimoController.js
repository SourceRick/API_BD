import emprestimoModel from "../models/emprestimoModel.js";

export const listarEmprestimos = async (req, res) => {
  try {
    const emprestimos = await emprestimoModel.getEmprestimos();
    res.json(emprestimos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar empréstimos", error: error.message });
  }
};

export const criarEmprestimo = async (req, res) => {
  try {
    const novo = await emprestimoModel.createEmprestimo(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar empréstimo", error: error.message });
  }
};

export const atualizarEmprestimo = async (req, res) => {
  try {
    const atualizado = await emprestimoModel.updateEmprestimo(req.params.id, req.body);
    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar empréstimo", error: error.message });
  }
};

export const excluirEmprestimo = async (req, res) => {
  try {
    const resultado = await emprestimoModel.deleteEmprestimo(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir empréstimo", error: error.message });
  }
};
