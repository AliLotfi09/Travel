// components/game/StatsRow.jsx
export default function StatsRow({ userSteps, optimalSteps, hintsUsed }) {
  const extra = userSteps - optimalSteps;

  return (
    <div className="flex items-stretch" dir="rtl">

      <div className="flex-1 flex flex-col items-center justify-center py-3 px-2">
        <span className={`text-xl font-black tabular-nums ${extra > 0 ? 'text-orange-500' : 'text-slate-900'}`}>
          {userSteps}
        </span>
        <span className="text-[10px] text-slate-400 font-medium mt-0.5">گام‌های شما</span>
        {extra > 0 && (
          <span className="text-[9px] text-orange-400 font-bold">+{extra} اضافه</span>
        )}
        {extra === 0 && userSteps > 0 && (
          <span className="text-[9px] text-emerald-500 font-bold">بهینه</span>
        )}
      </div>

      <div className="w-px bg-slate-100 my-2.5" />

      <div className="flex-1 flex flex-col items-center justify-center py-3 px-2">
        <span className="text-xl font-black text-slate-400 tabular-nums">{optimalSteps}</span>
        <span className="text-[10px] text-slate-400 font-medium mt-0.5">مسیر بهینه</span>
      </div>

      <div className="w-px bg-slate-100 my-2.5" />

      <div className="flex-1 flex flex-col items-center justify-center py-3 px-2">
        <span className={`text-xl font-black tabular-nums ${hintsUsed > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
          {hintsUsed}<span className="text-sm font-medium text-slate-300">/۲</span>
        </span>
        <span className="text-[10px] text-slate-400 font-medium mt-0.5">راهنما</span>
        {hintsUsed === 0 && (
          <span className="text-[9px] text-emerald-500 font-bold">بدون راهنما</span>
        )}
      </div>

    </div>
  );
}