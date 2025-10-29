import express from "express";
import { listarSaidas, criarSaida } from "../controllers/saidaController.js";

const router = express.Router();

router.get("/", listarSaidas);
router.post("/", criarSaida);

export default router;
