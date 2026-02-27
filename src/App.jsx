import { useState, useEffect } from "react";
import { ArrowLeft, History } from "lucide-react";
import { useGameLogic } from "./hooks/useGameLogic.js";
import Header from "./components/layout/Header.jsx";
import WorldMap from "./components/map/WorldMap.jsx";
import SearchBar from "./components/search/SearchBar.jsx";
import PathTrail from "./components/game/PathTrail.jsx";
import StatsRow from "./components/game/StatsRow.jsx";
import HintControls from "./components/game/HintControls.jsx";
import ResultModal from "./components/game/ResultModal.jsx";
import IntroScreen from "./components/game/IntroScreen.jsx";
import HistoryModal from "./components/game/HistoryModal.jsx";
import { COUNTRY_NAMES_FA } from "./data/borders.js";

export default function App() {
  const game = useGameLogic();
  const lastCountry = game.userPath[game.userPath.length - 1];

  // State
  const [showIntro, setShowIntro] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  // Load Intro & History Logic
  useEffect(() => {
    const seenIntro = localStorage.getItem('hasSeenIntro_v2'); // Changed key to force show new intro
    if (!seenIntro) setShowIntro(true);
    
    const savedHistory = localStorage.getItem('gameHistory');
    if (savedHistory) setGameHistory(JSON.parse(savedHistory));
  }, []);

  // Save History Logic
  useEffect(() => {
    if (game.isComplete && game.score !== null) {
      const newEntry = {
        date: new Date().toLocaleDateString('fa-IR'),
        start: game.startCountry,
        end: game.targetCountry,
        score: game.score,
        steps: game.userSteps
      };
      
      setGameHistory(prev => {
        if (prev.length > 0) {
            const last = prev[prev.length - 1];
            if (last.start === newEntry.start && last.end === newEntry.end && last.score === newEntry.score) return prev;
        }
        const updated = [...prev, newEntry];
        localStorage.setItem('gameHistory', JSON.stringify(updated));
        return updated;
      });
    }
  }, [game.isComplete, game.score]);

  const handleFinishIntro = () => {
    localStorage.setItem('hasSeenIntro_v2', 'true');
    setShowIntro(false);
  };

  if (showIntro) return <IntroScreen onFinish={handleFinishIntro} />;

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col font-sans" dir="rtl">
      
      {/* ── HEADER ── */}
      <Header onNew={game.newGame} onRestart={game.restart} />
      
      {/* دکمه تاریخچه به هدر اضافه شده یا جداگانه */}
      <div className="absolute top-3 left-3 md:hidden z-10">
           <button onClick={() => setShowHistory(true)} className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-slate-600">
               <History size={20} />
           </button>
      </div>

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-3 py-2 gap-2">
        
        {/* ── مبدا / مقصد ── */}
        <div className="bg-white border-0 shadow-sm rounded-2xl px-3 py-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-semibold text-center mb-1">مبدا</p>
              <div className="bg-green-50/50 rounded-xl px-2 py-2 text-center border border-green-100">
                <span className="text-xs sm:text-sm font-bold text-green-700 block truncate">
                  {COUNTRY_NAMES_FA[game.startCountry] || game.startCountry}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-0.5 mt-4 text-slate-300">
              <div className="w-4 h-px bg-slate-200" />
              <ArrowLeft size={14} strokeWidth={2.5} />
              <div className="w-4 h-px bg-slate-200" />
            </div>

            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-semibold text-center mb-1">مقصد</p>
              <div className="bg-red-50/50 rounded-xl px-2 py-2 text-center border border-red-100">
                <span className="text-xs sm:text-sm font-bold text-red-700 block truncate">
                  {COUNTRY_NAMES_FA[game.targetCountry] || game.targetCountry}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── نقشه (سایز و استایل قبلی) ── */}
        <div className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden relative w-full h-[45vh] min-h-[300px] max-h-[400px]">
          <WorldMap
            userPath={game.userPath}
            targetCountry={game.targetCountry}
            hintCountry={game.hintCountry}
            hintLevel={game.hintLevel}
          />
        </div>

        {/* ── آمار ── */}
        <div className="bg-white border-0 shadow-sm rounded-2xl mt-1">
          <StatsRow
            userSteps={game.userSteps}
            optimalSteps={game.optimalSteps}
            hintsUsed={game.hintsUsed}
          />
        </div>

        {/* ── مسیر طی شده ── */}
        {game.userPath.length > 1 && (
          <div className="bg-white border-0 shadow-sm rounded-2xl p-2.5 mt-1 animate-in fade-in slide-in-from-top-2">
            <PathTrail
              userPath={game.userPath}
              targetCountry={game.targetCountry}
            />
          </div>
        )}

        <div className="flex-1 min-h-[10px]" />

        {/* ── راهنمای تایپ (مهم: جابجا شده به بالا و بزرگتر شده) ── */}
        {!game.isComplete && (
          <div className="text-center animate-pulse">
            <p className="text-sm text-slate-500 mb-1">کشور هم‌مرز با:</p>
            <p className="text-lg font-black text-slate-800 bg-white inline-block px-4 py-1 rounded-lg shadow-sm border border-slate-100">
              {COUNTRY_NAMES_FA[lastCountry] || lastCountry}
            </p>
          </div>
        )}

        {/* ── دکمه‌های راهنما ── */}
        <HintControls
          hintsUsed={game.hintsUsed}
          onHint={game.useHint}
          isComplete={game.isComplete}
        />

        {/* ── جستجو ── */}
        <SearchBar
          onSelect={game.selectCountry}
          disabled={game.isComplete}
          userPath={game.userPath}
          errorMessage={game.errorMessage}
          onDismissError={game.dismissError}
        />
        
      </main>

      {/* مودال‌ها */}
      <HistoryModal 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        history={gameHistory} 
      />

      <ResultModal
        isComplete={game.isComplete}
        score={game.score}
        userSteps={game.userSteps}
        optimalSteps={game.optimalSteps}
        hintsUsed={game.hintsUsed}
        startCountry={game.startCountry}
        targetCountry={game.targetCountry}
        onRestart={game.restart}
        onNew={game.newGame}
      />
    </div>
  );
}