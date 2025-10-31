export default function FeedbackModal({ feedback, correta }) {
    if (!feedback) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
            <div
                className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl text-center transform transition-all duration-300 scale-100
          ${feedback.tipo === "correto"
                        ? "bg-gradient-to-br from-green-100 to-green-200 border-4 border-green-400"
                        : "bg-gradient-to-br from-red-100 to-red-200 border-4 border-red-400"}`}
            >
                <div className="text-7xl mb-4 animate-bounce">
                    {feedback.tipo === "correto" ? "🎉" : "😔"}
                </div>
                <h3
                    className={`text-2xl font-bold mb-2 ${feedback.tipo === "correto"
                        ? "text-green-800"
                        : "text-red-800"
                        }`}
                >
                    {feedback.texto}
                </h3>
                {feedback.tipo === "erro" && (
                    <p className="text-gray-700 mt-2">Resposta: {correta}</p>
                )}
            </div>
        </div>
    );
}
