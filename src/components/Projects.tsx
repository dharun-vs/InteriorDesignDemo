import { useEffect, useRef } from 'react'
import project01 from '../assets/projects/project-01.jpg'
import project02 from '../assets/projects/project-02.jpg'
import project03 from '../assets/projects/project-03.jpg'

const projects = [
  {
    id: '01',
    name: 'Quiet Geometry',
    type: '01 — RESIDENTIAL',
    image: project01,
    alt: 'Quiet Geometry interior study',
    description: 'A calm study in proportion, light, and restrained material layers.',
  },
  {
    id: '02',
    name: 'Warm Threshold',
    type: '02 — RESIDENTIAL',
    image: project02,
    alt: 'Warm Threshold interior study',
    description: 'A tactile residence shaped by warm timber, softened edges, and pause.',
  },
  {
    id: '03',
    name: 'Material House',
    type: '03 — RESIDENTIAL',
    image: project03,
    alt: 'Material House interior study',
    description: 'A grounded composition of natural stone, texture, and quiet volume.',
  },
] as const

export function Projects() {
  const projectRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const items = projectRefs.current.filter(Boolean) as HTMLElement[]

    if (!items.length) {
      return
    }

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
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    items.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="projects-shell">
        <header className="projects-intro">
          <p className="projects-label">SELECTED WORK</p>
          <h2 id="projects-title" className="projects-heading">
            Spaces with a quieter point of view.
          </h2>
          <p className="projects-copy">
            We design interiors rooted in proportion, material depth, and a slower rhythm of living.
            The result is a polished, residential atmosphere that feels composed, tactile, and enduring.
          </p>
        </header>

        <div className="projects-collection" aria-label="Portfolio project studies">
          {projects.map((project, index) => (
            <article
              key={project.name}
              ref={(element) => {
                projectRefs.current[index] = element
              }}
              className={`project-study project-study--${project.id}`}
            >
              <div className="project-visual">
                <img src={project.image} alt={project.alt} />
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-index">{project.type}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
