import { BORDERS } from '../data/borders.js'

export function buildGraph() {
  const graph = {}
  for (const [country, neighbors] of Object.entries(BORDERS)) {
    if (Array.isArray(neighbors)) {
      graph[country] = new Set(neighbors)
    }
  }
  return graph
}