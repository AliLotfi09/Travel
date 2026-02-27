import { BORDERS } from '../data/borders.js'
import { bfs } from './bfs.js'
import { buildGraph } from './buildGraph.js'

const REGIONS = {
  'اروپای غربی': ['FRA','DEU','ITA','ESP','PRT','NLD','BEL','CHE','AUT','GRC','SWE','NOR','FIN','DNK','IRL','GBR','LUX','MCO','AND','LIE','SMR','VAT'],
  'اروپای شرقی': ['POL','CZE','HUN','SVK','SVN','HRV','SRB','ROU','BGR','LTU','LVA','EST','BIH','MNE','ALB','MKD','UKR','BLR','MDA'],
  'آسیای شرقی': ['CHN','KOR','PRK','MNG'],
  'آسیای جنوب شرقی': ['THA','VNM','MMR','MYS','IDN','KHM','LAO','BRN','TLS'],
  'آسیای جنوبی': ['IND','PAK','BGD','NPL','BTN','AFG'],
  'خاورمیانه': ['IRQ','IRN','SAU','SYR','JOR','ISR','LBN','YEM','OMN','UAE','QAT','KWT','TUR'],
  'آفریقای مرکزی': ['ETH','KEN','TZA','COD','CMR','AGO','MOZ','ZMB','UGA','SDN','SSD','RWA','BDI'],
  'آفریقای غربی': ['NGA','GHA','CIV','SEN','MLI','NER','BFA','BEN','TGO','GIN','SLE','LBR','GMB','GNB','MRT'],
  'آفریقای جنوبی': ['ZAF','BWA','NAM','ZWE','SWZ','LSO'],
  'آفریقای شمالی': ['EGY','LBY','DZA','MAR','TUN'],
  'آسیای مرکزی': ['KAZ','UZB','TKM','TJK','KGZ'],
  'آمریکای شمالی': ['USA','CAN','MEX'],
  'آمریکای مرکزی': ['GTM','BLZ','HND','SLV','NIC','CRI','PAN'],
  'آمریکای جنوبی': ['BRA','ARG','CHL','COL','VEN','PER','BOL','PRY','URY','ECU','GUY','SUR'],
  'قفقاز': ['GEO','ARM','AZE'],
}

function getRegion(iso) {
  for (const [region, countries] of Object.entries(REGIONS)) {
    if (countries.includes(iso)) return region
  }
  return 'سایر'
}

function shareBorder(a, b) {
  return BORDERS[a]?.includes(b) ?? false
}

const FALLBACK = { start: 'FRA', end: 'IRN' }

export function getRandomPair() {
  try {
    const graph = buildGraph()
    const candidates = Object.keys(BORDERS).filter(iso =>
      BORDERS[iso] && BORDERS[iso].length >= 2
    )

    for (let attempts = 0; attempts < 2000; attempts++) {
      const i = Math.floor(Math.random() * candidates.length)
      const j = Math.floor(Math.random() * candidates.length)
      if (i === j) continue

      const start = candidates[i]
      const end   = candidates[j]

      if (shareBorder(start, end)) continue
      if (getRegion(start) === getRegion(end)) continue

      const path = bfs(graph, start, end)
      if (!path || path.length < 4 || path.length > 10) continue

      return { start, end, optimalPath: path }
    }
  } catch (e) {
    console.error('getRandomPair failed:', e)
  }

  // fallback مطمئن
  const graph = buildGraph()
  const path  = bfs(graph, FALLBACK.start, FALLBACK.end)
  return { start: FALLBACK.start, end: FALLBACK.end, optimalPath: path }
}