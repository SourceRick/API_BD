import express from "express";
import { listarEntradas, criarEntrada } from "../controllers/entradaController.js";

const router = express.Router();

router.get("/", listarEntradas);
router.post("/", criarEntrada);

export default router;
