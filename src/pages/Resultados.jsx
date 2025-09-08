import { useState, useEffect } from "react";
import Nav from "../components/Nav";
// Componente Nav simples


function Resultados() {
  const progresso = JSON.parse(localStorage.getItem("progresso")) || {total:0, certas: 0}
    console.log(progresso)
  return (
    <>
      <main className="h-screen w-screen bg-blue-200 flex flex-col items-center">
        <Nav />
        <section className="flex flex-col items-center bg-blue-950 w-full min-h-screen p-8">
          <div className="mb-8">
            <h2 className="text-white text-2xl font-bold text-center max-w-2xl">
              Resultado Final
            </h2>
          </div>

          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-950 mb-4">
                {progresso.certas}/{progresso.total}
              </div>
              <div className="text-lg text-gray-600">
                Você acertou {progresso.certas} de {progresso.total} questões
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            <button className="bg-white hover:bg-blue-100 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Fazer Novamente
            </button>
            
            <button className="bg-white hover:bg-blue-100 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Voltar ao Início
            </button>
            <button className="bg-white hover:bg-blue-100 text-blue-950 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              Tabela
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Resultados;