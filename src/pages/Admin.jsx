import { useEffect, useState } from "react";
import { LogOut, Users, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";

function Admin() {
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 🔹 Busca turmas da API
    async function carregarTurmas() {
        setLoading(true);
        try {
            const response = await Api.client.get("/turma");

            if (response.data?.status_code === 200) {
                setTurmas(response.data.data);
            } else {
                alert("Erro ao carregar turmas.");
            }
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
            alert("Erro ao buscar turmas. Verifique sua conexão.");
        } finally {
            setLoading(false);
        }
    }

    // 🔹 Logout
    function sair() {
        localStorage.removeItem("admin");
        navigate("/admin");
    }

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/admin");
            return;
        }
        carregarTurmas();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 p-8">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-10 border-b-4 border-yellow-400 pb-4">
                <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8 text-yellow-600" />
                    <h1 className="text-3xl font-extrabold text-yellow-700">
                        Painel de Administração
                    </h1>
                </div>
                <button
                    onClick={sair}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-200 active:scale-95"
                >
                    <LogOut className="w-5 h-5" />
                    Sair
                </button>
            </div>

            {/* Conteúdo */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-yellow-400">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-yellow-800 flex items-center gap-2">
                        <Users className="w-6 h-6 text-yellow-600" />
                        Lista de Turmas
                    </h2>
                    <button
                        onClick={carregarTurmas}
                        disabled={loading}
                        className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-xl border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-100 transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Atualizar
                    </button>
                </div>

                {/* Lista */}
                {loading ? (
                    <div className="text-center text-yellow-700 font-medium">
                        Carregando turmas...
                    </div>
                ) : turmas.length === 0 ? (
                    <div className="text-center text-gray-600 italic">
                        Nenhuma turma cadastrada.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {turmas.map((turma) => (
                            <div
                                key={turma.id}
                                onClick={() => navigate(`/turma/${turma.id}`)}
                                className={`cursor-pointer rounded-2xl shadow-md p-5 border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${turma.comecou ? "border-green-400 bg-green-50" : "border-yellow-300 bg-yellow-50"
                                    }`}
                            >
                                <h3 className="text-lg font-bold text-yellow-800">{turma.name}</h3>
                                <p
                                    className={`mt-2 font-semibold ${turma.comecou ? "text-green-600" : "text-yellow-600"
                                        }`}
                                >
                                    {turma.comecou ? "✅ Em andamento" : "🕓 Aguardando início"}
                                </p>
                            </div>

                        ))}
                    </div>
                )}
            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
                © {new Date().getFullYear()} Painel Administrativo — Controle de Turmas
            </p>
        </div>
    );
}

export default Admin;
