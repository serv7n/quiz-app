export default function TimerBar({ tempo, total }) {
  return (
    <div className="mx-4 mt-4 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-950 text-white text-center py-3 relative">
        <span className="font-bold text-lg">⏱️ Tempo: {tempo}s</span>
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-400 transition-all duration-1000"
          style={{ width: `${(tempo / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
