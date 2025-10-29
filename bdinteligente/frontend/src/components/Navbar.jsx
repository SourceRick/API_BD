// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-10 py-3 flex gap-12">
      <Link to="/"> Início</Link>
      <Link to="/itens"> Itens</Link>
      <Link to="/entradas"> Entradas</Link>
      <Link to="/saidas"> Saídas</Link>
      <Link to="/emprestimos"> Empréstimos</Link>
      <Link to="/funcionarios"> Funcionários</Link>
    </nav>
  );
}
