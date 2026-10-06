import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useTranslation } from 'react-i18next'
import { buildGlobeMarkers } from '../../data/globeBranches.js'
import { buildInvestorMarkets } from '../../data/investorMarkets.js'
import { worldFrame, worldLand } from '../../data/worldLand.js'
import { motion } from '../../motion/settings.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function projectPoint(lon, lat) {
  const { width, height, minLon, maxLon, minLat, maxLat } = worldFrame
  const mercator = (value) => {
    const clamped = Math.max(-85, Math.min(85, value))
    return Math.log(Math.tan(Math.PI / 4 + (clamped * Math.PI) / 360))
  }
  const y0 = mercator(minLat)
  const y1 = mercator(maxLat)
  return {
    x: ((lon - minLon) / (maxLon - minLon)) * width,
    y: (1 - (mercator(lat) - y0) / (y1 - y0)) * height,
  }
}

export default function MarketExplorer({ mode = 'franchisor' }) {
  const root = useRef(null)
  const shift = useRef(null)
  const focusMove = useRef(false)
  const focusGroup = useRef(null)
  const { t, i18n } = useTranslation()
  const english = i18n.language === 'en'
  const investor = mode === 'investor'
  const places = useMemo(() => {
    if (investor) return buildInvestorMarkets(english, false)
    return buildGlobeMarkers(english).map((marker) => ({
      ...marker,
      kicker: marker.kind === 'office' ? t('globe.office') : t('globe.project'),
    }))
  }, [english, investor, t])
  const [activeId, setActiveId] = useState(places[0]?.id ?? null)
  const active = places.find((place) => place.id === activeId) || places[0]

  useEffect(() => {
    setActiveId(places[0]?.id ?? null)
  }, [places])

  useEffect(() => {
    if (!focusMove.current) return undefined
    focusMove.current = false
    const group = focusGroup.current
    const selected = group?.querySelector('.is-selected, .is-active')
    selected?.focus()
    return undefined
  }, [activeId])

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined
    const tween = gsap.from('.map-pin-dot', {
      scale: 0.2,
      opacity: 0,
      duration: 0.55,
      stagger: 0.09,
      ease: motion.ease.out,
      immediateRender: false,
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
    })
    return () => tween.kill()
  }, { scope: root, dependencies: [mode, english] })

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const photo = root.current?.querySelector('.explorer-detail img, .explorer-detail .explorer-place-mark')
    const narrow = window.matchMedia('(max-width: 800px)').matches
    if (!photo || reduced) return undefined
    const mask = gsap.from(photo, {
      clipPath: 'inset(0 0 100% 0)',
      duration: narrow ? 0.4 : 0.65,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'clipPath',
    })
    return () => {
      mask.kill()
      gsap.set(photo, { clearProps: 'clipPath' })
    }
  }, { scope: root, dependencies: [active?.id, english] })

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const node = shift.current
    const pin = root.current?.querySelector('.map-pin.is-active')
    const stage = root.current?.querySelector('.explorer-stage')
    if (!node || !pin || !stage || reduced) {
      if (node) gsap.set(node, { clearProps: 'transform' })
      return undefined
    }
    const stageBox = stage.getBoundingClientRect()
    const pinBox = pin.getBoundingClientRect()
    const dx = (stageBox.left + stageBox.width / 2) - (pinBox.left + pinBox.width / 2)
    const dy = (stageBox.top + stageBox.height / 2) - (pinBox.top + pinBox.height / 2)
    const tween = gsap.to(node, {
      x: Math.max(-26, Math.min(26, dx * 0.06)),
      y: Math.max(-16, Math.min(16, dy * 0.06)),
      duration: 0.7,
      ease: 'power2.out',
    })
    return () => tween.kill()
  }, { scope: root, dependencies: [active?.id] })

  function choose(id, byKeyboard) {
    focusMove.current = byKeyboard
    setActiveId(id)
  }

  function onKey(event, index) {
    const nextKey = event.key === 'ArrowDown' || event.key === 'ArrowRight'
    const prevKey = event.key === 'ArrowUp' || event.key === 'ArrowLeft'
    if (!nextKey && !prevKey && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    focusGroup.current = event.currentTarget.closest('.explorer-names, .explorer-swipe, .explorer-shift')
    if (event.key === 'Home') choose(places[0].id, true)
    else if (event.key === 'End') choose(places[places.length - 1].id, true)
    else {
      const step = nextKey ? 1 : -1
      choose(places[(index + step + places.length) % places.length].id, true)
    }
  }

  if (!active) return null

  return (
    <div className="explorer" ref={root}>
      <div className="explorer-layout">
        <div className="explorer-map-wrap">
          <div className="explorer-stage" dir="ltr">
            <div className="explorer-shift" ref={shift}>
              <svg className="explorer-svg" viewBox={`0 0 ${worldFrame.width} ${worldFrame.height}`} role="img" aria-label={english ? 'Location map' : 'خريطة المواقع'}>
                <path className="explorer-land" d={worldLand} />
              </svg>
              {places.map((place, index) => {
                const point = projectPoint(place.lng, place.lat)
                const selected = place.id === active.id
                return (
                  <button
                    key={place.id}
                    type="button"
                    className={selected ? 'map-pin is-active' : 'map-pin'}
                    style={{ left: `${(point.x / worldFrame.width) * 100}%`, top: `${(point.y / worldFrame.height) * 100}%` }}
                    aria-pressed={selected}
                    aria-label={place.label}
                    onClick={() => choose(place.id, false)}
                    onKeyDown={(event) => onKey(event, index)}
                  >
                    <span className="map-pin-ring" aria-hidden="true" />
                    <span className="map-pin-dot" aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          </div>
          {investor ? null : <p className="fine explorer-note">{t('globe.estimated')}</p>}
          <div className="explorer-swipe" role="tablist" aria-label={english ? 'Locations' : 'المواقع'}>
            {places.map((place, index) => (
              <button
                key={place.id}
                type="button"
                role="tab"
                className={place.id === active.id ? 'is-selected' : ''}
                aria-selected={place.id === active.id}
                onClick={() => choose(place.id, false)}
                onKeyDown={(event) => onKey(event, index)}
              >
                {place.label}
              </button>
            ))}
          </div>
        </div>
        <article className="explorer-panel" aria-live="polite">
          <div className="explorer-detail" key={active.id}>
            <div className="explorer-photo">
              {active.src ? (
                <img src={active.src} alt="" />
              ) : (
                <p className="explorer-place-mark">{active.label}</p>
              )}
            </div>
            <div className="explorer-copy">
              {active.kicker ? <p className="explorer-kicker">{active.kicker}</p> : null}
              <h3>{active.label}</h3>
              <p>{active.location}</p>
              {active.note ? <p className="fine">{active.note}</p> : null}
              {active.address ? <p><span>{t('globe.address')}</span>{active.address}</p> : null}
              {active.phoneHref ? (
                <p><span>{t('globe.phone')}</span><a href={active.phoneHref} dir="ltr">{active.phone}</a></p>
              ) : null}
              {active.email ? (
                <p><span>{t('globe.email')}</span><a href={`mailto:${active.email}`} dir="ltr">{active.email}</a></p>
              ) : null}
            </div>
          </div>
          <ul className="explorer-names">
            {places.map((place, index) => (
              <li key={place.id}>
                <button
                  type="button"
                  className={place.id === active.id ? 'is-selected' : ''}
                  aria-current={place.id === active.id ? 'true' : undefined}
                  onClick={() => choose(place.id, false)}
                  onKeyDown={(event) => onKey(event, index)}
                >
                  {place.label}
                </button>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  )
}
