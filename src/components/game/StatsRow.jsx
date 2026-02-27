export default function StatsRow({ userSteps, optimalSteps, hintsUsed }) {
  return (
    <div className="flex items-center justify-center gap-0" dir="rtl">
      <div className="flex flex-col items-center px-5 py-2">
        <span className="text-lg font-bold text-slate-900">{userSteps}</span>
        <span className="text-xs text-slate-400 font-medium mt-0.5">گام‌های شما</span>
      </div>
      <div className="w-px h-8 bg-slate-100" />
      <div className="flex flex-col items-center px-5 py-2">
        <span className="text-lg font-bold text-slate-400">{optimalSteps}</span>
        <span className="text-xs text-slate-400 font-medium mt-0.5">بهترین مسیر</span>
      </div>
      <div className="w-px h-8 bg-slate-100" />
      <div className="flex flex-col items-center px-5 py-2">
        <span className="text-lg font-bold text-slate-400">{hintsUsed}/۲</span>
        <span className="text-xs text-slate-400 font-medium mt-0.5">راهنما</span>
      </div>
    </div>
  )
}