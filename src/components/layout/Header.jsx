// components/layout/Header.jsx
import { Globe, History, RotateCcw, Plus } from 'lucide-react'

export default function Header({ onNew, onRestart, onShowHistory }) {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-30" dir="rtl">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center">
            <Globe size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-tight">نقشه‌چین</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onShowHistory}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90">
            <History size={17} />
          </button>
          <button
            onClick={onRestart}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90">
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onNew}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 px-3 h-9 rounded-xl hover:bg-slate-700 active:scale-95 transition-all">
            <Plus size={14} />
            بازی جدید
          </button>
        </div>

      </div>
    </header>
  );
}