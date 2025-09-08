import { useState } from "react";
import { Play, User, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Componente Nav simples
function Nav() {
  return (
    <nav className="bg-blue-950 w-full p-4">
      <h1 className="text-white text-lg font-bold text-center">Quiz App</h1>
    </nav>
  );
}

function Home() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  const usuario = {
    user: "leo",
    password: "1234",
  };

  function onClickBtn(user, password) {
    setIsLoading(true);
    
    setTimeout(() => {
      verificao(user, password);
      if (user.trim() !== "" && password.trim() !== "") {
        const dados = {
          user: user,
          password: password,
        };
        localStorage.setItem("user", JSON.stringify(dados)); // Não funciona em artifacts
        console.log("Navegando para /q");
        Navigate("/q");
      }
      setIsLoading(false);
    }, 1000);
  }

  function verificao(user, password) {
    if (user.trim() !== "" && password.trim() !== "") {
      // Verifica se o usuário e senha correspondem
      if (user === usuario.user && password === usuario.password) {
        alert("Usuário encontrado. Login bem-sucedido.");
      } else {
        alert("Usuário não encontrado ou senha incorreta.");
      }
    } else {
      alert("Preencha todos os campos.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-300">
      <Nav />
      
      {/* Header com boas-vindas */}
      <div className="px-6 py-8 text-center">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-3xl font-bold text-blue-950 mb-2">
          Bem-vindo ao Quiz!
        </h2>
        <p className="text-blue-800 text-lg">
          Teste seus conhecimentos e divirta-se
        </p>
      </div>

      {/* Formulário de Login */}
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
            {/* Campo Usuário */}
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
                  onChange={(event) => {
                    setUser(event.target.value);
                  }}
                />
                <User className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-blue-950 font-semibold mb-2 text-sm">
                🔒 Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-blue-950 font-medium focus:border-blue-400 focus:bg-white transition-all duration-200 outline-none pr-12"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
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

            {/* Dica de Login */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm font-medium mb-1">💡 Dica:</p>
              <p className="text-blue-700 text-xs">
                Usuário: <span className="font-bold">leo</span> | Senha: <span className="font-bold">1234</span>
              </p>
            </div>

            {/* Botão de Login */}
            <button
              onClick={() => {
                if (!isLoading) {
                  onClickBtn(user, password);
                }
              }}
              disabled={isLoading}
              className={`w-full rounded-xl font-bold text-lg py-4 transition-all duration-200 shadow-lg flex items-center justify-center space-x-3 ${
                isLoading 
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

      {/* Estatísticas do Quiz */}
      <div className="px-6 py-8">
        <div className="bg-blue-800 rounded-2xl p-6 text-white max-w-sm mx-auto">
          <h4 className="font-bold mb-4 text-center text-lg">📊 Sobre o Quiz</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">10</div>
              <div className="text-xs text-blue-200">Questões</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5★</div>
              <div className="text-xs text-blue-200">Dificuldade</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-600">
            <div className="text-center">
              <div className="text-2xl font-bold">~5min</div>
              <div className="text-xs text-blue-200">Tempo médio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 px-6">
        <p className="text-blue-700 text-sm">
          🎯 Desafie-se com perguntas de conhecimentos gerais
        </p>
      </div>
    </div>
  );
}

export default Home;