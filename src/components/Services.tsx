import { useEffect, useRef } from 'react'

const services = [
  {
    number: '01',
    title: 'CONCEIVE',
    category: 'INTERIOR ARCHITECTURE',
    descriptor: 'Spatial planning',
    description: 'Understanding the architecture, circulation, proportions, and possibilities of a space.',
  },
  {
    number: '02',
    title: 'DEFINE',
    category: 'INTERIOR DESIGN',
    descriptor: 'Interior design',
    description: 'Developing the material, colour, and visual language around the way you live.',
  },
  {
    number: '03',
    title: 'DELIVER',
    category: 'TURNKEY EXECUTION',
    descriptor: 'Turnkey execution',
    description: 'Bringing drawings, sourcing, materials, and installation together with precision.',
  },
] as const

export function Services() {
  const servicesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = servicesRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!section) {
      return
    }

    const rows = Array.from(section.querySelectorAll<HTMLElement>('[data-service-reveal]'))

    if (reducedMotion.matches) {
      rows.forEach((row) => row.classList.add('is-visible'))
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
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={servicesRef} id="services" className="services-section" aria-labelledby="services-title">
      <div className="services-shell">
        <header className="services-header">
          <p className="services-label">SERVICES</p>
          <h2 id="services-title" className="services-title">
            FROM FIRST LINE
            <span>TO FINAL DETAIL.</span>
          </h2>
          <p className="services-intro-copy">
            We shape interiors through a considered process — from understanding the space to refining the smallest detail.
          </p>
        </header>

        <div className="services-process" aria-label="Our three-stage process">
          <p className="services-meta">SPACE / DETAIL / CRAFT</p>
          {services.map((service) => (
            <article
              key={service.number}
              className="service-stage"
              data-service-reveal
            >
              <div className="service-stage-marker">
                <p className="service-number">{service.number}</p>
              </div>
              <div className="service-stage-content">
                <p className="service-category">{service.category}</p>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-descriptor">{service.descriptor}</p>
                <p className="service-description">{service.description}</p>
              </div>
              <span className="service-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
