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
      const travel = Math.max(bounds.height - window.innerHeight, 1)
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
        <div className="hero-meta hero-meta--top" aria-hidden="true">
          <span>01 — Residential</span>
          <span>Interior architecture</span>
        </div>

        <figure className="hero-image-frame">
          <img
            className="hero-image"
            src={heroImage}
            alt="Modern living room with large windows overlooking trees"
          />
          <figcaption className="hero-image-credit">
            Temporary prototype image · Unsplash
          </figcaption>
        </figure>

        <div className="hero-copy">
          <p className="hero-kicker">A considered approach to living</p>
          <h1 id="hero-title">
            <span>We shape</span>
            <span className="hero-title-offset">spaces</span>
            <span>that stay.</span>
          </h1>
        </div>

        <div className="hero-meta hero-meta--bottom">
          <span>Independent studio</span>
          <a href="#projects">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}
