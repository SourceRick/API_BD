import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Saidas() {
  const [saidas, setSaidas] = useState([]);
  const [itens, setItens] = useState([]);
  const [form, setForm] = useState({
    id_item: "",
    quantidade: 1,
    responsavel: "",
    tipo_saida: "consumo",
    observacao: "",
  });

  const fetchSaidas = async () => {
    const res = await api.get("/saidas");
    setSaidas(res.data);
  };

  useEffect(() => {
    api.get("/itens").then((res) => setItens(res.data));
    fetchSaidas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/saidas", form);
    setForm({
      id_item: "",
      quantidade: 1,
      responsavel: "",
      tipo_saida: "consumo",
      observacao: "",
    });
    fetchSaidas();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Saídas</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <select
          value={form.id_item}
          onChange={(e) => setForm({ ...form, id_item: e.target.value })}
          className="border p-2"
          required
        >
          <option value="">Selecione um item</option>
          {itens.map((i) => (
            <option key={i.id_item} value={i.id_item}>
              {i.nome}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantidade"
          value={form.quantidade}
          onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
          className="border p-2"
          required
        />

        <input
          type="text"
          placeholder="Responsável"
          value={form.responsavel}
          onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
          className="border p-2"
          required
        />

        <select
          value={form.tipo_saida}
          onChange={(e) => setForm({ ...form, tipo_saida: e.target.value })}
          className="border p-2"
        >
          <option value="consumo">Consumo</option>
          <option value="perda">Perda</option>
          <option value="transferencia">Transferência</option>
          <option value="outro">Outro</option>
        </select>

        <input
          type="text"
          placeholder="Observação"
          value={form.observacao}
          onChange={(e) => setForm({ ...form, observacao: e.target.value })}
          className="border p-2 w-60"
        />

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Registrar Saída
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Qtd</th>
            <th>Responsável</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {saidas.map((s) => (
            <tr key={s.id_saida}>
              <td>{s.id_saida}</td>
              <td>{s.nome_item || s.nome}</td>
              <td>{s.quantidade}</td>
              <td>{s.responsavel}</td>
              <td>{s.tipo_saida}</td>
              <td>{new Date(s.data_saida).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
