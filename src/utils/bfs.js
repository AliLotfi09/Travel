export function bfs(graph, start, end) {
  if (!graph || !start || !end) return null
  if (start === end) return [start]
  if (!graph[start] || !graph[end]) return null

  const queue   = [[start]]
  const visited = new Set([start])

  while (queue.length > 0) {
    const path    = queue.shift()
    const current = path[path.length - 1]
    const neighbors = graph[current]
    if (!neighbors) continue

    for (const neighbor of neighbors) {
      if (neighbor === end) return [...path, neighbor]
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push([...path, neighbor])
      }
    }
  }
  return null
}