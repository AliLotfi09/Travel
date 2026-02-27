import { memo, useState, useEffect } from 'react'
import {
  ComposableMap, Geographies, Geography, ZoomableGroup
} from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const NUM_TO_ISO = {
  '004':'AFG','008':'ALB','012':'DZA','024':'AGO','032':'ARG','051':'ARM','036':'AUS','040':'AUT','031':'AZE','050':'BGD','112':'BLR','056':'BEL','084':'BLZ','204':'BEN','064':'BTN','068':'BOL','070':'BIH','072':'BWA','076':'BRA','096':'BRN','100':'BGR','854':'BFA','108':'BDI','116':'KHM','120':'CMR','124':'CAN','140':'CAF','148':'TCD','152':'CHL','156':'CHN','170':'COL','178':'COG','180':'COD','188':'CRI','191':'HRV','192':'CUB','196':'CYP','203':'CZE','208':'DNK','262':'DJI','218':'ECU','818':'EGY','222':'SLV','232':'ERI','233':'EST','748':'SWZ','231':'ETH','246':'FIN','250':'FRA','266':'GAB','270':'GMB','268':'GEO','276':'DEU','288':'GHA','300':'GRC','320':'GTM','324':'GIN','624':'GNB','328':'GUY','332':'HTI','340':'HND','348':'HUN','356':'IND','360':'IDN','364':'IRN','368':'IRQ','372':'IRL','376':'ISR','380':'ITA','384':'CIV','388':'JAM','392':'JPN','400':'JOR','398':'KAZ','404':'KEN','408':'PRK','410':'KOR','414':'KWT','417':'KGZ','418':'LAO','428':'LVA','422':'LBN','426':'LSO','430':'LBR','434':'LBY','438':'LIE','440':'LTU','442':'LUX','807':'MKD','450':'MDG','454':'MWI','458':'MYS','466':'MLI','492':'MCO','496':'MNG','499':'MNE','504':'MAR','508':'MOZ','104':'MMR','516':'NAM','524':'NPL','528':'NLD','554':'NZL','558':'NIC','562':'NER','566':'NGA','578':'NOR','512':'OMN','586':'PAK','591':'PAN','598':'PNG','600':'PRY','604':'PER','608':'PHL','616':'POL','620':'PRT','634':'QAT','642':'ROU','643':'RUS','646':'RWA','682':'SAU','686':'SEN','694':'SLE','703':'SVK','705':'SVN','706':'SOM','710':'ZAF','728':'SSD','724':'ESP','736':'SDN','740':'SUR','752':'SWE','756':'CHE','760':'SYR','762':'TJK','834':'TZA','764':'THA','626':'TLS','768':'TGO','788':'TUN','792':'TUR','795':'TKM','800':'UGA','804':'UKR','784':'UAE','826':'GBR','840':'USA','858':'URY','860':'UZB','862':'VEN','704':'VNM','887':'YEM','894':'ZMB','716':'ZWE','478':'MRT','498':'MDA','275':'PSE','688':'SRB','484':'MEX'
}

