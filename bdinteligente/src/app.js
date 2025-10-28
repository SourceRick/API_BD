import express from "express";
import itemRoutes from "./routes/itemRoutes.js";
import entradaRoutes from "./routes/entradaRoutes.js";
import saidaRoutes from "./routes/saidaRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";
import funcionarioRoutes from "./routes/funcionarioRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";
import funcionarioItemRoutes from "./routes/funcionarioItemRoutes.js";




const app = express();

app.use(express.json());

app.use("/api/itens", itemRoutes);
app.use("/api/funcionarios-itens", funcionarioItemRoutes);
app.use("/api/entradas", entradaRoutes);
app.use("/api/saidas", saidaRoutes);
app.use("/api/emprestimos", emprestimoRoutes);
app.use("/api/relatorios", relatorioRoutes);
app.use("/api/funcionarios", funcionarioRoutes);

export default app;
