import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, PlusCircle, Trash } from "lucide-react";
import Api from "../services/Api";

export default function Editar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questoes, setQuestoes] = useState([]);
    const [turma, setTurma] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Carrega turma e questões
    async function carregarQuestoes() {
        setLoading(true);
        try {
            const response = await Api.client.get(`/turma/${id}`);
            if (response.data?.status_code === 200) {
                setTurma(response.data.data);
                setQuestoes(response.data.data.questoes || []);
            } else {
                alert("Erro ao carregar dados da turma.");
            }
        } catch (error) {
            console.error("Erro ao carregar turma:", error);
            alert("Falha ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Adicionar nova questão
    async function adicionarQuestao() {
        const texto = prompt("Digite o enunciado da nova questão:");
        if (!texto) return;
        try {
            const response = await Api.client.post(`/questoes`, {
                turma_id: id,
                texto,
            });
            alert(response.data?.messege || "Questão adicionada!");
            carregarQuestoes();
        } catch (error) {
            console.error("Erro ao adicionar questão:", error);
            alert("Erro ao adicionar questão.");
        }
    }

    // 🔹 Editar questão existente
    async function editarQuestao(questao) {
        const novoTexto = prompt("Edite o enunciado da questão:", questao.texto);
        if (!novoTexto || novoTexto === questao.texto) return;
        try {
            const response = await Api.client.put(`/questao/${questao.id}`, {
                texto: novoTexto,
            });
            alert(response.data?.messege || "Questão atualizada!");
            carregarQuestoes();
        } catch (error) {
            console.error("Erro ao editar questão:", error);
            alert("Erro ao editar questão.");
        }
    }

    // 🔹 Excluir questão individual
    async function excluirQuestao(idQuestao) {
        if (!confirm("Deseja realmente excluir esta questão?")) return;
        try {
            const response = await Api.client.delete(`/questao/${idQuestao}`);
            alert(response.data?.messege || "Questão removida!");
            carregarQuestoes();
        } catch (error) {
            console.error("Erro ao excluir questão:", error);
            alert("Erro ao excluir questão.");
        }
    }

    // 🔹 Apagar todas as questões
    async function apagarTodas() {
        if (!confirm("Tem certeza que deseja apagar todas as questões desta turma?")) return;
        try {
            const response = await Api.client.delete(`/turma/${id}/questoes`);
            alert(response.data?.messege || "Todas as questões foram apagadas!");
            carregarQuestoes();
        } catch (error) {
            console.error("Erro ao apagar todas as questões:", error);
            alert("Erro ao apagar todas as questões.");
        }
    }

    useEffect(() => {
        carregarQuestoes();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-yellow-700 font-semibold">
                Carregando questões...
            </div>
        );
    }

    if (!turma) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
                <p>Turma não encontrada.</p>
                <button
                    onClick={() => navigate("/admin")}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                >
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 p-8">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-8 border-b-4 border-yellow-400 pb-4">
                <div className="flex items-center gap-3">
                    <ArrowLeft
                        onClick={() => navigate(`/turma/${id}`)}
                        className="w-7 h-7 text-yellow-600 cursor-pointer hover:text-yellow-800"
                    />
                    <h1 className="text-3xl font-extrabold text-yellow-700">
                        Questões — {turma.name}
                    </h1>
                </div>
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-4 mb-6">
                <button
                    onClick={adicionarQuestao}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-xl shadow-md transition-all active:scale-95"
                >
                    <PlusCircle className="w-5 h-5" />
                    Adicionar Questão
                </button>

                <button
                    onClick={apagarTodas}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl shadow-md transition-all active:scale-95"
                >
                    <Trash className="w-5 h-5" />
                    Apagar Todas
                </button>
            </div>

            {/* Lista de Questões */}
            {questoes.length > 0 ? (
                <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-yellow-400">
                    <ul className="space-y-4">
                        {questoes.map((questao, index) => (
                            <li
                                key={questao.id}
                                className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-all"
                            >
                                <span className="text-gray-800 font-medium">
                                    {index + 1}. {questao.texto}
                                </span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => editarQuestao(questao)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => excluirQuestao(questao.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray-600 font-medium mt-10">
                    Nenhuma questão cadastrada.
                </p>
            )}

            <p className="text-center text-sm text-gray-500 mt-10">
                © {new Date().getFullYear()} Painel Administrativo — {turma.name}
            </p>
        </div>
    );
}
