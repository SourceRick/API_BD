import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [itens, setItens] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState({
    itens_id: "",
    funcionario_id: "",
    status: "aberto",
  });

  const fetchEmprestimos = async () => {
    const res = await api.get("/emprestimos");
    setEmprestimos(res.data);
  };

  useEffect(() => {
    api.get("/itens").then((res) => setItens(res.data));
    api.get("/funcionarios").then((res) => setFuncionarios(res.data));
    fetchEmprestimos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/emprestimos", form);
    setForm({ itens_id: "", funcionario_id: "", status: "aberto" });
    fetchEmprestimos();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Empréstimos</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <select
          value={form.itens_id}
          onChange={(e) => setForm({ ...form, itens_id: e.target.value })}
          className="border p-2"
          required
        >
          <option value="">Selecione o item</option>
          {itens.map((i) => (
            <option key={i.id_item} value={i.id_item}>
              {i.nome}
            </option>
          ))}
        </select>

        <select
          value={form.funcionario_id}
          onChange={(e) => setForm({ ...form, funcionario_id: e.target.value })}
          className="border p-2"
          required
        >
          <option value="">Selecione o funcionário</option>
          {funcionarios.map((f) => (
            <option key={f.id_funcionario} value={f.id_funcionario}>
              {f.nome}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Registrar Empréstimo
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Funcionário</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((e) => (
            <tr key={e.id_emprestimo}>
              <td>{e.id_emprestimo}</td>
              <td>{e.nome_item || e.nome}</td>
              <td>{e.nome_funcionario}</td>
              <td>{e.status}</td>
              <td>{new Date(e.data_emprestimo).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
