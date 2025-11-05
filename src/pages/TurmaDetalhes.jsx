import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, PlusCircle, ArrowLeft, XCircle } from "lucide-react";
import Api from "../services/Api";

export default function EditarQuestoes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questoes, setQuestoes] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Carrega as questões da turma
    async function carregarQuestoes() {
        setLoading(true);
        try {
            const response = await Api.client.get(`/turma/${id}/questoes`);
            if (response.data?.status_code === 200) {
                setQuestoes(response.data.data);
            } else {
                alert("Erro ao carregar questões.");
            }
        } catch (error) {
            console.error("Erro ao carregar questões:", error);
            alert("Falha ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Adicionar nova questão
    async function adicionarQuestao() {
        const title = prompt("Título da nova questão:");
        if (!title) return;

        try {
            const response = await Api.client.post(`/questoes`, {
                title,
                alt1: "",
                alt2: "",
                alt3: "",
                alt4: "",
                altCorreta: "",
                timing: 30,
                turma_id: id,
            });
            alert(response.data?.messege || "Questão adicionada!");
            carregarQuestoes();
        } catch (error) {
            console.error("Erro ao adicionar questão:", error);
            alert("Erro ao adicionar questão.");
        }
    }

    // 🔹 Editar questão existente
    function editarQuestao(questaoId) {
        navigate(`/questoes/${questaoId}/editar`);
    }

    // 🔹 Excluir questão
    async function excluirQuestao(questaoId) {
        if (!confirm("Deseja realmente excluir esta questão?")) return;
        try {
            const response = await Api.client.delete(`/questoes/${questaoId}`);
            alert(response.data?.messege || "Questão excluída!");
            carregarQuestoes();
        } catch (error) {
            console.error("Erro ao excluir questão:", error);
            alert("Erro ao excluir questão.");
        }
    }

    // 🔹 Excluir todas as questões
    async function excluirTodas() {
        if (!confirm("Tem certeza que deseja apagar TODAS as questões desta turma?")) return;
        try {
            const response = await Api.client.delete(`/turma/${id}/questoes`);
            alert(response.data?.messege || "Todas as questões foram apagadas!");
            carregarQuestoes();
        } catch (error) {
            console.error("Erro ao excluir todas as questões:", error);
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
                        Editar Questões da Turma #{id}
                    </h1>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={adicionarQuestao}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-xl shadow-md transition-all duration-200 active:scale-95"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Adicionar
                    </button>

                    <button
                        onClick={excluirTodas}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl shadow-md transition-all duration-200 active:scale-95"
                    >
                        <XCircle className="w-5 h-5" />
                        Apagar Todos
                    </button>
                </div>
            </div>

            {/* Lista de Questões */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-yellow-400">
                {questoes.length === 0 ? (
                    <p className="text-center text-gray-600">Nenhuma questão encontrada.</p>
                ) : (
                    <ul className="divide-y divide-yellow-200">
                        {questoes.map((questao) => (
                            <li
                                key={questao.id}
                                className="flex justify-between items-center py-4"
                            >
                                <div>
                                    <p className="font-semibold text-yellow-700">{questao.title}</p>
                                    <p className="text-sm text-gray-500">
                                        Tempo: {questao.timing}s
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => editarQuestao(questao.id)}
                                        className="text-blue-600 hover:text-blue-800 transition"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={() => excluirQuestao(questao.id)}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
                © {new Date().getFullYear()} Painel Administrativo
            </p>
        </div>
    );
}
