import { createContext } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from './settings.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const MaskEpoch = createContext(() => {})

const PANEL = '.dashboard-preview, .glass-card, .price-card, .journey-panel, .summary-panel, .hero-globe'

function containedBy(node, selector) {
  return Boolean(node.parentElement?.closest(selector))
}

function collectLoose(section) {
  return [...section.querySelectorAll('p, a.button, a.button-ghost, a.button-gold, button.button, button.button-ghost, button.button-gold, .journey-step, .logo-row span, .area-list > details, .filters, .hero-paths button, .path-switch button, .preview-banner')]
    .filter((node) => {
      if (node.matches('[data-cursor="action"]')) return false
      if (containedBy(node, '.contact-form, .menu-list, .op-list, details, .filters, .offer-card')) return false
      if (containedBy(node, PANEL)) return false
      return true
    })
}

function panelPieces(panel) {
  return [...panel.querySelectorAll(':scope > p, :scope > .fine, :scope .deliverable-list > li, :scope > .dashboard-bar, :scope .contact-panel > *, :scope .check-list > li, :scope > a, :scope > .hero-actions')]
    .filter((node) => !node.closest('h1, h2, h3') && !node.matches('h1, h2, h3'))
}

function addRise(timeline, nodes, position, { y, duration, stagger = 0.1 }) {
  if (!nodes.length) return
  timeline.from(nodes, {
    y,
    opacity: 0,
    duration,
    stagger: nodes.length > 10 ? { each: 0.06 } : stagger,
    immediateRender: true,
    clearProps: 'transform,opacity',
  }, position)
}

function headingNodes(section) {
  return [...section.querySelectorAll('h1, h2, h3')]
    .filter((heading) => !heading.closest('.op-list'))
    .flatMap((heading) => {
      const lines = [...heading.querySelectorAll('.mask-line-inner')]
      return lines.length ? lines : [heading]
    })
}

function animateHero(section, index, mobile) {
  const timeline = gsap.timeline({
    defaults: { ease: motion.ease.out },
    scrollTrigger: { trigger: section, start: 'top 92%', once: true, refreshPriority: index },
  })
  const lift = mobile ? 16 : 36
  timeline.from(section.querySelectorAll('.hero-paths button, .folio-paths button'), {
    y: mobile ? 8 : 16,
    opacity: 0,
    duration: mobile ? 0.4 : 0.55,
    stagger: 0.08,
    immediateRender: false,
    clearProps: 'transform,opacity',
  }, 0)
  addRise(timeline, headingNodes(section), 0.08, {
    y: mobile ? 22 : 48,
    duration: mobile ? 0.6 : motion.hero.text,
    stagger: motion.hero.stagger,
  })
  const support = section.querySelector('.support')
  if (support) {
    timeline.from(support, {
      clipPath: 'inset(0 0 100% 0)',
      opacity: 0,
      duration: mobile ? 0.45 : 0.75,
      immediateRender: false,
      clearProps: 'clipPath,opacity',
    }, 0.32)
  }
  timeline.from(section.querySelectorAll('.hero-actions > *'), {
    y: lift * 0.6,
    opacity: 0,
    duration: mobile ? 0.4 : motion.hero.cta,
    stagger: 0.1,
    immediateRender: false,
    clearProps: 'transform,opacity',
  }, 0.42)
  const globe = section.querySelector('.hero-globe')
  if (globe) {
    timeline.from(globe, {
      scale: mobile ? 0.96 : 0.84,
      opacity: 0,
      duration: mobile ? 0.65 : motion.hero.globe,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'transform,opacity',
    }, 0.1)
  }
  return timeline
}

