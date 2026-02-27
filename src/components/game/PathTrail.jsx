import { COUNTRY_NAMES_FA } from '../../data/borders.js'

export default function PathTrail({ userPath, targetCountry }) {
  return (
    <div className="w-full overflow-x-auto pb-1" dir="rtl">
      <div className="flex items-center gap-1.5 min-w-max px-1 py-1">
        {userPath.map((iso, i) => {
          const isStart = i === 0
          const isLast  = i === userPath.length - 1
          return (
            <span key={iso + i} className="flex items-center gap-1.5 path-item">
              <span className={`
                text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap
                ${isStart
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
                }
              `}>
                {COUNTRY_NAMES_FA[iso] || iso}
              </span>
              {!isLast && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-300 shrink-0 rotate-180">
                  <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
          )
        })}
        <span className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-slate-300 shrink-0 rotate-180">
            <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap bg-red-100 text-red-800 border border-red-200">
            {COUNTRY_NAMES_FA[targetCountry] || targetCountry}
          </span>
        </span>
      </div>
    </div>
  )
}