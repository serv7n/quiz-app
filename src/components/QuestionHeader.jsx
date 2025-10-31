export default function QuestionHeader({ step, total, certas }) {
    return (
        <div className="bg-blue-950 px-4 py-4">
            <div className="flex justify-between items-center mb-3">
                <div className="text-white">
                    <span className="text-sm text-blue-200">Questão</span>
                    <div className="text-2xl font-bold">
                        {step}/{total}
                    </div>
                </div>
                <div className="text-white text-right">
                    <span className="text-sm text-blue-200">Acertos</span>
                    <div className="text-2xl font-bold">{certas}</div>
                </div>
            </div>

            <div className="bg-blue-800 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-blue-400 h-full transition-all duration-300"
                    style={{ width: `${(step / total) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}
