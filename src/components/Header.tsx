import { useEffect, useRef, useState } from 'react'

const primaryLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
]

const mobileLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuMounted, setIsMenuMounted] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 821px)')

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false)
        setIsMenuMounted(false)
      }
    }

    mediaQuery.addEventListener('change', handleViewportChange)

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange)
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty('overflow')
      return
    }

    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => firstMenuLinkRef.current?.focus())

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 821px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const allowedAnchors = new Set(['#home', '#projects', '#studio', '#services', '#contact'])
    let animationFrame: number | null = null
    let previousScrollBehavior: string | null = null

    const stopScrollAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = null
      }

      if (previousScrollBehavior !== null) {
        document.documentElement.style.scrollBehavior = previousScrollBehavior
        previousScrollBehavior = null
      }
    }

    if (!desktopQuery.matches || reducedMotionQuery.matches) {
      return
    }

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const link = target.closest('a') as HTMLAnchorElement | null
      if (!link) {
        return
      }

      const hash = link.getAttribute('href')
      if (!hash || !allowedAnchors.has(hash) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const targetId = hash.slice(1)
      const section = document.getElementById(targetId)
      if (!section) {
        return
      }

      event.preventDefault()
      stopScrollAnimation()

      const siteHeader = document.querySelector('.site-header')
      const nav = siteHeader?.querySelector('.main-nav') as HTMLElement | null
      const headerOffset = nav ? nav.getBoundingClientRect().height + 28 : 110
      const startY = window.scrollY
      const targetY = section.getBoundingClientRect().top + startY - headerOffset
      const distance = targetY - startY

      if (Math.abs(distance) < 2) {
        window.history.pushState(null, '', hash)
        return
      }

      const duration = 760
      const easeOutCubic = (time: number) => 1 - (1 - time) ** 3
      let startTime: number | null = null
      previousScrollBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'

      const tick = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp
        }

        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = easeOutCubic(progress)

        window.scrollTo({ top: startY + distance * eased, behavior: 'auto' })

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick)
          return
        }

        animationFrame = null
        document.documentElement.style.scrollBehavior = previousScrollBehavior ?? ''
        previousScrollBehavior = null
        window.history.pushState(null, '', hash)
      }

      animationFrame = window.requestAnimationFrame(tick)
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      stopScrollAnimation()
    }
  }, [])

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      window.setTimeout(() => setIsMenuMounted(false), 280)
      menuButtonRef.current?.focus()
      return
    }

    setIsMenuMounted(true)
    requestAnimationFrame(() => setIsMenuOpen(true))
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    window.setTimeout(() => setIsMenuMounted(false), 280)
  }

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="header-shell">
        <nav className="main-nav" aria-label="Main navigation">
          <div className="nav-group nav-brand">
            <a href="#home" className="brand-mark" aria-label="Atelier home">
              Atelier
            </a>
          </div>

          <div className="nav-group nav-links desktop-only" aria-label="Primary navigation links">
            {primaryLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-group nav-actions">
            <a href="#contact" className="nav-link nav-link-contact desktop-only">
              Contact
            </a>

            <button
              type="button"
              ref={menuButtonRef}
              className={`menu-toggle ${isMenuOpen ? 'menu-toggle--open' : ''}`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              <span className="menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>

        {isMenuMounted && (
          <>
            <button
              type="button"
              className="mobile-menu-backdrop"
              aria-label="Close menu"
              onClick={closeMenu}
            />
            <div
              id="mobile-menu"
              className={`mobile-menu mobile-menu--cinematic ${isMenuOpen ? 'is-open' : 'is-closing'}`}
              aria-hidden={!isMenuOpen}
            >
          <nav aria-label="Mobile navigation">
            <ul>
              {mobileLinks.map((link) => (
                <li key={link.label}>
                  <a
                    ref={link === mobileLinks[0] ? firstMenuLinkRef : undefined}
                    href={link.href}
                    tabIndex={isMenuOpen ? 0 : -1}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
            </div>
          </>
        )}
      </div>
      <style>{`
        .mobile-menu-backdrop {
          display: none;
        }

        .mobile-menu--cinematic {
          display: none;
        }

        @media (max-width: 820px) {
          .site-header:has(.mobile-menu--cinematic) {
            isolation: isolate;
          }

          .main-nav {
            position: relative;
            z-index: 2;
          }

          .menu-toggle--open .menu-icon span:nth-child(1) {
            top: 5px;
            transform: rotate(45deg);
          }

          .menu-toggle--open .menu-icon span:nth-child(2) {
            opacity: 0;
            transform: translateX(5px);
          }

          .menu-toggle--open .menu-icon span:nth-child(3) {
            top: 5px;
            transform: rotate(-45deg);
          }

          .mobile-menu-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background: rgba(29, 26, 23, 0.08);
            border: 0;
            opacity: 0;
            animation: mobile-menu-backdrop-in 280ms ease forwards;
          }

          .mobile-menu--cinematic {
            display: block;
            position: absolute;
            top: calc(100% + 10px);
            left: 0;
            right: 0;
            z-index: 3;
            overflow: hidden;
            max-height: none;
            padding: 10px;
            border: 1px solid var(--panel-border);
            border-radius: 20px;
            background: rgba(245, 241, 234, 0.92);
            box-shadow: 0 18px 44px rgba(25, 18, 12, 0.12);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            clip-path: inset(0 0 100% 0 round 20px);
            opacity: 0;
            transform: translateY(-8px) scaleY(0.96);
            transform-origin: top center;
            transition: clip-path 280ms ease, opacity 220ms ease, transform 280ms ease;
          }

          .mobile-menu--cinematic.is-open {
            clip-path: inset(0 0 0 0 round 20px);
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }

          .mobile-menu--cinematic.is-closing {
            pointer-events: none;
          }

          .mobile-menu--cinematic nav {
            padding: 2px;
          }

          .mobile-menu--cinematic ul {
            gap: 2px;
          }

          .mobile-menu--cinematic li {
            opacity: 0;
            transform: translateY(-8px);
          }

          .mobile-menu--cinematic.is-open li {
            animation: mobile-menu-link-in 260ms ease forwards;
          }

          .mobile-menu--cinematic.is-open li:nth-child(1) { animation-delay: 70ms; }
          .mobile-menu--cinematic.is-open li:nth-child(2) { animation-delay: 95ms; }
          .mobile-menu--cinematic.is-open li:nth-child(3) { animation-delay: 120ms; }
          .mobile-menu--cinematic.is-open li:nth-child(4) { animation-delay: 145ms; }

          .mobile-menu--cinematic.is-closing li {
            opacity: 0;
            transform: translateY(-5px);
            transition: opacity 100ms ease, transform 160ms ease;
          }
        }

        @keyframes mobile-menu-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mobile-menu-link-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-menu-backdrop,
          .mobile-menu--cinematic,
          .mobile-menu--cinematic li,
          .menu-icon span {
            animation: none !important;
            transition: none !important;
          }

          .mobile-menu--cinematic {
            clip-path: inset(0 0 0 0 round 20px);
            opacity: 1;
            transform: none;
          }

          .mobile-menu--cinematic li {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </header>
  )
}
