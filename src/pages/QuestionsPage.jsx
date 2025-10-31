import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import QuestionHeader from "../components/QuestionHeader";
import TimerBar from "../components/TimerBar";
import QuestionCard from "../components/QuestionCard";
import AlternativesList from "../components/AlternativesList";
import FeedbackModal from "../components/FeedbackModal";
import { questionsData } from "../data/questionsData";

export default function QuestionsPage() {
  const navigate = useNavigate();
  const totalQuestoes = Object.keys(questionsData).length;

  const [progresso, setProgresso] = useState({
    step: 1,
    certas: 0,
    total: totalQuestoes,
  });

  const questaoAtual = questionsData[progresso.step];
  const [tempo, setTempo] = useState(questaoAtual?.timing || 10);
  const [escolha, setEscolha] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [mostrandoFeedback, setMostrandoFeedback] = useState(false);
  const [resultadoMostrado, setResultadoMostrado] = useState(false); 
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (mostrandoFeedback || resultadoMostrado || !questaoAtual) return;

    if (tempo > 0) {
      const timer = setTimeout(() => setTempo((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Tempo acabou → mostra resultado automaticamente
      mostrarResultado();
    }
  }, [tempo, mostrandoFeedback, resultadoMostrado, questaoAtual]);

  // 🔁 Reinicia o tempo ao mudar de questão
  useEffect(() => {
    if (questaoAtual) {
      setTempo(questaoAtual.timing);
      setEscolha(null);
      setResultadoMostrado(false); 
    }
  }, [progresso.step]);

  function onClickButton(alternativa) {
    if (!mostrandoFeedback && tempo > 0) setEscolha(alternativa);
  }


  function mostrarResultado() {
    if (mostrandoFeedback || resultadoMostrado) return;

    setResultadoMostrado(true);
    setMostrandoFeedback(true);

    const correta = questaoAtual.correta;
    const acertou = escolha && escolha == correta;

    setFeedback({
      tipo: acertou ? "correto" : "erro",
      texto: acertou ? "Resposta Correta! 🎉" : "Ops! Resposta incorreta 😔",
    });

    setTimeout(() => {
      setMostrandoFeedback(false);
      setFeedback(null);
      setEscolha(null);

      const novoProgresso = {
        step: progresso.step + 1,
        certas: acertou ? progresso.certas + 1 : progresso.certas,
        total: progresso.total,
      };
      setProgresso(novoProgresso);

      if (novoProgresso.step > totalQuestoes) setFinalizado(true);
    }, 2000);
  }

  // 🏁 Final do quiz → salva resultado e redireciona
  useEffect(() => {
    if (finalizado) {
      const resultado = {
        certas: progresso.certas,
        erradas: progresso.total - progresso.certas,
        total: progresso.total,
      };
      localStorage.setItem("resultadoQuiz", JSON.stringify(resultado));
      navigate("/tabela");
    }
  }, [finalizado, navigate, progresso]);

  if (!questaoAtual) return null;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-blue-200">
        {/* Cabeçalho */}
        <QuestionHeader
          step={progresso.step}
          total={progresso.total}
          certas={progresso.certas}
        />

        {/* Timer */}
        <TimerBar tempo={tempo} total={questaoAtual.timing} />

        {/* Pergunta */}
        <QuestionCard title={questaoAtual.title} />

        {/* Alternativas */}
        <AlternativesList
          alternativas={questaoAtual.alternativas}
          escolha={escolha}
          mostrandoFeedback={mostrandoFeedback}
          onClick={onClickButton}
        />

        {/* Botão confirmar */}
        {escolha && !mostrandoFeedback && tempo > 0 && (
          <div className="px-4 mt-4">
            <button
              onClick={mostrarResultado}
              className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-lg text-lg"
            >
              ✓ Confirmar Resposta
            </button>
          </div>
        )}

        {/* Feedback */}
        <FeedbackModal
          feedback={feedback}
          correta={questaoAtual.alternativas[questaoAtual.correta]}
        />
      </div>
    </>
  );
}
