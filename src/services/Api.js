import axios from "axios";

class Api {
  constructor() {
    this.client = axios.create({
      baseURL: "http://127.0.0.1:8000/api",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
  }

  async api() {
    try {
      const response = await this.client.get("/status");
      return response.data;
    } catch (error) {
      console.error("Espere um momento e tente novamente", error);
      throw error;
    }
  }

  async login(user, senha) {
    try {

      const response = await this.client.post("/aluno/login", {
        user: user,
        senha: senha
      })
      return response.data
    } catch (error) {
      console.log("erro");
      throw error
    }
  }

  async refresh(id) {
    try {
      const response = await this.client.post("/aluno/refresh", { id });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar dados do aluno:", error);
      throw error;
    }
  }
  async turmas() {
    try {
      const response = await this.client.get("/turma");
      return response.data.data; // já retorna apenas a lista de turmas
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      throw error;
    }
  }



}


export default new Api();
