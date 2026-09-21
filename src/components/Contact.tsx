import { useEffect, useRef, useState } from 'react'
import { Modal } from './Modal'

export const CONTACT_EMAIL = 'hello@REPLACE-WITH-DOMAIN.com'
export const CONTACT_PHONE = '+91 XX XXX XXX XX'

type ModalView = 'contact' | 'privacy' | 'terms' | 'accessibility' | null

export function Contact() {
  const contactRef = useRef<HTMLElement>(null)
  const contactCtaRef = useRef<HTMLButtonElement>(null)
  const privacyTriggerRef = useRef<HTMLButtonElement>(null)
  const termsTriggerRef = useRef<HTMLButtonElement>(null)
  const accessibilityTriggerRef = useRef<HTMLButtonElement>(null)
  const [activeModal, setActiveModal] = useState<ModalView>(null)

  useEffect(() => {
    const section = contactRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!section) {
      return
    }

    const reveals = Array.from(section.querySelectorAll<HTMLElement>('[data-contact-reveal]'))

    if (reducedMotion.matches) {
      reveals.forEach((element) => element.classList.add('is-visible'))
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
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    reveals.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section ref={contactRef} id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-shell">
          <div className="contact-main">
            <p className="contact-label" data-contact-reveal>
              CONTACT
            </p>
            <div className="contact-statement" data-contact-reveal>
              <h2 id="contact-title">
                LET&apos;S MAKE
                <span>SPACE.</span>
              </h2>
              <p className="contact-copy">Have a project in mind? We&apos;d like to hear about it.</p>
              <button className="contact-cta" type="button" onClick={() => setActiveModal('contact')} ref={contactCtaRef}>
                <span>START A CONVERSATION</span>
                <span className="contact-cta-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
            <div className="contact-meta" data-contact-reveal>
              <div>
                <span>EMAIL</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                <span>LOCATION</span>
                <p>Chennai / India</p>
              </div>
              <div>
                <span>SOCIAL</span>
                <a href="#contact">Instagram ↗</a>
              </div>
            </div>
          </div>

          <p className="contact-index" data-contact-reveal>
            01 / 01
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-shell">
          <div className="footer-grid">
            <div className="footer-brand">
              <p className="footer-heading">ATELIER</p>
              <p>INTERIOR ARCHITECTURE + DESIGN</p>
            </div>

            <nav className="footer-nav" aria-label="Footer navigation">
              <p className="footer-heading">NAVIGATION</p>
              <a href="#projects">PROJECTS</a>
              <a href="#studio">STUDIO</a>
              <a href="#services">SERVICES</a>
              <a href="#contact">CONTACT</a>
            </nav>

            <div className="footer-contact">
              <p className="footer-heading">CONTACT</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>EMAIL</a>
              <p>LOCATION</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 ATELIER. ALL RIGHTS RESERVED.</p>
            <nav className="footer-legal" aria-label="Legal navigation">
              <button type="button" onClick={() => setActiveModal('privacy')} ref={privacyTriggerRef}>PRIVACY POLICY</button>
              <button type="button" onClick={() => setActiveModal('terms')} ref={termsTriggerRef}>TERMS</button>
              <button type="button" onClick={() => setActiveModal('accessibility')} ref={accessibilityTriggerRef}>ACCESSIBILITY</button>
            </nav>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={activeModal === 'contact'}
        title="LET&apos;S TALK."
        labelledBy="contact-modal-title"
        onClose={() => setActiveModal(null)}
        returnFocusRef={contactCtaRef}
      >
        <p className="modal-lead">Have a project in mind? We&apos;d like to hear about it.</p>
        <div className="modal-contact-list">
          <div>
            <span>EMAIL</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div>
            <span>PHONE</span>
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>{CONTACT_PHONE}</a>
          </div>
        </div>
        <p className="modal-placeholder-note">Prototype contact details — replace before launch.</p>
      </Modal>

      <Modal
        isOpen={activeModal === 'privacy'}
        title="PRIVACY POLICY"
        labelledBy="privacy-modal-title"
        onClose={() => setActiveModal(null)}
        returnFocusRef={privacyTriggerRef}
      >
        <p className="modal-notice">PROTOTYPE POLICY — REPLACE WITH FINAL LEGAL COPY BEFORE LAUNCH</p>
        <div className="modal-legal-copy">
          <h3>Information We Collect</h3>
          <p>This prototype does not provide finalized descriptions of information collection. Confirm the appropriate details before launch.</p>
          <h3>How Information Is Used</h3>
          <p>Describe how information submitted through approved contact channels may be reviewed and responded to.</p>
          <h3>Contact</h3>
          <p>For questions about this prototype policy, use <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        title="TERMS"
        labelledBy="terms-modal-title"
        onClose={() => setActiveModal(null)}
        returnFocusRef={termsTriggerRef}
      >
        <p className="modal-notice">PROTOTYPE TERMS — REPLACE WITH FINAL LEGAL COPY BEFORE LAUNCH</p>
        <div className="modal-legal-copy">
          <h3>Use of This Website</h3>
          <p>Use this prototype for general information about the studio and its work. Final terms should describe permitted use clearly.</p>
          <h3>Intellectual Property</h3>
          <p>Identify the ownership and permitted use of the website content, imagery, and materials before launch.</p>
          <h3>Project Information</h3>
          <p>Information shared about a potential project should be reviewed under final terms prepared for the studio.</p>
          <h3>Contact</h3>
          <p>Questions about these prototype terms can be directed to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'accessibility'}
        title="ACCESSIBILITY"
        labelledBy="accessibility-modal-title"
        onClose={() => setActiveModal(null)}
        returnFocusRef={accessibilityTriggerRef}
      >
        <p className="modal-notice">PROTOTYPE STATEMENT — REVIEW AND FINALIZE BEFORE LAUNCH</p>
        <div className="modal-legal-copy">
          <p>This prototype is intended to support keyboard navigation, readable contrast, semantic structure, reduced-motion preferences, and accessible interactive controls.</p>
          <p>Review the complete experience with people who use assistive technology and finalize this statement before launch.</p>
        </div>
      </Modal>
    </>
  )
}
