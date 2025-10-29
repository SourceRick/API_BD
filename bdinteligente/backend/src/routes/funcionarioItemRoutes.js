import express from "express";
import { listarFuncionariosItens } from "../controllers/funcionarioItemController.js";

const router = express.Router();

router.get("/", listarFuncionariosItens);

export default router;