function animateExplorer(section, index, mobile) {
  const timeline = gsap.timeline({
    defaults: { ease: motion.ease.out },
    scrollTrigger: { trigger: section, start: 'top 86%', once: true, refreshPriority: index },
  })
  addRise(timeline, headingNodes(section), 0, { y: mobile ? 16 : 28, duration: mobile ? 0.5 : 0.7, stagger: 0.08 })
  const panel = section.querySelector('.explorer-panel')
  if (panel) {
    timeline.from(panel, {
      y: mobile ? 12 : 24,
      opacity: 0,
      duration: mobile ? 0.45 : 0.7,
      immediateRender: false,
      clearProps: 'transform,opacity',
    }, 0.16)
  }
  return timeline
}

function animatePhases(section, index, mobile) {
  const timeline = gsap.timeline({
    defaults: { ease: motion.ease.out },
    scrollTrigger: { trigger: section, start: 'top 84%', once: true, refreshPriority: index },
  })
  addRise(timeline, headingNodes(section), 0, { y: mobile ? 16 : 32, duration: mobile ? 0.5 : 0.75, stagger: 0.08 })
  timeline.from(section.querySelectorAll('.phase-rail > li'), {
    opacity: 0,
    duration: mobile ? 0.35 : 0.5,
    stagger: 0.06,
    immediateRender: false,
    clearProps: 'opacity',
  }, 0.12)
  return timeline
}

function animateLogos(section, index, mobile) {
  const timeline = gsap.timeline({
    defaults: { ease: motion.ease.out },
    scrollTrigger: { trigger: section, start: 'top 92%', once: true, refreshPriority: index },
  })
  const label = section.querySelector('.client-label')
  if (label) {
    timeline.from(label, {
      opacity: 0,
      duration: 0.45,
      immediateRender: false,
      clearProps: 'opacity',
    }, 0)
  }
  timeline.from(section.querySelectorAll('.logo-row span'), {
    y: mobile ? 8 : 0,
    x: mobile ? 0 : 18,
    opacity: 0,
    duration: mobile ? 0.4 : 0.7,
    stagger: 0.07,
    immediateRender: false,
    clearProps: 'transform,opacity',
  }, 0.05)
  return timeline
}

function animateFigures(section, index, mobile) {
  const timeline = gsap.timeline({
    defaults: { ease: motion.ease.out },
    scrollTrigger: { trigger: section, start: 'top 84%', once: true, refreshPriority: index },
  })
  const label = section.querySelector('.eyebrow')
  if (label) {
    timeline.from(label, {
      clipPath: 'inset(0 12% 0 0)',
      opacity: 0,
      duration: mobile ? 0.4 : 0.6,
      immediateRender: false,
      clearProps: 'clipPath,opacity',
    }, 0)
  }
  const cards = [...section.querySelectorAll('.figure-list li')]
  timeline.from(cards, {
    clipPath: 'inset(16% 0 0 0 round 20px)',
    opacity: 0,
    duration: mobile ? 0.45 : 0.7,
    stagger: motion.figures.stagger,
    immediateRender: false,
    clearProps: 'clipPath,opacity',
  }, 0.12)
  cards.forEach((card, cardIndex) => {
    const node = card.querySelector('[data-figure]')
    const raw = node?.dataset.figure || ''
    const match = raw.match(/(\d+)/)
    if (!node || !match) return
    const target = Number(match[1])
    const suffix = raw.slice(match.index + match[1].length)
    const state = { value: 0 }
    timeline.to(state, {
      value: target,
      duration: mobile ? 0.7 : motion.figures.duration,
      ease: 'power2.out',
      onUpdate: () => {
        node.textContent = `${Math.round(state.value)}${suffix}`
      },
      onComplete: () => {
        node.textContent = raw
      },
    }, 0.2 + cardIndex * 0.08)
  })
  const note = section.querySelector('.fine')
  if (note) {
    timeline.from(note, {
      opacity: 0,
      duration: 0.5,
      immediateRender: false,
      clearProps: 'opacity',
    }, 0.35)
  }
  return timeline
}

