import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from './settings.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-scrubbed page turn between the direct section children.
 * Desktop folds the leaving page around its bottom edge and unfolds the next
 * around its top edge. Mobile uses a short scrubbed reveal. Reduced motion
 * keeps normal document flow. No pinning, and this context stays outside the
 * page-entrance hook so a language change does not remove the turn.
 */
export default function BookTurn({ children, watch }) {
  const root = useRef(null)

  useEffect(() => {
    const node = root.current
    if (!node) return undefined
    const ctx = gsap.context(() => {
      const pages = [...node.querySelectorAll(':scope > [data-book-page]')]
      if (pages.length < 2) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const narrow = window.matchMedia('(max-width: 959px)').matches
      pages.forEach((entering, index) => {
        if (index === 0) return
        const leaving = pages[index - 1]
        if (narrow) {
          gsap.fromTo(entering, { y: motion.book.mobileLift, opacity: 0.92 }, {
            y: 0,
            opacity: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: entering,
              start: 'top 96%',
              end: 'top 70%',
              scrub: true,
            },
          })
          return
        }
        const short = leaving.offsetHeight < 220
        const range = {
          trigger: leaving,
          start: short ? 'bottom 82%' : 'bottom 86%',
          end: short ? 'bottom 48%' : 'bottom 30%',
          scrub: true,
        }
        gsap.fromTo(leaving, { rotateX: 0 }, {
          rotateX: short ? motion.book.fold * 0.45 : motion.book.fold,
          ease: 'none',
          transformOrigin: 'center bottom',
          immediateRender: false,
          overwrite: 'auto',
          scrollTrigger: range,
        })
        gsap.fromTo(entering, { rotateX: short ? motion.book.unfold * 0.5 : motion.book.unfold }, {
          rotateX: 0,
          ease: 'none',
          transformOrigin: 'center top',
          immediateRender: false,
          overwrite: 'auto',
          scrollTrigger: { ...range },
        })
      })
    }, node)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [watch])

  return (
    <div ref={root} className="book-turn">
      {children}
    </div>
  )
}
