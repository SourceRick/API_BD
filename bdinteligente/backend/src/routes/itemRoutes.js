import express from "express";
import {
  listarItens,
  obterItem,
  criarItem,
  atualizarItem,
  excluirItem
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", listarItens);
router.get("/:id", obterItem);
router.post("/", criarItem);
router.put("/:id", atualizarItem);
router.delete("/:id", excluirItem);

export default router;
