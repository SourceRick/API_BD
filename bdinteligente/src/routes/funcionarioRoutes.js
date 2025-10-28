import express from "express";
import {
  listarFuncionarios,
  obterFuncionario,
  criarFuncionario,
  atualizarFuncionario,
  excluirFuncionario
} from "../controllers/funcionarioController.js";

const router = express.Router();

router.get("/", listarFuncionarios);
router.get("/:id", obterFuncionario);
router.post("/", criarFuncionario);
router.put("/:id", atualizarFuncionario);
router.delete("/:id", excluirFuncionario);

export default router;
