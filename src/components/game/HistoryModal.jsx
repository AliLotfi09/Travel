// components/game/HistoryModal.jsx
import { X, Trophy, Calendar } from 'lucide-react';
import { COUNTRY_NAMES_FA } from '../../data/borders';

export default function HistoryModal({ isOpen, onClose, history }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[80vh]">
        
        {/* هدر مودال */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-500" size={20} />
            <h2 className="text-lg font-bold text-slate-800">تاریخچه بازی‌ها</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* لیست نتایج */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p>هنوز بازی‌ای انجام نداده‌اید!</p>
            </div>
          ) : (
            history.slice().reverse().map((game, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-xs font-bold gap-2">
                    <span className="text-green-700">{COUNTRY_NAMES_FA[game.start] || game.start}</span>
                    <span className="text-slate-300">←</span>
                    <span className="text-red-700">{COUNTRY_NAMES_FA[game.end] || game.end}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar size={10} />
                    <span>{game.date}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="text-sm font-black text-slate-800">{game.score}</span>
                  <span className="text-[10px] text-slate-500">امتیاز</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}