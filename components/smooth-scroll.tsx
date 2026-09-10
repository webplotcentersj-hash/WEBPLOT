"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // En móviles / reduced-motion: scroll nativo (mucho más liviano)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    if (reduce || coarse) return

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Exponer para resetear scroll en cambios de ruta
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    lenis.on("scroll", ScrollTrigger.update)

    // Recalcular triggers cuando Lenis estabiliza el layout
    requestAnimationFrame(() => ScrollTrigger.refresh())

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis
      lenis.off("scroll", ScrollTrigger.update)
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Al entrar a otra página (p. ej. un servicio), empezar arriba — no en el footer
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
    }
  }, [pathname])

  return <>{children}</>
}
