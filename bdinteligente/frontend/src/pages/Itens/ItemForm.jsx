import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

export default function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", descricao: "", quantidade: 0 });

  useEffect(() => {
    if (id) {
      api.get(`/itens/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/itens/${id}`, form);
    } else {
      await api.post("/itens", form);
    }
    navigate("/itens");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">{id ? "Editar Item" : "Novo Item"}</h2>
      <form onSubmit={handleSubmit} className="grid gap-2 w-80">
        <input type="text" placeholder="Nome" value={form.nome} onChange={(e)=>setForm({...form, nome: e.target.value})} className="border p-2" required />
        <input type="text" placeholder="Descrição" value={form.descricao} onChange={(e)=>setForm({...form, descricao: e.target.value})} className="border p-2" />
        <input type="number" placeholder="Quantidade" value={form.quantidade} onChange={(e)=>setForm({...form, quantidade: e.target.value})} className="border p-2" />
        <button className="bg-green-600 text-white p-2 rounded">{id ? "Salvar Alterações" : "Cadastrar"}</button>
      </form>
    </div>
  );
}
