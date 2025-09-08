import { useState, useEffect } from "react";

// Componente Nav simples
function Nav() {
  return (
    <nav className="bg-blue-950 w-full p-4">
      <h1 className="text-white text-lg font-bold text-center">Quiz App</h1>
    </nav>
  );
}

function Tabela() {
  const [vencedores, setVencedores] = useState([
    { id: 1, nome: "João Silva", pontuacao: "8/10", data: "08/09", tempo: "2:45" },
    { id: 2, nome: "Maria Santos", pontuacao: "7/10", data: "07/09", tempo: "3:12" },
    { id: 3, nome: "Pedro Costa", pontuacao: "9/10", data: "06/09", tempo: "2:31" },
    { id: 4, nome: "Ana Oliveira", pontuacao: "6/10", data: "05/09", tempo: "4:05" },
    { id: 5, nome: "Carlos Ferreira", pontuacao: "10/10", data: "04/09", tempo: "2:18" },
    { id: 6, nome: "Lucia Pereira", pontuacao: "8/10", data: "03/09", tempo: "3:27" },
    { id: 7, nome: "Roberto Lima", pontuacao: "7/10", data: "02/09", tempo: "3:55" },
    { id: 8, nome: "Sofia Rodrigues", pontuacao: "9/10", data: "01/09", tempo: "2:42" }
  ]);

  // Ordenar vencedores por pontuação (maior para menor) e depois por tempo (menor para maior)
  const vencedoresOrdenados = [...vencedores].sort((a, b) => {
    const pontuacaoA = parseInt(a.pontuacao.split('/')[0]);
    const pontuacaoB = parseInt(b.pontuacao.split('/')[0]);
    
    if (pontuacaoB !== pontuacaoA) {
      return pontuacaoB - pontuacaoA;
    }
    
    // Se pontuação for igual, ordenar por tempo (menor tempo primeiro)
    const tempoA = a.tempo.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
    const tempoB = b.tempo.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
    return tempoA - tempoB;
  });

  const getPosicaoIcon = (index) => {
    switch (index) {
      case 0:
        return <span className="text-3xl">🥇</span>;
      case 1:
        return <span className="text-3xl">🥈</span>;
      case 2:
        return <span className="text-3xl">🥉</span>;
      default:
        return <span className="text-xl font-bold text-blue-950">#{index + 1}</span>;
    }
  };

  const getPosicaoClass = (index) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-l-4 border-yellow-400";
      case 1:
        return "bg-gradient-to-r from-gray-100 to-gray-200 border-l-4 border-gray-400";
      case 2:
        return "bg-gradient-to-r from-orange-100 to-orange-200 border-l-4 border-orange-400";
      default:
        return "bg-white border-l-4 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-blue-200">
      <Nav />
      
      {/* Header */}
      <div className="bg-blue-950 px-4 py-6">
        <h2 className="text-white text-2xl font-bold text-center mb-2">
          🏆 Top Jogadores
        </h2>
        <p className="text-blue-200 text-center text-sm">
          Ranking dos melhores
        </p>
      </div>

      {/* Lista de Vencedores - Formato Card Mobile */}
      <div className="px-4 py-4 space-y-3">
        {vencedoresOrdenados.map((vencedor, index) => (
          <div 
            key={vencedor.id}
            className={`rounded-xl shadow-lg p-4 ${getPosicaoClass(index)} active:scale-95 transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              {/* Posição e Nome */}
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-shrink-0">
                  {getPosicaoIcon(index)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-blue-950 text-lg truncate">
                    {vencedor.nome}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    📅 {vencedor.data}
                  </p>
                </div>
              </div>

              {/* Pontuação */}
              <div className="flex-shrink-0 text-right">
                <div className="bg-blue-950 text-white px-3 py-2 rounded-full font-bold text-lg mb-1">
                  {vencedor.pontuacao}
                </div>
                <p className="text-gray-600 text-sm">
                  ⏱️ {vencedor.tempo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas Resumidas */}
      <div className="px-4 py-4">
        <div className="bg-blue-800 rounded-xl p-4 text-white">
          <h4 className="font-bold mb-3 text-center">📊 Estatísticas</h4>
          <div className="flex justify-around text-center">
            <div>
              <div className="text-2xl font-bold">{vencedores.length}</div>
              <div className="text-xs text-blue-200">Jogadores</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{vencedoresOrdenados[0]?.pontuacao}</div>
              <div className="text-xs text-blue-200">Melhor Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{vencedoresOrdenados[0]?.tempo}</div>
              <div className="text-xs text-blue-200">Melhor Tempo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Navegação - Fixos na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 rounded-xl transition-colors duration-200 shadow-lg text-lg">
          🎮 Novo Jogo
        </button>
        <button className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-blue-950 font-semibold py-3 rounded-xl transition-colors duration-200 shadow-md">
          ← Voltar aos Resultados
        </button>
      </div>

      {/* Espaçamento para os botões fixos */}
      <div className="h-32"></div>
    </div>
  );
}

export default Tabela;