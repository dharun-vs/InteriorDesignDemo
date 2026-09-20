import { useEffect, useRef } from 'react'
import heroImage from '../assets/hero-interior.jpg'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!hero || reducedMotion.matches) {
      return
    }

    let frame = 0
    const updateProgress = () => {
      frame = 0
      const bounds = hero.getBoundingClientRect()
      const travel = Math.max(bounds.height, window.innerHeight, 1)
      const progress = Math.min(Math.max(-bounds.top / travel, 0), 1)
      hero.style.setProperty('--hero-progress', progress.toFixed(3))
    }

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-image-frame" aria-hidden="true">
          <img
            className="hero-image"
            src={heroImage}
            alt=""
          />
        </div>

        <div className="hero-content">
          <h1 id="hero-title">
            <span>We shape</span>
            <span>spaces</span>
            <span>that stay.</span>
          </h1>
        </div>

        <div className="hero-meta hero-meta--bottom">
          <span>01 — Residential</span>
          <span className="hero-scroll">
            Scroll <span className="hero-scroll-mark" aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  )
}
