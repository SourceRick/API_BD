import * as Entrada from "../models/entradaModel.js";

export const listarEntradas = async (req, res) => {
  try {
    const entradas = await Entrada.getEntradas();
    res.json(entradas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar entradas", error: error.message });
  }
};

export const criarEntrada = async (req, res) => {
  try {
    const novaEntrada = await Entrada.createEntrada(req.body);
    res.status(201).json({ message: "Entrada registrada com sucesso", novaEntrada });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar entrada", error: error.message });
  }
};
