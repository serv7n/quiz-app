import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <nav className="bg-blue-950 w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Botão Menu */}
            <button
              onClick={() => setMenuAberto(true)}
              className="text-white hover:bg-blue-800 p-2 rounded-lg transition-colors duration-200"
              title="Menu"
            >
              <Menu size={24} />
            </button>

            {/* Título com Badge - Centralizado */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">Q</span>
              </div>
              <h1 className="text-white text-xl font-bold tracking-wide">
                Quiz<span className="text-blue-400">App</span>
              </h1>
            </div>

            {/* Espaço vazio para manter o layout equilibrado */}
            <div className="w-10"></div>
          </div>
        </div>
      </nav>

      {/* Menu Lateral */}
      {menuAberto && (
        <>
          {/* Overlay escuro */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setMenuAberto(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300">
            {/* Header do Menu */}
            <div className="bg-blue-950 p-4 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">Menu</h2>
              <button
                onClick={() => setMenuAberto(false)}
                className="text-white hover:bg-blue-800 p-2 rounded-lg transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo do Menu */}
            <div className="p-4 space-y-2">
              <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                <LogIn size={20} className="text-blue-600" />
                <span>Login</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium">
                <LogOut size={20} className="text-red-600" />
                <span>Logout</span>
              </button>
            </div>

            {/* Footer do Menu */}
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">
                QuizApp © 2025
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}