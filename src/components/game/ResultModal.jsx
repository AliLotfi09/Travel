// components/game/ResultModal.jsx
import { useEffect, useState } from 'react'
import { Trophy, Star, RotateCcw, Sparkles, Minus, Plus, Lightbulb } from 'lucide-react'
import { COUNTRY_NAMES_FA } from '../../data/borders.js'

function CountUp({ target, duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!target) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <>{val}</>;
}

function ScoreLabel({ score }) {
  if (score >= 900) return <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">عالی</span>;
  if (score >= 700) return <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">خوب</span>;
  if (score >= 400) return <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">قابل قبول</span>;
  return <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">تلاش کن</span>;
}

export default function ResultModal({
  isComplete, score, userSteps, optimalSteps,
  hintsUsed, startCountry, targetCountry,
  onRestart, onNew
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isComplete]);

  if (!isComplete) return null;

  const isOptimal = userSteps === optimalSteps && hintsUsed === 0;

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${visible ? 'bg-slate-900/40 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}>
      <div
        dir="rtl"
        className={`bg-white w-full sm:max-w-sm overflow-hidden transition-all duration-400 ease-out rounded-t-3xl sm:rounded-3xl shadow-2xl
          ${visible ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-8 opacity-0 sm:scale-95'}`}
      >
        {/* Mobile drag handle */}
        <div className="w-8 h-1 bg-slate-200 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Top section */}
        <div className="px-6 pt-5 pb-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isOptimal ? 'bg-yellow-100' : 'bg-slate-100'}`}>
                {isOptimal
                  ? <Star size={18} className="text-yellow-600" fill="currentColor" />
                  : <Trophy size={18} className="text-slate-600" />
                }
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">مسیر کامل شد</p>
                <p className="text-[11px] text-slate-400">
                  {COUNTRY_NAMES_FA[startCountry]} ← {COUNTRY_NAMES_FA[targetCountry]}
                </p>
              </div>
            </div>
            <ScoreLabel score={score} />
          </div>

          {/* Big score */}
          <div className="bg-slate-900 rounded-2xl py-4 text-center">
            <p className="text-xs text-slate-400 mb-1 font-medium">امتیاز</p>
            <div className="text-4xl font-black text-white tabular-nums tracking-tight">
              <CountUp target={score} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center bg-slate-50 rounded-xl py-2.5">
              <div className="text-lg font-black text-slate-800 tabular-nums">{userSteps}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">گام‌های شما</div>
            </div>
            <div className="text-center bg-slate-50 rounded-xl py-2.5">
              <div className="text-lg font-black text-slate-400 tabular-nums">{optimalSteps}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">مسیر بهینه</div>
            </div>
            <div className="text-center bg-slate-50 rounded-xl py-2.5">
              <div className={`text-lg font-black tabular-nums ${hintsUsed > 0 ? 'text-amber-500' : 'text-slate-400'}`}>{hintsUsed}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">راهنما</div>
            </div>
          </div>

          {isOptimal && (
            <div className="mt-2 flex items-center justify-center gap-1.5 bg-yellow-50 border border-yellow-100 rounded-xl py-2">
              <Star size={13} className="text-yellow-500" fill="currentColor" />
              <span className="text-xs font-bold text-yellow-700">مسیر بهینه — بونوس ۵۰۰ امتیاز</span>
            </div>
          )}
          {hintsUsed > 0 && (
            <div className="mt-2 flex items-center justify-center gap-1.5 bg-amber-50 border border-amber-100 rounded-xl py-2">
              <Lightbulb size={13} className="text-amber-500" />
              <span className="text-xs font-medium text-amber-700">
                {hintsUsed} راهنما — {hintsUsed * 15}٪ کسر امتیاز
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex gap-2.5">
          <button onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 active:scale-95 transition-all">
            <RotateCcw size={15} />
            دوباره
          </button>
          <button onClick={onNew}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-700 active:scale-95 transition-all">
            بازی جدید
            <Sparkles size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}