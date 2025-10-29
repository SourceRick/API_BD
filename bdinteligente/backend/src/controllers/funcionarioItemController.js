import { getFuncionariosItens } from "../models/funcionarioItemModel.js";

export const listarFuncionariosItens = async (req, res) => {
  try {
    const dados = await getFuncionariosItens();
    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar funcionários e itens", error: error.message });
  }
};
