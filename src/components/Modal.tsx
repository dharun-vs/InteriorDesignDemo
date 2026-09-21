import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  isOpen: boolean
  title: string
  labelledBy: string
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
  children: ReactNode
}

export function Modal({ isOpen, title, labelledBy, onClose, returnFocusRef, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const root = document.getElementById('root')
    const hadInertAttribute = root?.hasAttribute('inert') ?? false
    const previousOverflow = document.body.style.overflow
    const returnFocusElement = returnFocusRef.current

    root?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'

    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-modal-close]')?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow

      if (root && !hadInertAttribute) {
        root.removeAttribute('inert')
      }

      returnFocusElement?.focus()
    }
  }, [isOpen, onClose, returnFocusRef])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id={labelledBy}>{title}</h2>
          <button className="modal-close" type="button" onClick={onClose} data-modal-close aria-label={`Close ${title} dialog`}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
