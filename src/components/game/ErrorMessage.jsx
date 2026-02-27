import React, { useEffect } from 'react'

const ErrorMessage = ({ message, onClear }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClear()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [message, onClear])

  if (!message) return null

  return (
    <div className="w-full px-4 md:px-8 py-2 shake">
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl 
                      text-red-600 text-sm font-medium text-center
                      flex items-center justify-center gap-2">
        <span className="text-lg">❌</span>
        {message}
      </div>
    </div>
  )
}

export default ErrorMessage