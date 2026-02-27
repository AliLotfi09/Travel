import { useState, useCallback, useMemo } from 'react'
import { BORDERS, COUNTRY_NAMES_FA } from '../data/borders.js'
import { buildGraph } from '../utils/buildGraph.js'
import { bfs } from '../utils/bfs.js'
import { getRandomPair } from '../utils/randomPair.js'

function calcScore(userSteps, optimalSteps, hintsUsed) {
  if (!userSteps || !optimalSteps) return 0
  const base = Math.max(0, 1 - (userSteps - optimalSteps) / Math.max(optimalSteps, 1))
  const penalty = hintsUsed * 0.15
  return Math.max(0, Math.round((base - penalty) * 1000))
}

export function useGameLogic() {
  const graph = useMemo(() => buildGraph(), [])

  const createInitialState = useCallback(() => {
    const { start, end, optimalPath } = getRandomPair()
    return {
      startCountry: start,
      targetCountry: end,
      optimalPath,
      userPath: [start],
      hintsUsed: 0,
      hintLevel: 0,      // 0=دوکشور | 1=نقشه+راهنما | 2=نقشه‌کامل
      hintCountry: null,
      isComplete: false,
      errorMessage: '',
    }
  }, [])

  const [state, setState] = useState(() => createInitialState())

  const selectCountry = useCallback((iso) => {
    setState(prev => {
      if (prev.isComplete) return prev

      if (prev.userPath.includes(iso)) {
        return { ...prev, errorMessage: 'این کشور قبلاً انتخاب شده است.' }
      }

      const last = prev.userPath[prev.userPath.length - 1]
      const neighbors = graph[last]
      const isNeighbor = neighbors?.has(iso) ?? false

      if (!isNeighbor) {
        return {
          ...prev,
          errorMessage: `«${COUNTRY_NAMES_FA[iso] || iso}» با «${COUNTRY_NAMES_FA[last] || last}» مرز مشترک ندارد.`,
        }
      }

      const newPath = [...prev.userPath, iso]
      return {
        ...prev,
        userPath: newPath,
        isComplete: iso === prev.targetCountry,
        errorMessage: '',
        hintCountry: null,
      }
    })
  }, [graph])

  const useHint = useCallback(() => {
    setState(prev => {
      if (prev.hintsUsed >= 2 || prev.isComplete) return prev
      const newLevel = prev.hintLevel + 1

      if (newLevel === 1) {
        const last = prev.userPath[prev.userPath.length - 1]
        const remaining = bfs(graph, last, prev.targetCountry)
        const hintCountry = remaining && remaining.length > 1 ? remaining[1] : null
        return { ...prev, hintLevel: 1, hintsUsed: prev.hintsUsed + 1, hintCountry }
      }

      return { ...prev, hintLevel: 2, hintsUsed: prev.hintsUsed + 1 }
    })
  }, [graph])

  const dismissError = useCallback(() => {
    setState(prev => ({ ...prev, errorMessage: '' }))
  }, [])

  const restart = useCallback(() => {
    setState(prev => ({
      ...prev,
      userPath: [prev.startCountry],
      hintsUsed: 0,
      hintLevel: 0,
      hintCountry: null,
      isComplete: false,
      errorMessage: '',
    }))
  }, [])

  const newGame = useCallback(() => {
    setState(createInitialState())
  }, [createInitialState])

  const score = useMemo(() => {
    if (!state.isComplete) return null
    return calcScore(state.userPath.length - 1, state.optimalPath.length - 1, state.hintsUsed)
  }, [state.isComplete, state.userPath.length, state.optimalPath.length, state.hintsUsed])

  return {
    ...state,
    score,
    selectCountry,
    useHint,
    dismissError,
    restart,
    newGame,
    optimalSteps: state.optimalPath.length - 1,
    userSteps: state.userPath.length - 1,
    canHint: state.hintsUsed < 2 && !state.isComplete,
  }
}