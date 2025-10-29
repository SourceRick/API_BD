// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ItensList from "./pages/Itens/ItensList";
import ItemForm from "./pages/Itens/ItemForm";
import Entradas from "./pages/Entradas";
import Saidas from "./pages/Saidas";
import Emprestimos from "./pages/Emprestimos";
import Funcionarios from "./pages/Funcionarios";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itens" element={<ItensList />} />
          <Route path="/itens/novo" element={<ItemForm />} />
          <Route path="/itens/editar/:id" element={<ItemForm />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/saidas" element={<Saidas />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