function animateJourney(section, index, mobile) {
  const timeline = gsap.timeline({
    defaults: { ease: motion.ease.out },
    scrollTrigger: { trigger: section, start: 'top 82%', once: true, refreshPriority: index },
  })
  addRise(timeline, headingNodes(section), 0, { y: mobile ? 20 : 40, duration: mobile ? 0.55 : 0.8, stagger: 0.08 })
  timeline.from(section.querySelectorAll('.journey-step'), {
    scale: mobile ? 0.96 : 0.82,
    opacity: 0,
    duration: mobile ? 0.4 : 0.6,
    stagger: 0.06,
    immediateRender: false,
    clearProps: 'transform,opacity',
  }, 0.12)
  const board = section.querySelector('.journey-board')
  if (board) {
    timeline.from(board, {
      rotateX: mobile ? 0 : 7,
      y: mobile ? 16 : 28,
      opacity: 0,
      transformOrigin: 'center top',
      duration: mobile ? 0.55 : 0.85,
      immediateRender: false,
      clearProps: 'transform,opacity',
    }, 0.2)
  }
  return timeline
}

function animateSection(section, index, mobile) {
  if (section.classList.contains('hero-saas') || section.classList.contains('folio-hero')) return animateHero(section, index, mobile)
  if (section.classList.contains('explorer-section')) return animateExplorer(section, index, mobile)
  if (section.querySelector('.phase-rail')) return animatePhases(section, index, mobile)
  if (section.classList.contains('logo-strip')) return animateLogos(section, index, mobile)
  if (section.classList.contains('figure-rail')) return animateFigures(section, index, mobile)
  if (section.querySelector('.journey-track')) return animateJourney(section, index, mobile)

  const timeline = gsap.timeline({
    defaults: { ease: motion.ease.out },
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      once: true,
      refreshPriority: index,
    },
  })
  const headingY = mobile ? 28 : 50
  const copyY = mobile ? 18 : 32
  const panelY = mobile ? 24 : 52
  const duration = mobile ? 0.65 : 0.9
  const headings = headingNodes(section)
  addRise(timeline, headings, 0, { y: headingY, duration, stagger: 0.1 })

  const cta = section.querySelector('.cta-band')
  if (cta) {
    const sentence = cta.querySelector('.fine')
    const action = [...cta.querySelectorAll('a, button')].filter((node) => !node.closest('.dashboard-preview'))
    const panel = cta.querySelector('.dashboard-preview')
    if (sentence) addRise(timeline, [sentence], 0.18, { y: copyY, duration: duration * 0.85 })
    if (action.length) {
      const magnetic = action.filter((node) => node.matches('[data-cursor="action"]'))
      const plain = action.filter((node) => !node.matches('[data-cursor="action"]'))
      addRise(timeline, plain, 0.28, { y: copyY, duration: 0.75, stagger: 0.1 })
      if (magnetic.length) {
        timeline.from(magnetic, { opacity: 0, duration: 0.75, stagger: 0.1, clearProps: 'opacity' }, 0.28)
      }
    }
    if (panel) {
      timeline.from(panel, {
        x: mobile ? 0 : 40,
        y: mobile ? 18 : 0,
        opacity: 0,
        duration: mobile ? 0.6 : 0.95,
        immediateRender: false,
        clearProps: 'transform,opacity',
      }, 0.22)
      addRise(timeline, panelPieces(panel), 0.4, { y: mobile ? 14 : 22, duration: 0.7, stagger: 0.1 })
    }
    return timeline
  }

  addRise(timeline, collectLoose(section), 0.12, { y: copyY, duration: mobile ? 0.6 : 0.8, stagger: 0.1 })
  const magnetic = [...section.querySelectorAll('[data-cursor="action"]')].filter((node) => !node.closest('.contact-form, .cta-band'))
  if (magnetic.length) {
    timeline.from(magnetic, { opacity: 0, duration: 0.7, stagger: 0.1, clearProps: 'opacity' }, 0.16)
  }

  const panels = [...section.querySelectorAll(PANEL)].filter((node) => !node.closest('.op-list, .cta-band'))
  const glass = panels.filter((node) => node.classList.contains('glass-card'))
  const sheets = panels.filter((node) => !node.classList.contains('glass-card'))
  if (glass.length) {
    timeline.from(glass, {
      rotateX: mobile ? 0 : 8,
      y: mobile ? 16 : 26,
      opacity: 0,
      transformOrigin: 'center top',
      duration: mobile ? 0.55 : 0.9,
      stagger: 0.08,
      immediateRender: false,
      clearProps: 'transform,opacity',
    }, 0.08)
  }
  if (sheets.length) {
    timeline.from(sheets, {
      y: panelY,
      opacity: 0,
      duration: mobile ? 0.6 : 0.85,
      stagger: 0.1,
      immediateRender: false,
      clearProps: 'transform,opacity',
    }, 0.12)
  }
  panels.forEach((panel, panelIndex) => {
    addRise(timeline, panelPieces(panel), 0.24 + panelIndex * 0.06, { y: mobile ? 12 : 20, duration: 0.7, stagger: 0.08 })
  })

  const catalog = section.querySelector('.op-list')
  if (catalog) {
    timeline.from(catalog, {
      y: panelY,
      opacity: 0,
      duration: mobile ? 0.65 : 0.85,
      immediateRender: true,
      clearProps: 'transform,opacity',
    }, 0.16)
  }

  const form = section.querySelector('.contact-form')
  if (form) timeline.from(form, { opacity: 0, duration: 0.8, clearProps: 'opacity' }, 0.2)
  return timeline
}

