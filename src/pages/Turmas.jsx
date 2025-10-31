import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Api from "../services/Api"; // ✅ importa o módulo

function TurmasSelection() {
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const [confirmado, setConfirmado] = useState(false);
    const [mostrandoFeedback, setMostrandoFeedback] = useState(false);

    useEffect(() => {
        async function fetchTurmas() {
            try {
                const dados = await Api.turmas();
                // formatar professores como string separada por vírgula
                const formatadas = dados.map((t) => ({
                    id: t.id,
                    nome: t.name,
                    professores: t.professores.map((p) => p.user).join(", ") || "Sem professor",
                }));
                setTurmas(formatadas);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchTurmas();
    }, []);

    const totalTurmas = turmas.length;

    function onClickTurma(id) {
        if (!mostrandoFeedback) setTurmaSelecionada(id);
    }

    function confirmarInscricao() {
        setMostrandoFeedback(true);
        setTimeout(() => {
            setConfirmado(true);
            setMostrandoFeedback(false);
        }, 2000);
    }

    if (loading) return <div className="text-center mt-20">Carregando turmas...</div>;

    if (confirmado) {
        const turma = turmas.find((t) => t.id === turmaSelecionada);
        return (
            <>
                <div className="min-h-screen bg-blue-200">
                    <div className="bg-blue-950 px-4 py-6">
                        <h2 className="text-white text-2xl font-bold text-center mb-2">
                            ✅ Inscrição Confirmada!
                        </h2>
                        <p className="text-blue-200 text-center text-sm">Bem-vindo à sua turma</p>
                    </div>
                    <div className="px-4 py-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4">🎓</div>
                                <h3 className="text-2xl font-bold text-blue-950 mb-2">{turma.nome}</h3>
                                <p className="text-gray-600 text-lg">
                                    Sua inscrição foi realizada com sucesso!
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">👨‍🏫 Professor:</span>
                                    <span className="text-blue-950 font-bold">{turma.professores}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 space-y-3">
                        <button
                            onClick={() => {
                                setConfirmado(false);
                                setTurmaSelecionada(null);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 rounded-xl transition-colors duration-200 shadow-lg text-lg"
                        >
                            🔄 Escolher Outra Turma
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-blue-200 pb-6">
                <div className="bg-blue-950 px-4 py-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-white">
                            <span className="text-sm text-blue-200">Total de Turmas</span>
                            <div className="text-2xl font-bold">{totalTurmas}</div>
                        </div>
                    </div>
                </div>

                <div className="px-4 space-y-3">
                    {turmas.map((turma) => {
                        const selecionada = turmaSelecionada === turma.id;
                        return (
                            <button
                                key={turma.id}
                                onClick={() => onClickTurma(turma.id)}
                                disabled={mostrandoFeedback}
                                className={`w-full p-4 rounded-xl font-semibold transition-all duration-200 shadow-lg text-left
                  ${selecionada ? "bg-blue-100 border-blue-400 border-2 scale-95" : "bg-white hover:bg-blue-50 border-2 border-transparent active:scale-95"}
                  ${mostrandoFeedback ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                                <h3 className="text-lg font-bold text-blue-950 mb-2">{turma.nome}</h3>
                                <p className="text-sm text-gray-600">👨‍🏫 {turma.professores}</p>
                            </button>
                        );
                    })}
                </div>

                {turmaSelecionada && !mostrandoFeedback && (
                    <div className="px-4 mt-4">
                        <button
                            onClick={confirmarInscricao}
                            className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-lg text-lg"
                        >
                            ✓ Confirmar Inscrição
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default TurmasSelection;
