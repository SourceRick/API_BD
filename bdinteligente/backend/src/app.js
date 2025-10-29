import express from "express";
import cors from "cors";  // Primeiro importa o CORS
import itemRoutes from "./routes/itemRoutes.js";
import entradaRoutes from "./routes/entradaRoutes.js";
import saidaRoutes from "./routes/saidaRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";
import funcionarioRoutes from "./routes/funcionarioRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";
import funcionarioItemRoutes from "./routes/funcionarioItemRoutes.js";

const app = express();

// Primeiro configure o CORS antes de qualquer outra coisa
app.use(cors());

// Agora você pode usar express.json() para tratar JSON
app.use(express.json());  

// Rotas para as funcionalidades
app.use("/api/itens", itemRoutes);
app.use("/api/funcionarios-itens", funcionarioItemRoutes);
app.use("/api/entradas", entradaRoutes);
app.use("/api/saidas", saidaRoutes);
app.use("/api/emprestimos", emprestimoRoutes);
app.use("/api/relatorios", relatorioRoutes);
app.use("/api/funcionarios", funcionarioRoutes);

// Middleware para tratar erros 404 (Rota não encontrada)
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada!" });
});

// Middleware para tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

export default app;
