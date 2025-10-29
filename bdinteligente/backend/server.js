import express from "express";
import dotenv from "dotenv";
import app from "./src/app.js";  // Correto, você já está importando o app corretamente

dotenv.config();  // Carrega as variáveis do arquivo .env

const PORT = process.env.PORT || 3000;  // A variável de ambiente para o port

// Inicia o servidor na porta configurada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
