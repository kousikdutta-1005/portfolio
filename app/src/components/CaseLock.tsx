import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react"
import { Lock } from "lucide-react"

type CaseLockProps = {
  storageKey: string
  passphrase: string
  title: string
  note: string
  children: ReactNode
}

/**
 * Blurs a region until a passphrase is entered.
 *
 * The check runs in the browser, so this is a signal that the work is
 * confidential rather than real access control. It keeps casual visitors out
 * and makes the boundary explicit.
 */
export function CaseLock({ storageKey, passphrase, title, note, children }: CaseLockProps) {
  // Always render locked first so the prerendered markup and the first client
  // render agree. The stored state is applied immediately after mount.
  const [unlocked, setUnlocked] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const errorId = useId()

  useEffect(() => {
    try {
      if (window.localStorage.getItem(storageKey) === "1") setUnlocked(true)
    } catch {
      // Private mode or blocked storage. Stay locked; the form still works.
    }
  }, [storageKey])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (value.trim().toLowerCase() !== passphrase.toLowerCase()) {
      setError(true)
      inputRef.current?.focus()
      inputRef.current?.select()
      return
    }
    setError(false)
    setUnlocked(true)
    try {
      window.localStorage.setItem(storageKey, "1")
    } catch {
      // Not being able to remember the unlock is not worth failing over.
    }
  }

  if (unlocked) return <>{children}</>

  return (
    <div className="case-lock">
      <div className="case-lock-panel">
        <form className="case-lock-card" onSubmit={onSubmit}>
          <span className="case-lock-icon" aria-hidden="true">
            <Lock className="w-4 h-4" />
          </span>
          <h2 className="case-lock-title">{title}</h2>
          <p className="case-lock-note">{note}</p>

          <label className="case-lock-label" htmlFor={inputId}>
            Passphrase
          </label>
          <div className="case-lock-row">
            <input
              id={inputId}
              ref={inputRef}
              className="case-lock-input"
              type="password"
              value={value}
              autoComplete="off"
              data-allow-select
              aria-invalid={error}
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => {
                setValue(event.target.value)
                if (error) setError(false)
              }}
            />
            <button type="submit" className="case-lock-submit">
              Unlock
            </button>
          </div>

          <p className="case-lock-error" id={errorId} role="alert">
            {error ? "That passphrase does not match. Try again." : ""}
          </p>

          <p className="case-lock-ask">
            Do not have it? Email{" "}
            <a href="mailto:design.kousik@gmail.com" data-allow-select>
              design.kousik@gmail.com
            </a>{" "}
            and I will share it.
          </p>
        </form>
      </div>

      <div className="case-lock-body" inert aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
