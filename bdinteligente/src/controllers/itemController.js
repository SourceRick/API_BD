import * as Item from "../models/itemModel.js";

export const listarItens = async (req, res) => {
  try {
    const itens = await Item.getAllItens();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar itens", error: error.message });
  }
};

export const obterItem = async (req, res) => {
  try {
    const item = await Item.getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar item", error: error.message });
  }
};

export const criarItem = async (req, res) => {
  try {
    const novoItem = await Item.createItem(req.body);
    res.status(201).json(novoItem);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar item", error: error.message });
  }
};

export const atualizarItem = async (req, res) => {
  try {
    await Item.updateItem(req.params.id, req.body);
    res.json({ message: "Item atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar item", error: error.message });
  }
};

export const excluirItem = async (req, res) => {
  try {
    await Item.deleteItem(req.params.id);
    res.json({ message: "Item excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir item", error: error.message });
  }
};