function bindScrollChoreography(root, mobile) {
  const created = []
  const nodes = []
  const rtl = document.documentElement.dir === 'rtl'
  const scrub = mobile ? 0.7 : 0.4
  const lift = mobile ? 28 : 56
  const slide = (mobile ? 24 : 64) * (rtl ? -1 : 1)

  function track(tween, ...targets) {
    created.push(tween)
    targets.forEach((target) => {
      if (!target) return
      if (target.length !== undefined && !target.nodeType) nodes.push(...target)
      else nodes.push(target)
    })
    return tween
  }

  const hero = root.querySelector('.folio-hero .wrap, .page-hero .wrap')
  if (hero) {
    track(gsap.to(hero, {
      y: mobile ? -20 : -48,
      ease: 'none',
      scrollTrigger: { trigger: hero.closest('section') || hero, start: 'top top', end: 'bottom top', scrub },
    }), hero)
  }

  root.querySelectorAll('.explorer-stage').forEach((node) => {
    track(gsap.fromTo(node, { scale: mobile ? 1.04 : 1.12, y: mobile ? 12 : 28 }, {
      scale: 1,
      y: mobile ? -8 : -18,
      ease: 'none',
      transformOrigin: '50% 42%',
      scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub },
    }), node)
  })

  root.querySelectorAll('.explorer-names li, .explorer-swipe button').forEach((node, index) => {
    track(gsap.fromTo(node, { y: 18 + index * 4, opacity: 0.2 }, {
      y: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top 98%', end: 'top 70%', scrub },
    }), node)
  })

  root.querySelectorAll('.logo-row').forEach((node) => {
    track(gsap.fromTo(node, { x: slide }, {
      x: -slide,
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub },
    }), node)
  })

  root.querySelectorAll('.figure-list li').forEach((node, index) => {
    track(gsap.fromTo(node, { y: lift + index * 10 }, {
      y: mobile ? -10 : -28,
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub },
    }), node)
  })

  root.querySelectorAll('.offer-card').forEach((node, index) => {
    track(gsap.fromTo(node, { y: lift + index * 6 }, {
      y: 0,
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top 100%', end: 'top 58%', scrub },
    }), node)
    const photo = node.querySelector('.offer-photo')
    if (!photo) return
    track(gsap.fromTo(photo, { clipPath: 'inset(100% 0 0 0)' }, {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top 96%', end: 'top 52%', scrub },
    }), photo)
  })

  root.querySelectorAll('.phase-rail > li, .method-rail li, .team-row, .value-stack p, .editorial-list li').forEach((node) => {
    track(gsap.fromTo(node, { x: slide * 0.55, y: mobile ? 16 : 28 }, {
      x: 0,
      y: 0,
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top 96%', end: 'top 64%', scrub },
    }), node)
  })

  root.querySelectorAll('.area-list > details, .about-paths .price-card, .contact-info-card, .contact-form, .filters').forEach((node) => {
    track(gsap.fromTo(node, { y: lift, opacity: 0.25 }, {
      y: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top 98%', end: 'top 62%', scrub },
    }), node)
  })

  root.querySelectorAll('.folio-contact-grid').forEach((node) => {
    track(gsap.fromTo(node, { y: lift }, {
      y: mobile ? -12 : -24,
      ease: 'none',
      scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub },
    }), node)
  })

  return () => {
    created.forEach((tween) => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
    if (nodes.length) gsap.set(nodes, { clearProps: 'transform,clipPath,opacity' })
  }
}

