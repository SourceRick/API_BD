import axios from "axios";

// Cria uma instância do Axios configurada com a base do backend
const api = axios.create({
  baseURL: "http://localhost:3000/api", // <-- importante o /api
});

export default api;
