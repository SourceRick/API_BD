import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    funcao: "",
    registro_academico: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchFuncionarios = async () => {
    const res = await api.get("/funcionarios");
    setFuncionarios(res.data);
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/funcionarios/${editId}`, form);
    } else {
      await api.post("/funcionarios", form);
    }
    setForm({ nome: "", email: "", funcao: "", registro_academico: "" });
    setEditId(null);
    fetchFuncionarios();
  };

  const handleEdit = (f) => {
    setForm(f);
    setEditId(f.id_funcionario);
  };

  const handleDelete = async (id) => {
    if (confirm("Deseja remover este funcionário?")) {
      await api.delete(`/funcionarios/${id}`);
      fetchFuncionarios();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Funcionários</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Função"
          value={form.funcao}
          onChange={(e) => setForm({ ...form, funcao: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Registro Acadêmico"
          value={form.registro_academico}
          onChange={(e) =>
            setForm({ ...form, registro_academico: e.target.value })
          }
          className="border p-2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          {editId ? "Salvar Alterações" : "Cadastrar"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Registro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id_funcionario}>
              <td>{f.id_funcionario}</td>
              <td>{f.nome}</td>
              <td>{f.email}</td>
              <td>{f.funcao}</td>
              <td>{f.registro_academico}</td>
              <td>
                <button
                  onClick={() => handleEdit(f)}
                  className="text-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(f.id_funcionario)}
                  className="text-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
