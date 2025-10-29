export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] px-6">
      <h1 className="text-4xl font-bold text-[#f8f8f2] mb-4">
        Almoxarifado Inteligente
      </h1>
      <p className="text-[#bd93f9] mb-10 text-lg">
        Bem-vindo! Use o menu acima para navegar entre as seções.
      </p>

      <img
        src="imgs/bd.jpg"
        alt="Banco de Dados Inteligente"
        className="w-full max-w-md rounded-xl shadow-lg border border-[#44475a]"
      />
    </div>
  );
}