const COUNTRY_CENTERS = {
  'AFG':[67.7,33.9],'ALB':[20.1,41.1],'DZA':[1.6,28.0],'AGO':[17.8,-11.2],'ARG':[-63.6,-38.4],'ARM':[45.0,40.0],'AUS':[133.2,-25.2],'AUT':[14.5,47.5],'AZE':[47.5,40.1],'BGD':[90.3,23.6],'BLR':[27.9,53.7],'BEL':[4.4,50.5],'BLZ':[-88.4,17.1],'BEN':[2.3,9.3],'BTN':[90.4,27.5],'BOL':[-63.5,-16.2],'BIH':[17.6,43.9],'BWA':[24.6,-22.3],'BRA':[-51.9,-14.2],'BRN':[114.7,4.5],'BGR':[25.4,42.7],'BFA':[-1.5,12.2],'BDI':[29.9,-3.3],'KHM':[104.9,12.5],'CMR':[12.3,3.8],'CAN':[-106.3,56.1],'CAF':[20.9,6.6],'TCD':[18.7,15.4],'CHL':[-71.5,-35.6],'CHN':[104.1,35.8],'COL':[-74.2,4.5],'COG':[15.8,-0.2],'COD':[21.7,-4.0],'CRI':[-83.7,9.7],'HRV':[15.2,45.1],'CZE':[15.4,49.8],'DNK':[9.5,56.2],'DJI':[42.5,11.8],'ECU':[-78.1,-1.8],'EGY':[30.8,26.8],'SLV':[-88.8,13.7],'ERI':[39.7,15.1],'EST':[25.0,58.5],'SWZ':[31.4,-26.5],'ETH':[40.4,9.1],'FIN':[25.7,61.9],'FRA':[2.2,46.2],'GAB':[11.6,-0.8],'GMB':[-15.3,13.4],'GEO':[43.3,42.3],'DEU':[10.4,51.1],'GHA':[-1.0,7.9],'GRC':[21.8,39.0],'GTM':[-90.2,15.7],'GIN':[-9.6,9.9],'GNB':[-14.9,11.8],'GUY':[-58.9,4.8],'HTI':[-72.2,18.9],'HND':[-86.2,15.1],'HUN':[19.5,47.1],'IND':[78.9,20.5],'IDN':[113.9,-0.7],'IRN':[53.6,32.4],'IRQ':[43.6,33.2],'IRL':[-8.2,53.4],'ISR':[34.8,31.0],'ITA':[12.5,41.8],'CIV':[-5.5,7.5],'JAM':[-77.2,18.1],'JPN':[138.2,36.2],'JOR':[36.2,30.5],'KAZ':[66.9,48.0],'KEN':[37.9,-0.0],'PRK':[127.5,40.3],'KOR':[127.7,35.9],'KWT':[47.4,29.3],'KGZ':[74.7,41.2],'LAO':[102.4,19.8],'LVA':[24.6,56.8],'LBN':[35.8,33.8],'LSO':[28.2,-29.6],'LBR':[-9.4,6.4],'LBY':[17.2,26.3],'LIE':[9.5,47.1],'LTU':[23.8,55.1],'LUX':[6.1,49.8],'MKD':[21.7,41.6],'MDG':[46.8,-18.7],'MWI':[34.3,-13.2],'MYS':[101.9,4.2],'MLI':[-3.9,17.5],'MCO':[7.4,43.7],'MNG':[103.8,46.8],'MNE':[19.3,42.7],'MAR':[-7.0,31.7],'MOZ':[35.5,-18.6],'MMR':[95.9,21.9],'NAM':[18.4,-22.9],'NPL':[84.1,28.3],'NLD':[5.2,52.1],'NZL':[174.8,-40.9],'NIC':[-85.2,12.8],'NER':[8.08,17.6],'NGA':[8.6,9.0],'NOR':[8.4,60.4],'OMN':[55.9,21.5],'PAK':[69.3,30.3],'PAN':[-80.7,8.5],'PNG':[143.9,-6.3],'PRY':[-58.4,-23.4],'PER':[-75.0,-9.1],'PHL':[121.7,12.8],'POL':[19.1,51.9],'PRT':[-8.2,39.3],'QAT':[51.1,25.3],'ROU':[24.9,45.9],'RUS':[105.3,61.5],'RWA':[29.8,-1.9],'SAU':[45.0,23.8],'SEN':[-14.4,14.4],'SLE':[-11.7,8.4],'SVK':[19.6,48.6],'SVN':[14.9,46.1],'SOM':[46.1,5.1],'ZAF':[22.9,-30.5],'SSD':[31.3,6.8],'ESP':[-3.7,40.4],'SDN':[30.2,12.8],'SUR':[-56.0,3.9],'SWE':[18.6,60.1],'CHE':[8.2,46.8],'SYR':[38.9,34.8],'TJK':[71.2,38.8],'TZA':[34.8,-6.3],'THA':[100.9,15.8],'TLS':[125.7,-8.8],'TGO':[1.0,8.6],'TUN':[9.5,33.8],'TUR':[35.2,38.9],'TKM':[59.5,38.9],'UGA':[32.2,1.3],'UKR':[31.1,48.3],'UAE':[53.8,23.4],'GBR':[-3.4,55.3],'USA':[-95.7,37.0],'URY':[-55.7,-32.5],'UZB':[64.5,41.3],'VEN':[-66.5,6.4],'VNM':[108.2,14.0],'YEM':[48.5,15.5],'ZMB':[27.8,-13.1],'ZWE':[29.1,-19.0],'MRT':[-10.9,21.0],'MDA':[28.3,47.4],'PSE':[35.2,31.9],'SRB':[21.0,44.0],'MEX':[-102.5,23.6]
}

