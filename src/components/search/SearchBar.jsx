import { useState, useRef, useCallback, useEffect } from "react";
import {
  COUNTRY_NAMES_FA,
  COUNTRY_NAMES_EN,
  BORDERS,
} from "../../data/borders.js"; // ✅ BORDERS اضافه شد
import SuggestionList from "./SuggestionList.jsx";

const ALL = Object.keys(BORDERS)
  .filter(
    (iso) => BORDERS[iso] && BORDERS[iso].length > 0 && COUNTRY_NAMES_FA[iso],
  )
  .map((iso) => ({
    iso,
    nameFa: COUNTRY_NAMES_FA[iso],
    nameEn: (COUNTRY_NAMES_EN[iso] || "").toLowerCase(),
  }))
  .sort((a, b) => a.nameFa.localeCompare(b.nameFa, "fa"));

function search(q, usedPath) {
  if (!q.trim()) return [];
  const lower = q.toLowerCase();
  return ALL.filter(
    (c) =>
      !usedPath.includes(c.iso) &&
      (c.nameFa.includes(q) || c.nameEn.includes(lower)),
  ).slice(0, 10);
}

export default function SearchBar({
  onSelect,
  disabled,
  userPath,
  errorMessage,
  onDismissError,
}) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handle = useCallback(
    (iso) => {
      onSelect(iso);
      setQuery("");
      setItems([]);
      setActiveIdx(-1);
      inputRef.current?.focus();
    },
    [onSelect],
  );

  const onChange = useCallback(
    (e) => {
      const v = e.target.value;
      setQuery(v);
      setActiveIdx(-1);
      setItems(search(v, userPath));
      if (errorMessage) onDismissError();
    },
    [userPath, errorMessage, onDismissError],
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIdx >= 0 && items[activeIdx]) handle(items[activeIdx].iso);
        else if (items.length === 1) handle(items[0].iso);
      } else if (e.key === "Escape") {
        setItems([]);
        setActiveIdx(-1);
      }
    },
    [items, activeIdx, handle],
  );

  useEffect(() => {
    if (!errorMessage) return;
    const t = setTimeout(onDismissError, 3500);
    return () => clearTimeout(t);
  }, [errorMessage, onDismissError]);

  return (
    <div className="w-full relative" dir="rtl">
      {errorMessage && (
        <div className="mb-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl fade-in">
          <p className="text-xs text-red-600 font-semibold text-right">
            {errorMessage}
          </p>
        </div>
      )}
      <div className="relative">
        <SuggestionList
          items={items}
          activeIndex={activeIdx}
          onSelect={handle}
        />
        <div
          className={`
          flex items-center gap-3 border-2 rounded-2xl px-4 py-3.5 bg-white
          transition-all duration-150
          ${focused ? "border-slate-900 shadow-sm" : "border-slate-200"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setTimeout(() => setItems([]), 200);
            }}
            disabled={disabled}
            placeholder="نام کشور را بنویسید..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent text-right font-medium"
            style={{ direction: "rtl" }}
          />
          {query ? (
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery("");
                setItems([]);
              }}
              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-slate-400 shrink-0"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10.5 10.5L14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
