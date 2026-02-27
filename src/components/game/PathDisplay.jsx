import React from 'react'
import { getPersianName } from '../../data/countriesFa'

const PathDisplay = ({ path }) => {
  if (!path || path.length <= 1) return null

  return (
    <div className="w-full px-4 md:px-8 py-2">
      <div className="bg-blue-50 rounded-xl p-4 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">🛤️</span>
          <span className="text-sm text-blue-600 font-medium">مسیر طی شده:</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {path.map((code, index) => (
            <React.Fragment key={code}>
              <span
                className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all slide-up
                  ${index === 0 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : index === path.length - 1 
                      ? 'bg-blue-200 text-blue-800' 
                      : 'bg-blue-100 text-blue-700'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {getPersianName(code)}
              </span>
              {index < path.length - 1 && (
                <span className="text-blue-300 text-lg">←</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PathDisplay