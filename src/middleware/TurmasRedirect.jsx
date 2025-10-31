
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";

export default function TurmasRedirect({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        async function verifyAluno() {
            const stored = JSON.parse(localStorage.getItem("user"));

            if (!stored || !stored.id) {
                navigate("/", { replace: true });
                return;
            }

            try {
                const response = await Api.refresh(stored.id);
                if (!isMounted) return;

                if (response.success) {
                    const aluno = response.data;
                    localStorage.setItem("user", JSON.stringify(aluno));

                    if (!aluno.turma) {
                        navigate("/turmas", { replace: true });
                    }
                } else {
                    navigate("/", { replace: true });
                }
            } catch (error) {
                console.error("Erro na verificação do aluno:", error);
                navigate("/", { replace: true });
            }
        }

        verifyAluno();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    return children;
}
