// src/pages/Entradas.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Entradas() {
  const [entradas, setEntradas] = useState([]);
  const [itens, setItens] = useState([]);
  const [form, setForm] = useState({ id_item: "", quantidade: 1, responsavel: "" });

  useEffect(() => {
    api.get("/entradas").then(res => setEntradas(res.data));
    api.get("/itens").then(res => setItens(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/entradas", form);
    setForm({ id_item: "", quantidade: 1, responsavel: "" });
    const res = await api.get("/entradas");
    setEntradas(res.data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Entradas</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <select value={form.id_item} onChange={(e)=>setForm({...form, id_item: e.target.value})} className="border p-2">
          <option value="">Selecione um item</option>
          {itens.map(it => <option key={it.id_item} value={it.id_item}>{it.nome}</option>)}
        </select>
        <input type="number" value={form.quantidade} onChange={(e)=>setForm({...form, quantidade: e.target.value})} className="border p-2" />
        <input type="text" placeholder="Responsável" value={form.responsavel} onChange={(e)=>setForm({...form, responsavel: e.target.value})} className="border p-2" />
        <button className="bg-green-600 text-white px-4">Registrar</button>
      </form>

      <table className="w-full border">
        <thead><tr><th>ID</th><th>Item</th><th>Qtd</th><th>Responsável</th><th>Data</th></tr></thead>
        <tbody>
          {entradas.map(e => (
            <tr key={e.id_entrada}>
              <td>{e.id_entrada}</td>
              <td>{e.nome_item || e.nome}</td>
              <td>{e.quantidade}</td>
              <td>{e.responsavel}</td>
              <td>{new Date(e.data_entrada).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
