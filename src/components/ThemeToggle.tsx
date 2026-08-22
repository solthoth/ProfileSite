import { useEffect, useState } from 'react'

type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme'
const NEXT_MODE: Record<ThemeMode, ThemeMode> = { system: 'light', light: 'dark', dark: 'system' }

function readStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Privacy mode or storage disabled - fall back to system.
  }
  return 'system'
}

/**
 * Cycles system -> light -> dark -> system, matching the three states
 * src/index.css already defines: no data-theme attribute (follow
 * prefers-color-scheme), data-theme="light", data-theme="dark".
 */
export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(readStoredMode)

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', mode)
    }
    try {
      if (mode === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // Privacy mode or storage disabled - theme just won't persist.
    }
  }, [mode])

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setMode(NEXT_MODE[mode])}
      aria-label={`Theme: ${mode}. Click to switch.`}
    >
      theme: {mode}
    </button>
  )
}
