import { useState } from "react";
import { Play, User, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api"; // ✅ importa o módulo


function Nav() {
  return (
    <nav className="bg-blue-950 w-full p-4">
      <h1 className="text-white text-lg font-bold text-center">Quiz App</h1>
    </nav>
  );
}

function Home() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onClickBtn() {
    if (!user.trim() || !senha.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await Api.login(user, senha);

      // Se o Laravel retornar no formato { success: true, data: { ... } }
      if (response.success) {
        const aluno = response.data;

        // Armazena o aluno no localStorage
        localStorage.setItem("user", JSON.stringify(aluno));

        alert(`Bem-vindo, ${aluno.user}!`);
        navigate("/q"); // vai pro quiz
      } else {
        alert(response.message || "Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao fazer login. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300">
      <Nav />

      <div className="px-6 py-8 text-center">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-3xl font-bold text-blue-950 mb-2">
          Bem-vindo ao Quiz!
        </h2>
        <p className="text-blue-800 text-lg">
          Teste seus conhecimentos e divirta-se
        </p>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-blue-950" />
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-2">Fazer Login</h3>
            <p className="text-gray-600 text-sm">Entre com suas credenciais</p>
          </div>

          <div className="space-y-6">
            {/* Usuário */}
            <div>
              <label className="block text-blue-950 font-semibold mb-2 text-sm">
                👤 Usuário
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-blue-950 font-medium focus:border-blue-400 focus:bg-white transition-all duration-200 outline-none"
                  placeholder="Digite seu usuário"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-blue-950 font-semibold mb-2 text-sm">
                🔒 Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-blue-950 font-medium focus:border-blue-400 focus:bg-white transition-all duration-200 outline-none pr-12"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Botão */}
            <button
              onClick={onClickBtn}
              disabled={isLoading}
              className={`w-full rounded-xl font-bold text-lg py-4 transition-all duration-200 shadow-lg flex items-center justify-center space-x-3 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-xl active:scale-95'
                } text-white`}
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  <span>Iniciar Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
