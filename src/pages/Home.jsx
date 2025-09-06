import { useState } from "react";
import Nav from "../components/Nav";
import { LucidePlay, User } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const usuario = {
    user: "leo",
    password: "1234",
  };
  const navigate = useNavigate();
  // const navigate

  function onClickBtn(user, password) {
    verificao(user, password);
    if (user.trim() !== "" && password.trim() !== "") {
      const dados = {
        user: user,
        password: password,
      };
      localStorage.setItem("user", JSON.stringify(dados));
      navigate("/q");
    }
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
    <>
      <main className="h-screen w-screen bg-blue-200 space-y-7">
        <Nav />

        <section>
          <div className="flex flex-col justify-center items-center space-y-2">
            <input
              type="text"
              className="bg-white px-3 py-1 rounded-3xl"
              placeholder="User"
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
              }}
            />
            <input
              type="text"
              className="bg-white px-3 py-1 rounded-3xl"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              onClick={() => {
                onClickBtn(user, password);
              }}
            >
              <LucidePlay className="bg-blue-950 text-white size-24 rounded-[50%] p-4" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
