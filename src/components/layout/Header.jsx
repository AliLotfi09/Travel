export default function Header({ onNew, onRestart }) {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-30" dir="rtl">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">🌍</span>
          <span className="text-base font-bold text-slate-900 tracking-tight">
            اتصال کشورها
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onRestart}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl transition-colors hover:bg-slate-50 active:bg-slate-100"
          >
            شروع مجدد
          </button>
          <button
            onClick={onNew}
            className="text-xs font-semibold text-white bg-slate-900 px-3 py-2 rounded-xl transition-colors hover:bg-slate-700 active:bg-slate-800"
          >
            بازی جدید
          </button>
        </div>
      </div>
    </header>
  )
}