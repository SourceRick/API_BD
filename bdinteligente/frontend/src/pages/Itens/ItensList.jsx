import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function ItensList() {
  const [itens, setItens] = useState([]);

  const fetchItens = async () => {
    const res = await api.get("/itens");
    setItens(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm("Deseja excluir este item?")) {
      await api.delete(`/itens/${id}`);
      fetchItens();
    }
  };

  useEffect(() => { fetchItens(); }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Itens</h2>
      <Link to="/itens/novo" className="bg-blue-600 text-white px-3 py-2 rounded">+ Novo Item</Link>
      <table className="mt-4 w-full border">
        <thead className="bg-gray-100">
          <tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Estoque</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {itens.map(item => (
            <tr key={item.id_item}>
              <td>{item.id_item}</td>
              <td>{item.nome}</td>
              <td>{item.descricao}</td>
              <td>{item.quantidade}</td>
              <td>
                <Link to={`/itens/editar/${item.id_item}`} className="text-blue-600 mr-2">Editar</Link>
                <button onClick={() => handleDelete(item.id_item)} className="text-red-600">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
