export default function AlternativesList({
    alternativas,
    escolha,
    onClick,
    mostrandoFeedback,
}) {
    return (
        <div className="px-4 space-y-3">
            {Object.entries(alternativas).map(([key, value]) => (
                <button
                    key={key}
                    onClick={() => onClick(key)}
                    disabled={mostrandoFeedback}
                    className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg text-left
            ${escolha == key
                            ? "bg-blue-100 border-blue-400 border-2 scale-95"
                            : "bg-white hover:bg-blue-50 border-2 border-transparent active:scale-95"}
            ${mostrandoFeedback ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    <span className="text-blue-950">{value}</span>
                </button>
            ))}
        </div>
    );
}
