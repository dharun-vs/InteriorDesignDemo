import { useEffect, useRef } from 'react'

export function Studio() {
  const studioRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const studio = studioRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!studio) {
      return
    }

    const items = Array.from(studio.querySelectorAll<HTMLElement>('[data-studio-reveal]'))

    if (reducedMotion.matches) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={studioRef} id="studio" className="studio-section" aria-labelledby="studio-title">
      <div className="studio-shell">
        <div className="studio-heading-block" data-studio-reveal>
          <p className="studio-label">THE STUDIO</p>
          <h2 id="studio-title" className="studio-heading">
            <span className="studio-heading-mask">
              <span className="studio-heading-line studio-heading-line--reveal">
                EVERY DETAIL HAS A PLACE.
              </span>
            </span>
          </h2>
        </div>

        <div className="studio-detail-block">
          <p className="studio-rule" aria-hidden="true" data-studio-reveal />
          <p className="studio-copy" data-studio-reveal>
            Atelier works from the character of a place outward — shaping light, material, and proportion
            until every element feels quietly in its right position.
          </p>
          <dl className="studio-details" data-studio-reveal>
            <div>
              <dt>Approach</dt>
              <dd>Measured / tactile / enduring</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Rooms with a sense of pause</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
