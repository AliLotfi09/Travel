import { Lightbulb, Map, Check } from 'lucide-react'

export default function HintControls({ hintsUsed, onHint, isComplete }) {
  if (isComplete) return null

  const h1 = hintsUsed >= 1
  const h2 = hintsUsed >= 2

  return (
    <div className="flex gap-2" dir="rtl">
      {/* راهنما ۱ */}
      <button
        onClick={onHint}
        disabled={h1}
        className={`
          flex-1 flex items-center justify-center gap-2
          text-xs font-semibold px-3 py-2.5 rounded-xl border
          transition-all duration-150
          ${h1
            ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 active:scale-95'
          }
        `}
      >
        {h1
          ? <Check size={14} className="shrink-0" />
          : <Lightbulb size={14} className="shrink-0" />
        }
        <span>{h1 ? 'گام بعدی نمایش داده شد' : 'راهنما — گام بعدی'}</span>
      </button>

      {/* راهنما ۲ */}
      <button
        onClick={onHint}
        disabled={!h1 || h2}
        className={`
          flex-1 flex items-center justify-center gap-2
          text-xs font-semibold px-3 py-2.5 rounded-xl border
          transition-all duration-150
          ${h2 || !h1
            ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 active:scale-95'
          }
        `}
      >
        {h2
          ? <Check size={14} className="shrink-0" />
          : <Map size={14} className="shrink-0" />
        }
        <span>{h2 ? 'نقشه کامل فعال شد' : 'راهنما — نقشه کامل'}</span>
      </button>
    </div>
  )
}