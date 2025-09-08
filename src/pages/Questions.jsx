import { useState, useEffect } from "react";

// Componente Nav simples
function Nav() {
  return (
    <nav className="bg-blue-950 w-full p-4">
      <h1 className="text-white text-lg font-bold text-center">Quiz App</h1>
    </nav>
  );
}

function Questions() {
  const questoes = {
    1: {
      title: "Qual o maior órgão do ser humano",
      alternativas: {
        1: "Cérebro",
        2: "Fígado",
        3: "Pulmão",
        4: "Pele",
      },
      correta: 4,
    },
    2: {
      title: "Quem foi o primeiro presidente do Brasil",
      alternativas: {
        1: "Getúlio Vargas",
        2: "Floriano Peixoto",
        3: "Deodoro da Fonseca",
        4: "Dom Pedro II",
      },
      correta: 3,
    },
    3: {
      title: "Qual planeta é conhecido como planeta vermelho",
      alternativas: {
        1: "Marte",
        2: "Vênus",
        3: "Júpiter",
        4: "Mercúrio",
      },
      correta: 1,
    },
    4: {
      title: "Em que continente fica o Egito",
      alternativas: {
        1: "Ásia",
        2: "América",
        3: "África",
        4: "Europa",
      },
      correta: 3,
    },
    5: {
      title: "Quantos lados tem um hexágono",
      alternativas: {
        1: "5",
        2: "6",
        3: "7",
        4: "8",
      },
      correta: 2,
    },
    6: {
      title: "Quem pintou a Mona Lisa",
      alternativas: {
        1: "Pablo Picasso",
        2: "Leonardo da Vinci",
        3: "Michelangelo",
        4: "Salvador Dalí",
      },
      correta: 2,
    },
    7: {
      title: "Qual é a capital da Argentina",
      alternativas: {
        1: "Montevidéu",
        2: "Buenos Aires",
        3: "Santiago",
        4: "Lima",
      },
      correta: 2,
    },
    8: {
      title: "Qual desses animais é um mamífero",
      alternativas: {
        1: "Jacaré",
        2: "Sapo",
        3: "Golfinho",
        4: "Galo",
      },
      correta: 3,
    },
    9: {
      title: "Quem escreveu Dom Casmurro",
      alternativas: {
        1: "José de Alencar",
        2: "Machado de Assis",
        3: "Graciliano Ramos",
        4: "Clarice Lispector",
      },
      correta: 2,
    },
    10: {
      title: "Qual é o resultado de 9 x 7",
      alternativas: {
        1: "56",
        2: "72",
        3: "63",
        4: "81",
      },
      correta: 3,
    },
  };

  const totalQuestoes = Object.keys(questoes).length;
  const [progresso, setProgresso] = useState({
    step: 1,
    certas: 0,
    total: totalQuestoes
  });

  const [feedback, setFeedback] = useState(null);
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);

  function onClickButton(alternativa, question) {
    setMostrandoFeedback(true);
    
    if (alternativa == question.correta) {
      console.log("correct");
      setFeedback({ tipo: 'correto', texto: 'Resposta Correta! 🎉' });
      setProgresso((prev) => ({
        step: prev.step + 1,
        certas: prev.certas + 1,
        total: prev.total
      }));
    } else {
      setFeedback({ tipo: 'erro', texto: 'Ops! Resposta incorreta 😔' });
      setProgresso((prev) => ({ 
        step: prev.step + 1, 
        certas: prev.certas, 
        total: prev.total
      }));
    }

    // Aguarda 2 segundos antes de avançar
    setTimeout(() => {
      setMostrandoFeedback(false);
      setFeedback(null);
    }, 2000);
  }

  const questaoAtual = questoes[progresso.step];

  useEffect(() => {
    if (!questaoAtual && !mostrandoFeedback) {
      console.log(progresso);
      // Simula salvar no localStorage (não funciona em artifacts)
      alert(`Resultado Final: ${progresso.certas}/${progresso.total} questões corretas!`);
    }
  }, [questaoAtual, mostrandoFeedback]);

  if (!questaoAtual) {
    return (
      <div className="min-h-screen bg-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-blue-950">Quiz Finalizado!</h2>
          <p className="text-blue-800">Redirecionando para resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-200">
      <Nav />
      
      {/* Barra de Progresso */}
      <div className="bg-blue-950 px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-200 text-sm font-medium">
            Questão {progresso.step} de {progresso.total}
          </span>
          <span className="text-blue-200 text-sm font-medium">
            ✓ {progresso.certas} certas
          </span>
        </div>
        <div className="w-full bg-blue-800 rounded-full h-2">
          <div 
            className="bg-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(progresso.step - 1) / progresso.total * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Pergunta */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-4">❓</div>
            <h2 className="text-blue-950 text-xl font-bold leading-relaxed">
              {questaoAtual.title}
            </h2>
          </div>
        </div>

        {/* Alternativas */}
        <div className="space-y-4">
          {Object.entries(questaoAtual.alternativas).map(([key, value], index) => (
            <button
              key={key}
              onClick={() => {
                if (!mostrandoFeedback) {
                  onClickButton(key, questaoAtual);
                }
              }}
              disabled={mostrandoFeedback}
              className={`
                w-full p-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg text-left
                ${mostrandoFeedback ? 'cursor-not-allowed opacity-60' : 'active:scale-95'}
                ${!mostrandoFeedback ? 'bg-white hover:bg-blue-50 text-blue-950 hover:shadow-xl border-2 border-transparent hover:border-blue-200' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-950 rounded-full flex items-center justify-center font-bold text-sm">
                  {String.fromCharCode(64 + parseInt(key))}
                </span>
                <span className="flex-1">{value}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      {feedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className={`
            rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all duration-300 scale-100
            ${feedback.tipo === 'correto' ? 'bg-green-100 border-4 border-green-400' : 'bg-red-100 border-4 border-red-400'}
          `}>
            <div className="text-6xl mb-4">
              {feedback.tipo === 'correto' ? '🎉' : '😔'}
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${
              feedback.tipo === 'correto' ? 'text-green-800' : 'text-red-800'
            }`}>
              {feedback.texto}
            </h3>
            {feedback.tipo === 'erro' && (
              <p className="text-red-600 text-sm">
                A resposta correta é: <strong>{questaoAtual.alternativas[questaoAtual.correta]}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Informações na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div>
            📊 Progresso: {Math.round((progresso.step - 1) / progresso.total * 100)}%
          </div>
          <div>
            🎯 Taxa de Acerto: {progresso.step > 1 ? Math.round(progresso.certas / (progresso.step - 1) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Espaçamento para a barra fixa */}
      <div className="h-16"></div>
    </div>
  );
}

export default Questions;