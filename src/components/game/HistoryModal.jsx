// components/game/HistoryModal.jsx
import { X, Trophy, Calendar, TrendingUp, Award } from 'lucide-react';
import { COUNTRY_NAMES_FA } from '../../data/borders';

export default function HistoryModal({ isOpen, onClose, history }) {
  if (!isOpen) return null;

  const total = history.length;
  const best = total > 0 ? Math.max(...history.map(g => g.score)) : 0;
  const avg = total > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / total) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
        dir="rtl">

        {/* Handle */}
        <div className="w-8 h-1 bg-slate-200 rounded-full mx-auto mt-3 sm:hidden flex-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3.5 border-b border-slate-100 flex-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
              <Trophy size={15} className="text-slate-600" />
            </div>
            <h2 className="text-sm font-black text-slate-900">تاریخچه بازی‌ها</h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors">
            <X size={16} className="text-slate-400" />
          </button>
        </div>

        {/* Summary stats */}
        {total > 0 && (
          <div className="grid grid-cols-3 gap-2 px-4 py-3 border-b border-slate-100 flex-none">
            {[
              { label: 'بازی‌ها', value: total, Icon: TrendingUp },
              { label: 'بهترین', value: best, Icon: Award },
              { label: 'میانگین', value: avg, Icon: Trophy },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1 bg-slate-50 rounded-xl py-2.5">
                <Icon size={13} className="text-slate-400" />
                <span className="text-base font-black text-slate-800 tabular-nums">{value}</span>
                <span className="text-[9px] text-slate-400 font-medium">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {total === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                <Trophy size={20} className="text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-500">هنوز بازی‌ای انجام نداده‌اید</p>
                <p className="text-xs text-slate-400 mt-0.5">بعد از اولین بازی اینجا می‌بینید</p>
              </div>
            </div>
          ) : (
            [...history].reverse().map((game, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-3.5 py-3 hover:bg-slate-100 transition-colors">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg">
                      {COUNTRY_NAMES_FA[game.start] || game.start}
                    </span>
                    <X size={10} className="text-slate-300 rotate-45" style={{ transform: 'rotate(45deg)' }} />
                    <span className="text-xs font-black text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded-lg">
                      {COUNTRY_NAMES_FA[game.end] || game.end}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Calendar size={10} />
                    <span>{game.date}</span>
                    {game.steps != null && <><span>·</span><span>{game.steps} گام</span></>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 tabular-nums">{game.score}</div>
                  <div className="text-[10px] text-slate-400">امتیاز</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}