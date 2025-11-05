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

  async loginAdmin(email, senha) {
    try {
      const response = await this.client.post("/admin/login", {
        email,
        senha,
      });

      // Retorno padronizado baseado no seu controlador Laravel
      return {
        success: response.data?.status_code === 200,
        message: response.data?.messege || response.data?.message,
        data: response.data?.data?.admin || response.data?.admin || null,
      };
    } catch (error) {
      console.error("Erro ao fazer login do admin:", error);
      if (error.response?.data) {
        return {
          success: false,
          message:
            error.response.data?.messege ||
            error.response.data?.message ||
            "Erro desconhecido.",
        };
      }
      return {
        success: false,
        message: "Erro de conexão com o servidor.",
      };
    }
  }

  // ✅ Busca lista de turmas
  async getTurmas() {
    try {
      const response = await this.client.get("/turma");

      return {
        status_code: response.data?.status_code ?? 200,
        messege: response.data?.messege ?? "success",
        data: response.data?.data ?? [],
      };
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      return {
        status_code: error.response?.status ?? 500,
        messege: "Erro ao buscar turmas. Verifique sua conexão.",
        data: [],
      };
    }
  }

  async alterarComecou(turmaId, value) {
    try {
      const response = await this.client.get(`/turma/${turmaId}/comecou/${value}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao alterar campo 'comecou':", error);
      return { success: false, message: "Falha ao atualizar turma." };
    }
  }

  // ✅ Rota POST /turma/reset-pontuacao
  async resetPontuacao(turmaId) {
    try {
      const response = await this.client.post("/turma/reset-pontuacao", {
        turma_id: turmaId,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao resetar pontuação:", error);
      return { success: false, message: "Falha ao resetar pontuação." };
    }
  }
}


export default new Api();
