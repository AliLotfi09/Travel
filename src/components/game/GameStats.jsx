export default function GameStats({ userSteps, optimalSteps, hintsUsed }) {
  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Steps</span>
        <span className="text-lg font-semibold text-gray-900">{userSteps}</span>
      </div>
      <div className="w-px h-8 bg-gray-100" />
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Optimal</span>
        <span className="text-lg font-semibold text-gray-400">{optimalSteps}</span>
      </div>
      <div className="w-px h-8 bg-gray-100" />
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Hints</span>
        <span className="text-lg font-semibold text-gray-400">{hintsUsed}/2</span>
      </div>
    </div>
  )
}