function setup(root, mobile) {
  const sections = [...root.querySelectorAll('section')]
  const timelines = sections.map((section, index) => animateSection(section, index, mobile))
  const releaseScroll = bindScrollChoreography(root, mobile)

  const line = root.querySelector('.journey-line')
  const journey = line?.closest('section')
  let progress
  if (line && journey && !mobile) {
    const steps = [...journey.querySelectorAll('.journey-step')]
    gsap.set(line, { clearProps: 'transform' })
    progress = ScrollTrigger.create({
      trigger: journey,
      start: 'top 75%',
      end: 'bottom 60%',
      scrub: 0.45,
      onUpdate: (self) => {
        const current = Math.max(0, Math.ceil(self.progress * steps.length) - 1)
        steps.forEach((step, index) => step.classList.toggle('is-progress', index <= current && self.progress > 0.04))
      },
    })
  }

  if (!mobile) {
    const orbit = root.querySelector('.hero-orbit')
    if (orbit) {
      timelines.push(gsap.to(orbit, {
        y: motion.parallax.hero,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-saas', start: 'top top', end: 'bottom top', scrub: true },
      }))
    }
    const glow = root.querySelector('.hero-glow')
    if (glow) {
      timelines.push(gsap.to(glow, {
        y: 22,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-saas', start: 'top top', end: 'bottom top', scrub: 0.5 },
      }))
    }
    root.querySelectorAll('.ring-visual, .about-orbit').forEach((ring) => {
      timelines.push(gsap.to(ring, {
        y: ring.classList.contains('about-orbit') ? -18 : -28,
        ease: 'none',
        scrollTrigger: { trigger: ring, start: 'top bottom', end: 'bottom top', scrub: 0.55 },
      }))
    })
  }

  return () => {
    progress?.kill()
    releaseScroll()
    root.querySelectorAll('.journey-step.is-progress').forEach((node) => node.classList.remove('is-progress'))
    root.querySelectorAll('[data-figure]').forEach((node) => {
      node.textContent = node.dataset.figure
    })
    timelines.forEach((tween) => tween.kill())
  }
}

export function usePageEntrance(scopeRef, dependencies = []) {
  useGSAP((_, contextSafe) => {
    const root = scopeRef.current
    if (!root) return undefined
    let mm
    const mount = contextSafe(() => {
      mm?.revert()
      mm = gsap.matchMedia()
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          mobile: '(max-width: 959px)',
          desktop: '(min-width: 960px)',
        },
        (context) => {
          if (context.conditions.reduce) return undefined
          try {
            return setup(root, Boolean(context.conditions.mobile))
          } catch {
            gsap.set(root.querySelectorAll('.mask-line-inner, p, a, button, article, .dashboard-preview, .glass-card, .filters, .contact-form'), {
              clearProps: 'all',
            })
            return undefined
          }
        },
      )
      ScrollTrigger.refresh()
    })
    mount()
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      mm?.revert()
    }
  }, { scope: scopeRef, dependencies, revertOnUpdate: true })
}
