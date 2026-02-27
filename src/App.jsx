import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useGameLogic } from "./hooks/useGameLogic.js";
import { useEitaaSDK } from "./hooks/useMiniApp.js";
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

  const [showIntro, setShowIntro] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  // ─── ref برای دسترسی در callback ایتا (بدون re-subscribe) ───
  const showHistoryRef = useRef(false);
  const isCompleteRef = useRef(false);
  const eitaaRef = useRef(null);

  useEffect(() => { showHistoryRef.current = showHistory; }, [showHistory]);
  useEffect(() => { isCompleteRef.current = game.isComplete; }, [game.isComplete]);

  // ─── Back Button: stack اولویت‌بندی شده ──────────────────
  // ۱. اگر History Modal باز → ببند
  // ۲. اگر بازی تمام شده → restart (برگشت به بازی)
  // ۳. در غیر این صورت → اپ را ببند
  const handleBack = useCallback(() => {
    if (showHistoryRef.current) {
      setShowHistory(false);
      return;
    }
    if (isCompleteRef.current) {
      game.restart();
      return;
    }
    eitaaRef.current?.close();
  }, [game.restart]);

  const eitaa = useEitaaSDK({ onBackButton: handleBack });
  eitaaRef.current = eitaa;

  // ─── Haptic feedback روی انتخاب کشور ───────────────────
  const handleSelectCountry = useCallback((iso) => {
    game.selectCountry(iso);
    eitaa.hapticSelection();
  }, [game.selectCountry, eitaa.hapticSelection]);

  // ─── Haptic روی خطا ─────────────────────────────────────
  useEffect(() => {
    if (game.errorMessage) {
      eitaa.hapticNotification('error');
    }
  }, [game.errorMessage]);

  // ─── Haptic و notification روی تکمیل مسیر ───────────────
  useEffect(() => {
    if (game.isComplete) {
      eitaa.hapticNotification('success');
    }
  }, [game.isComplete]);

  // ─── Load Intro & History ────────────────────────────────
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenIntro_v4');
    if (!seen) setShowIntro(true);
    try {
      const saved = localStorage.getItem('gameHistory');
      if (saved) setGameHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // ─── Save History ────────────────────────────────────────
  useEffect(() => {
    if (game.isComplete && game.score !== null) {
      const entry = {
        date: new Date().toLocaleDateString('fa-IR'),
        start: game.startCountry,
        end: game.targetCountry,
        score: game.score,
        steps: game.userSteps,
        optimalSteps: game.optimalSteps,
      };
      setGameHistory(prev => {
        const last = prev[prev.length - 1];
        if (last?.start === entry.start && last?.end === entry.end && last?.score === entry.score) return prev;
        const updated = [...prev, entry];
        localStorage.setItem('gameHistory', JSON.stringify(updated));
        return updated;
      });
    }
  }, [game.isComplete, game.score]);

  if (showIntro) {
    return (
      <IntroScreen onFinish={() => {
        localStorage.setItem('hasSeenIntro_v4', 'true');
        setShowIntro(false);
      }} />
    );
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col font-sans" dir="rtl">

      <Header
        onNew={game.newGame}
        onRestart={game.restart}
        onShowHistory={() => setShowHistory(true)}
      />

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-3 py-3 gap-2.5">

        {/* Origin / Destination */}
        <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-bold text-center mb-1.5 uppercase tracking-wider">مبدا</p>
              <div className="bg-emerald-50 rounded-xl px-2 py-2 text-center border border-emerald-100">
                <span className="text-xs sm:text-sm font-black text-emerald-700 block truncate">
                  {COUNTRY_NAMES_FA[game.startCountry] || game.startCountry}
                </span>
              </div>
            </div>

            <div className="shrink-0 mt-4">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                <ArrowLeft size={13} className="text-slate-400" strokeWidth={2.5} />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-bold text-center mb-1.5 uppercase tracking-wider">مقصد</p>
              <div className="bg-red-50 rounded-xl px-2 py-2 text-center border border-red-100">
                <span className="text-xs sm:text-sm font-black text-red-700 block truncate">
                  {COUNTRY_NAMES_FA[game.targetCountry] || game.targetCountry}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white shadow-sm rounded-2xl overflow-hidden w-full h-[42vh] min-h-[260px] max-h-[380px]">
          <WorldMap
            userPath={game.userPath}
            targetCountry={game.targetCountry}
            hintCountry={game.hintCountry}
            hintLevel={game.hintLevel}
          />
        </div>

        {/* Stats */}
        <div className="bg-white shadow-sm rounded-2xl overflow-hidden">
          <StatsRow
            userSteps={game.userSteps}
            optimalSteps={game.optimalSteps}
            hintsUsed={game.hintsUsed}
          />
        </div>

        {/* Path */}
        {game.userPath.length > 1 && (
          <div className="bg-white shadow-sm rounded-2xl p-2.5 overflow-hidden">
            <PathTrail userPath={game.userPath} targetCountry={game.targetCountry} />
          </div>
        )}

        <div className="flex-1 min-h-[8px]" />

        {/* Current country prompt */}
        {!game.isComplete && (
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1.5 font-medium">کشور هم‌مرز با:</p>
            <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-slate-100 rounded-2xl px-4 py-2">
              <span className="text-sm font-black text-slate-900">
                {COUNTRY_NAMES_FA[lastCountry] || lastCountry}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        )}

        {/* Hints */}
        <HintControls
          hintsUsed={game.hintsUsed}
          onHint={game.useHint}
          isComplete={game.isComplete}
        />

        {/* Search */}
        <SearchBar
          onSelect={handleSelectCountry}
          disabled={game.isComplete}
          userPath={game.userPath}
          errorMessage={game.errorMessage}
          onDismissError={game.dismissError}
        />

      </main>

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