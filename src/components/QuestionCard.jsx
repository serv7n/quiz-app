export default function QuestionCard({ title }) {
    return (
        <div className="px-4 py-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-blue-950 text-center leading-relaxed">
                    {title}
                </h2>
            </div>
        </div>
    );
}
