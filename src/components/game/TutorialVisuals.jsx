// components/game/TutorialVisuals.jsx
import { MapPin, ArrowLeft, CheckCircle2, XCircle, Lightbulb, Award, Sparkles } from "lucide-react";

export const StepGoal = () => (
  <div className="flex items-center justify-center gap-4 py-8 animate-in zoom-in duration-500">
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center border-4 border-green-50 shadow-sm">
        <MapPin size={24} fill="currentColor" />
      </div>
      <span className="text-xs font-bold text-slate-500">مبدا (ایران)</span>
    </div>
    
    <div className="flex-1 h-1 bg-slate-100 rounded-full relative mx-2">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 rounded-full animate-ping" />
      <ArrowLeft className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300" size={16} />
    </div>

    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center border-4 border-red-50 shadow-sm">
        <MapPin size={24} fill="currentColor" />
      </div>
      <span className="text-xs font-bold text-slate-500">مقصد (فرانسه)</span>
    </div>
  </div>
);

export const StepNeighbor = () => (
  <div className="flex flex-col items-center justify-center py-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-2">
      <div className="bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm text-sm font-bold text-slate-700">
        ایران
      </div>
      <div className="w-4 h-0.5 bg-slate-300"></div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <div className="bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg text-xs font-bold text-green-700 flex items-center gap-2">
                ترکیه <CheckCircle2 size={14} />
            </div>
            <span className="text-[10px] text-green-600">✓ همسایه</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
            <div className="bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 flex items-center gap-2">
                ژاپن <XCircle size={14} />
            </div>
            <span className="text-[10px] text-red-600">✗ مرز ندارد</span>
        </div>
      </div>
    </div>
  </div>
);

export const StepPath = () => (
  <div className="flex flex-col items-center justify-center py-6 gap-2 animate-in fade-in duration-700">
    <div className="flex items-center gap-1 text-xs font-bold text-slate-400 mb-2">
        مسیر شما:
    </div>
    <div className="flex flex-wrap items-center justify-center gap-2 max-w-[220px]">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs">ایران</span>
        <ArrowLeft size={12} className="text-slate-300" />
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs border-2 border-blue-500 shadow-lg shadow-blue-200 scale-110">ترکیه</span>
        <ArrowLeft size={12} className="text-slate-300" />
        <span className="bg-slate-100 text-slate-400 px-2 py-1 rounded-md text-xs">...</span>
        <ArrowLeft size={12} className="text-slate-300" />
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs">فرانسه</span>
    </div>
  </div>
);

export const StepHints = () => (
  <div className="flex flex-col items-center justify-center py-4 gap-3 animate-in slide-in-from-right-4 duration-500">
    <div className="text-center mb-2">
      <Lightbulb className="inline-block text-amber-500 mb-1" size={28} />
      <p className="text-xs text-slate-500 font-semibold">سه نوع راهنما</p>
    </div>
    
    <div className="flex flex-col gap-2 w-full max-w-[240px]">
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-bold text-blue-700">همسایه‌ها</span>
        <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-black">-50</span>
      </div>
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-bold text-purple-700">جهت حرکت</span>
        <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-black">-100</span>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-bold text-red-700">بهترین انتخاب</span>
        <span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded-full font-black">-150</span>
      </div>
    </div>
  </div>
);

export const StepScoring = () => (
  <div className="flex flex-col items-center justify-center py-4 gap-3 animate-in zoom-in duration-500">
    <div className="text-center mb-1">
      <Award className="inline-block text-yellow-500 mb-1" size={32} />
      <p className="text-xs text-slate-500 font-semibold">نحوه امتیازدهی</p>
    </div>
    
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-3 w-full max-w-[240px] shadow-sm">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-yellow-200">
        <span className="text-xs text-slate-600">امتیاز پایه</span>
        <span className="text-sm font-black text-green-600">+1000</span>
      </div>
      
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-yellow-200">
        <span className="text-xs text-slate-600">بونوس مسیر بهینه</span>
        <span className="text-sm font-black text-blue-600">+500</span>
      </div>
      
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-yellow-200">
        <span className="text-xs text-slate-600">هر قدم اضافی</span>
        <span className="text-sm font-black text-orange-600">-30</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-600">استفاده از راهنما</span>
        <span className="text-sm font-black text-red-600">-50 تا -150</span>
      </div>
    </div>
    
    <div className="flex items-center gap-1 mt-2">
      <Sparkles size={14} className="text-yellow-500" />
      <p className="text-[10px] text-slate-500">امتیاز بالا = مسیر کوتاه + بدون راهنما</p>
    </div>
  </div>
);