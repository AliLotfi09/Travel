// components/game/IntroScreen.jsx
import { useState } from 'react';
import { Globe, ArrowLeft, Lightbulb, Map, Trophy, ChevronLeft, ChevronRight, X } from 'lucide-react';

function GoalVisual() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-16 h-10 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <span className="text-xs font-black text-emerald-700">ایران</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">مبدا</span>
      </div>
      <div className="flex items-center gap-1 mt-[-10px]">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        <ArrowLeft size={14} className="text-slate-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-16 h-10 rounded-xl bg-red-50 border-2 border-red-200 flex items-center justify-center">
          <span className="text-xs font-black text-red-700">فرانسه</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">مقصد</span>
      </div>
    </div>
  );
}

function BorderVisual() {
  return (
    <div className="flex flex-col items-center gap-2.5 py-2">
      <div className="w-16 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-600">ایران</span>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-9 rounded-xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center">
            <span className="text-xs font-bold text-emerald-700">ترکیه</span>
          </div>
          <span className="text-[9px] text-emerald-500 font-bold">همسایه</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-35">
          <div className="w-16 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-400">ژاپن</span>
          </div>
          <span className="text-[9px] text-slate-400 font-bold">مرز ندارد</span>
        </div>
      </div>
    </div>
  );
}

function HintVisual() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[190px] mx-auto py-2">
      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <div className="flex items-center gap-2">
          <Lightbulb size={12} className="text-amber-600" />
          <span className="text-xs font-bold text-amber-700">راهنما اول</span>
        </div>
        <span className="text-[10px] text-amber-500 font-semibold">گام بعدی</span>
      </div>
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
        <div className="flex items-center gap-2">
          <Map size={12} className="text-blue-600" />
          <span className="text-xs font-bold text-blue-700">راهنما دوم</span>
        </div>
        <span className="text-[10px] text-blue-500 font-semibold">نقشه کامل</span>
      </div>
      <p className="text-center text-[10px] text-slate-400 mt-0.5">هر راهنما ۱۵٪ از امتیاز کسر می‌کند</p>
    </div>
  );
}

function ScoreVisual() {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[190px] mx-auto py-2">
      {[
        { label: 'امتیاز پایه', val: '+۱۰۰۰', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
        { label: 'مسیر بهینه', val: '+۵۰۰', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
        { label: 'هر گام اضافه', val: '−۳۰', color: 'text-orange-500', bg: 'bg-orange-50 border-orange-100' },
        { label: 'هر راهنما', val: '−۱۵٪', color: 'text-red-500', bg: 'bg-red-50 border-red-100' },
      ].map((r, i) => (
        <div key={i} className={`flex items-center justify-between px-3 py-1.5 rounded-xl border ${r.bg}`}>
          <span className="text-[11px] text-slate-500">{r.label}</span>
          <span className={`text-xs font-black ${r.color}`}>{r.val}</span>
        </div>
      ))}
    </div>
  );
}

const SLIDES = [
  { icon: Globe, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', title: 'هدف بازی', desc: 'از کشور مبدا به کشور مقصد برسید — فقط از طریق مرزهای مشترک!', Visual: GoalVisual },
  { icon: Map, iconColor: 'text-blue-600', iconBg: 'bg-blue-50', title: 'قانون مرز', desc: 'فقط می‌توانید کشورهایی را انتخاب کنید که با کشور فعلی شما مرز مشترک دارند.', Visual: BorderVisual },
  { icon: Lightbulb, iconColor: 'text-amber-600', iconBg: 'bg-amber-50', title: 'راهنماها', desc: 'دو راهنما دارید. راهنما اول گام بعدی را نشان می‌دهد، راهنما دوم نقشه کامل را فعال می‌کند.', Visual: HintVisual },
  { icon: Trophy, iconColor: 'text-violet-600', iconBg: 'bg-violet-50', title: 'امتیازدهی', desc: 'مسیر کوتاه‌تر و بدون راهنما امتیاز بیشتری دارد. مسیر بهینه بونوس ویژه می‌گیرد.', Visual: ScoreVisual },
];

export default function IntroScreen({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const SlideIcon = slide.icon;
  const { Visual } = slide;
  const isLast = current === SLIDES.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6" dir="rtl">

      {/* Skip */}
      <button onClick={onFinish}
        className="absolute top-5 left-5 p-2 rounded-xl hover:bg-slate-100 transition-colors">
        <X size={18} className="text-slate-400" />
      </button>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-10">
        {SLIDES.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-slate-900' : 'w-1.5 bg-slate-200'}`} />
        ))}
      </div>

      {/* Content */}
      <div className="w-full max-w-xs flex flex-col items-center text-center">

        <div className={`w-12 h-12 rounded-2xl ${slide.iconBg} flex items-center justify-center mb-5`}>
          <SlideIcon size={22} className={slide.iconColor} />
        </div>

        <h2 className="text-xl font-black text-slate-900 mb-2">{slide.title}</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">{slide.desc}</p>

        <div className="w-full bg-slate-50 rounded-2xl border border-slate-100 mb-8 min-h-[110px] flex items-center justify-center px-4">
          <Visual />
        </div>

        <div className="flex items-center gap-2.5 w-full">
          {current > 0 ? (
            <button onClick={() => setCurrent(c => c - 1)}
              className="w-11 h-11 rounded-xl border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all">
              <ChevronRight size={18} className="text-slate-500" />
            </button>
          ) : <div className="" />}

          <button onClick={() => isLast ? onFinish() : setCurrent(c => c + 1)}
            className="flex-1 h-11 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-1.5">
            {isLast ? 'شروع بازی' : 'بعدی'}
            {!isLast && <ChevronLeft size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}