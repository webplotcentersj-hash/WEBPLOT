/** Shared WebGL performance helpers */

export function getWebGLPixelRatio(cap = 1.25) {
  if (typeof window === "undefined") return 1
  return Math.min(window.devicePixelRatio || 1, cap)
}

export type VisibilityGate = {
  readonly visible: boolean
  disconnect: () => void
}

/** Pausa trabajo GPU cuando el contenedor no está en viewport */
export function createVisibilityGate(
  element: HTMLElement,
  rootMargin = "120px"
): VisibilityGate {
  let visible = true
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
    },
    { rootMargin, threshold: 0 }
  )
  observer.observe(element)
  return {
    get visible() {
      return visible
    },
    disconnect: () => observer.disconnect(),
  }
}

export function shouldEnableHeavyEffects() {
  if (typeof window === "undefined") return false
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const finePointer = window.matchMedia("(pointer: fine)").matches
  const cores = navigator.hardwareConcurrency || 4
  return !reduce && finePointer && cores >= 4
}
