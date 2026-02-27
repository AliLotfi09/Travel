// components/game/HintControls.jsx
import { Lightbulb, Map, Check } from 'lucide-react'

export default function HintControls({ hintsUsed, onHint, isComplete }) {
  if (isComplete) return null;

  const h1 = hintsUsed >= 1;
  const h2 = hintsUsed >= 2;

  return (
    <div className="flex gap-2" dir="rtl">

      {/* Hint 1 */}
      <button
        onClick={onHint}
        disabled={h1}
        className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-all duration-200
          ${h1
            ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 active:scale-95'
          }`}>
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-none ${h1 ? 'bg-slate-100' : 'bg-amber-100'}`}>
          {h1 ? <Check size={13} className="text-slate-300" /> : <Lightbulb size={13} className="text-amber-600" />}
        </div>
        <div className="text-right leading-tight">
          <div className="font-bold">{h1 ? 'استفاده شد' : 'راهنما ۱'}</div>
          <div className={`text-[9px] font-medium ${h1 ? 'text-slate-300' : 'text-amber-400'}`}>
            {h1 ? 'گام بعدی نمایش داده شد' : 'گام بعدی — ۱۵٪ کسر'}
          </div>
        </div>
      </button>

      {/* Hint 2 */}
      <button
        onClick={onHint}
        disabled={!h1 || h2}
        className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border-2 text-xs font-bold transition-all duration-200
          ${h2
            ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            : !h1
            ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50'
            : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300 active:scale-95'
          }`}>
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-none ${h2 || !h1 ? 'bg-slate-100' : 'bg-blue-100'}`}>
          {h2 ? <Check size={13} className="text-slate-300" /> : <Map size={13} className={!h1 ? 'text-slate-300' : 'text-blue-600'} />}
        </div>
        <div className="text-right leading-tight">
          <div className="font-bold">{h2 ? 'استفاده شد' : 'راهنما ۲'}</div>
          <div className={`text-[9px] font-medium ${h2 || !h1 ? 'text-slate-300' : 'text-blue-400'}`}>
            {h2 ? 'نقشه کامل فعال شد' : 'نقشه کامل — ۱۵٪ کسر'}
          </div>
        </div>
      </button>

    </div>
  );
}