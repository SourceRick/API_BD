import express from "express";
import {
  listarEmprestimos,
  criarEmprestimo,
  atualizarEmprestimo,
  excluirEmprestimo
} from "../controllers/emprestimoController.js";

const router = express.Router();

router.get("/", listarEmprestimos);
router.post("/", criarEmprestimo);
router.put("/:id", atualizarEmprestimo);
router.delete("/:id", excluirEmprestimo);

export default router;