// KEY FIX: hintCountry stays visible at ALL hint levels >= 1 (not just level 1)
function getStyle(iso, userPath, targetCountry, hintCountry, hintLevel) {
  const isStart  = iso === userPath[0]
  const isTarget = iso === targetCountry
  const isInPath = userPath.includes(iso) && !isStart
  // hint country stays shown regardless of whether we've moved to level 2
  const isHint   = iso === hintCountry && hintLevel >= 1

  if (isStart)  return { fill: '#4ade80', stroke: '#16a34a', strokeWidth: 0.5, opacity: 1 }
  if (isTarget) return { fill: '#f87171', stroke: '#dc2626', strokeWidth: 0.5, opacity: 1 }
  if (isHint)   return { fill: '#fbbf24', stroke: '#d97706', strokeWidth: 0.5, opacity: 1 }
  if (isInPath) return { fill: '#60a5fa', stroke: '#2563eb', strokeWidth: 0.5, opacity: 1 }

  // hintLevel 0: only start + target visible
  if (hintLevel === 0) return { fill: 'transparent', stroke: 'none', opacity: 0 }
  // hintLevel 1: faint map to locate hint country
  if (hintLevel === 1) return { fill: '#f1f5f9', stroke: '#cbd5e1', strokeWidth: 0.2, opacity: 0.7 }
  // hintLevel 2: full map
  if (hintLevel === 2) return { fill: '#e2e8f0', stroke: '#94a3b8', strokeWidth: 0.3, opacity: 1 }

  return { fill: 'transparent', stroke: 'none', opacity: 0 }
}

const WorldMap = memo(function WorldMap({ userPath, targetCountry, hintCountry, hintLevel }) {
  const [position, setPosition] = useState({ coordinates: [0, 15], zoom: 1 })

  useEffect(() => {
    const activeISOs = [...new Set([...userPath, targetCountry])].filter(Boolean)
    if (activeISOs.length === 0) return

    let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90
    let validCount = 0

    activeISOs.forEach(iso => {
      const coords = COUNTRY_CENTERS[iso]
      if (coords) {
        minLon = Math.min(minLon, coords[0])
        maxLon = Math.max(maxLon, coords[0])
        minLat = Math.min(minLat, coords[1])
        maxLat = Math.max(maxLat, coords[1])
        validCount++
      }
    })

    if (validCount > 0) {
      let lonDiff = maxLon - minLon
      let centerLon = (minLon + maxLon) / 2

      if (lonDiff > 180) {
        lonDiff = 360 - lonDiff
        centerLon = centerLon > 0 ? centerLon - 180 : centerLon + 180
      }

      const latDiff = maxLat - minLat
      const centerLat = (minLat + maxLat) / 2
      const maxDiff = Math.max(lonDiff, latDiff, 25)
      let newZoom = (360 / maxDiff) * 0.45
      newZoom = Math.max(1, Math.min(newZoom, 4.5))

      setPosition({ coordinates: [centerLon, centerLat], zoom: newZoom })
    }
  }, [userPath.join(','), targetCountry])

  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex flex-col items-center justify-center">

      {/* Status label */}
      {(hintLevel === 1 || hintLevel === 2) && (
        <div className="absolute top-2 inset-x-0 z-10 flex justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-500">
              {hintLevel === 1 ? 'کشور راهنما روی نقشه مشخص است' : 'نقشه کامل — راهنما فعال'}
            </span>
          </div>
        </div>
      )}

      <div className="w-full h-full flex-1 flex items-center justify-center pointer-events-none">
        <ComposableMap
          projectionConfig={{ scale: 140 }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            transitionDuration={800}
            minZoom={1}
            maxZoom={6}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const iso = NUM_TO_ISO[String(geo.id).padStart(3, '0')]
                  if (!iso) return null

                  const s = getStyle(iso, userPath, targetCountry, hintCountry, hintLevel)
                  const style = {
                    fill: s.fill,
                    stroke: s.stroke,
                    strokeWidth: s.strokeWidth / position.zoom,
                    opacity: s.opacity,
                    outline: 'none',
                    transition: 'fill 0.3s ease, opacity 0.3s ease',
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{ default: style, hover: style, pressed: style }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-3 flex-wrap z-10 pointer-events-none">
        <LegendDot color="#4ade80" label="مبدا" />
        <LegendDot color="#f87171" label="مقصد" />
        {userPath.length > 1 && <LegendDot color="#60a5fa" label="مسیر شما" />}
        {hintCountry && hintLevel >= 1 && <LegendDot color="#fbbf24" label="راهنما" />}
      </div>
    </div>
  )
})

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm border border-slate-100/50">
      <span className="w-2 h-2 rounded-full flex-none" style={{ background: color }} />
      {label}
    </span>
  );
}

export default WorldMap