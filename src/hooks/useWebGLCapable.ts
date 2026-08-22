import { useState } from 'react'

function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * True only when it's safe to mount a WebGL layer: WebGL actually works,
 * the user hasn't asked for reduced motion, and the viewport is wide
 * enough that a 3D backdrop is worth the bundle cost. See
 * docs/redesign/00-overview.md "Fallback strategy" — anything false here
 * means the existing 2D design stays exactly as it is, unchanged.
 */
export function useWebGLCapable(minWidth = 560) {
  const [capable] = useState(() => {
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const wideEnough = window.innerWidth >= minWidth
      return !prefersReducedMotion && wideEnough && detectWebGLSupport()
    } catch {
      // Any missing/throwing capability API (e.g. matchMedia in a test
      // environment) means we can't confirm it's safe to mount WebGL, so
      // fall back to the 2D design rather than risk a broken render.
      return false
    }
  })

  return capable
}
