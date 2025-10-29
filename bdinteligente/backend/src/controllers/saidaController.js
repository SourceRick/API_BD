import * as Saida from "../models/saidaModel.js";

export const listarSaidas = async (req, res) => {
  try {
    const saidas = await Saida.getSaidas();
    res.json(saidas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar saídas", error: error.message });
  }
};

export const criarSaida = async (req, res) => {
  try {
    const novaSaida = await Saida.createSaida(req.body);
    res.status(201).json({ message: "Saída registrada com sucesso", novaSaida });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar saída", error: error.message });
  }
};
