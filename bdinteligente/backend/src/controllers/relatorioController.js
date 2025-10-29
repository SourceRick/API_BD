import { relatorioMovimentacoes } from "../models/relatorioModel.js";

export const gerarRelatorio = async (req, res) => {
  try {
    const { inicio, fim, tipo, id_item } = req.query;
    const dados = await relatorioMovimentacoes(
      inicio || "2025-01-01",
      fim || "2025-12-31",
      tipo || null,
      id_item || null
    );
    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ message: "Erro ao gerar relatório", error: error.message });
  }
};
