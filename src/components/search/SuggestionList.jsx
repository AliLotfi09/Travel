export default function SuggestionList({ items, activeIndex, onSelect }) {
  if (!items.length) return null

  return (
    <div className="absolute bottom-full right-0 left-0 mb-2 bg-white border border-slate-200 rounded-2xl overflow-hidden z-50 slide-up shadow-lg max-h-56 overflow-y-auto">
      {items.map((item, i) => (
        <button
          key={item.iso}
          onMouseDown={e => { e.preventDefault(); onSelect(item.iso) }}
          onTouchStart={e => { e.preventDefault(); onSelect(item.iso) }}
          className={`
            w-full text-right px-4 py-3 text-sm flex items-center justify-between gap-3
            transition-colors border-b border-slate-50 last:border-0
            ${i === activeIndex
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
            }
          `}
        >
          <span className={`text-xs font-mono ${i === activeIndex ? 'text-slate-300' : 'text-slate-400'}`}>
            {item.iso}
          </span>
          <span className="font-medium">{item.nameFa}</span>
        </button>
      ))}
    </div>
  )
}