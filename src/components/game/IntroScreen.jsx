// components/game/IntroScreen.jsx
import { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { StepGoal, StepNeighbor, StepPath, StepHints, StepScoring } from './TutorialVisuals';

const SLIDES = [
  {
    title: "🎯 هدف بازی چیه؟",
    desc: "از یک کشور مبدا به کشور مقصد برسید. ساده است!",
    visual: <StepGoal />
  },
  {
    title: "🗺️ چطور حرکت کنم؟",
    desc: "فقط می‌تونید کشورهایی را انتخاب کنید که با کشور فعلی مرز مشترک دارند.",
    visual: <StepNeighbor />
  },
  {
    title: "🛤️ مسیر بسازید",
    desc: "با انتخاب کشورهای همسایه، یک زنجیره تا مقصد بسازید.",
    visual: <StepPath />
  },
  {
    title: "💡 راهنماها",
    desc: "سه نوع راهنما دارید، ولی مراقب باشید! هر کدوم امتیاز کم می‌کنه.",
    visual: <StepHints />
  },
  {
    title: "🏆 سیستم امتیازدهی",
    desc: "هرچه مسیر کوتاه‌تر و بدون راهنما، امتیاز بیشتر!",
    visual: <StepScoring />
  }
];

export default function IntroScreen({ onFinish }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < SLIDES.length - 1) setCurrent(c => c + 1);
    else onFinish();
  };

  const skip = () => onFinish();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative">
        
        {/* دکمه رد شدن */}
        <div className="absolute top-4 left-4 z-20">
          <button 
            onClick={skip}
            className="text-xs text-slate-400 hover:text-slate-600 bg-white/80 px-3 py-1.5 rounded-full shadow-sm backdrop-blur transition-all"
          >
            رد کردن ←
          </button>
        </div>

        {/* بخش تصویری */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 h-52 flex items-center justify-center border-b border-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="relative z-10 w-full px-4">
            {SLIDES[current].visual}
          </div>
        </div>

        {/* محتوای متنی */}
        <div className="p-6 flex-1 flex flex-col text-center">
          <h2 className="text-xl font-black text-slate-800 mb-2">
            {SLIDES[current].title}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            {SLIDES[current].desc}
          </p>

          <div className="mt-auto space-y-3">
            <button
              onClick={next}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              {current === SLIDES.length - 1 ? (
                <>بزن بریم! <Check size={20} /></>
              ) : (
                <>بعدی <ChevronLeft size={20} /></>
              )}
            </button>
            
            {/* نقطه‌های پیشرفت */}
            <div className="flex justify-center gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current 
                      ? 'w-6 bg-blue-600' 
                      : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}