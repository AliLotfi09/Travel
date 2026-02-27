import { COUNTRY_NAMES_FA } from '../../data/borders.js'

export default function ResultModal({
  isComplete, score, userSteps, optimalSteps,
  hintsUsed, startCountry, targetCountry,
  onRestart, onNew
}) {
  if (!isComplete) return null
  const isOptimal = userSteps === optimalSteps

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6 pb-8 sm:pb-6 modal-in" dir="rtl">

        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5 sm:hidden" />

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">
            {isOptimal ? '🏆' : score > 700 ? '🎉' : score > 400 ? '👍' : '✅'}
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">مسیر کامل شد!</h2>
          <p className="text-sm text-slate-500">
            از <span className="font-semibold text-green-700">{COUNTRY_NAMES_FA[startCountry]}</span>
            {' '}تا{' '}
            <span className="font-semibold text-red-700">{COUNTRY_NAMES_FA[targetCountry]}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: 'امتیاز', value: score, highlight: true },
            { label: 'گام‌های شما', value: userSteps, highlight: false },
            { label: 'بهترین مسیر', value: optimalSteps, highlight: false },
          ].map(item => (
            <div key={item.label} className={`
              text-center p-3 rounded-2xl
              ${item.highlight ? 'bg-slate-900' : 'bg-slate-50'}
            `}>
              <div className={`text-xs font-medium mb-1 ${item.highlight ? 'text-slate-400' : 'text-slate-400'}`}>
                {item.label}
              </div>
              <div className={`text-2xl font-bold ${item.highlight ? 'text-white' : 'text-slate-700'}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {isOptimal && (
          <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-center">
            <span className="text-xs font-bold text-green-700">✨ مسیر بهینه! آفرین</span>
          </div>
        )}

        {hintsUsed > 0 && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-center">
            <span className="text-xs font-semibold text-amber-700">
              {hintsUsed} راهنما استفاده شد — {hintsUsed * 15}٪ کسر امتیاز
            </span>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-3 text-sm font-bold text-slate-700 border-2 border-slate-200 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            دوباره تلاش
          </button>
          <button
            onClick={onNew}
            className="flex-1 py-3 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-700 active:bg-slate-800 transition-colors"
          >
            بازی جدید
          </button>
        </div>
      </div>
    </div>
  )
}