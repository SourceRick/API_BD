import express from "express";
import { gerarRelatorio } from "../controllers/relatorioController.js";

const router = express.Router();
router.get("/", gerarRelatorio);

export default router;
