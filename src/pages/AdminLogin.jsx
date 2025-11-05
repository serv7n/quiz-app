import { useState } from "react";
import { ShieldCheck, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onClickBtn() {
    if (!email.trim() || !senha.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await Api.loginAdmin(email, senha);

      if (response.success) {
        const admin = response.data;
        localStorage.setItem("admin", JSON.stringify(admin));

        alert(`Bem-vindo(a), ${admin.user || admin.email}!`);
        navigate("/admin"); // 🔁 Redireciona após login
      } else {
        alert(response.message || "Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Falha na conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 flex flex-col items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border-4 border-yellow-500 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-500 rounded-full p-4 shadow-lg">
          <ShieldCheck className="text-white w-10 h-10" />
        </div>

        <div className="text-center mt-4 mb-8">
          <h1 className="text-3xl font-extrabold text-yellow-700 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600 text-sm">
            Acesse com suas credenciais de administrador
          </p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-yellow-800 font-semibold mb-2 text-sm">
              📧 E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-yellow-500" />
              <input
                type="email"
                className="w-full bg-yellow-50 border-2 border-yellow-300 rounded-xl pl-10 pr-4 py-3 text-yellow-900 font-medium focus:border-yellow-500 focus:bg-white outline-none transition-all duration-200"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-yellow-800 font-semibold mb-2 text-sm">
              🔒 Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-yellow-50 border-2 border-yellow-300 rounded-xl pl-4 pr-12 py-3 text-yellow-900 font-medium focus:border-yellow-500 focus:bg-white outline-none transition-all duration-200"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-yellow-600 hover:text-yellow-800 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Botão de login */}
          <button
            onClick={onClickBtn}
            disabled={isLoading}
            className={`w-full rounded-xl font-bold text-lg py-4 flex items-center justify-center space-x-3 transition-all duration-200 shadow-md ${isLoading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 hover:shadow-lg active:scale-95"
              } text-white`}
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <LogIn className="w-6 h-6" />
                <span>Acessar Painel</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} Painel Administrativo — Acesso Restrito
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
