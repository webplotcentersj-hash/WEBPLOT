"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"
import { BrandBackground, BrandStripeBar } from "./brand-motif"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Paso a oscuro breve: escala + grayscale en el primer tramo del scroll
  const scale = useTransform(smoothProgress, [0, 0.12], [1, 0.45])
  const grayscale = useTransform(smoothProgress, [0, 0.12], ["0%", "100%"])
  const textOpacity = useTransform(smoothProgress, [0, 0.08], [0, 1])
  const exitOpacity = useTransform(smoothProgress, [0.82, 1], [1, 0])

  return (
    <section ref={containerRef} className="relative h-[140vh] sm:h-[160vh] md:h-[180vh] bg-white overflow-x-clip">
      <BrandStripeBar className="fixed top-0 left-0 right-0 z-[60] hidden sm:block" />
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center bg-white">
        <BrandBackground variant="frame-white" intensity={1} veil={0.12} />

        <motion.div
          className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ opacity: exitOpacity }}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center opacity-0 z-10 px-2"
            style={{ opacity: textOpacity }}
          >
            <SignatureMarqueeSection />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center max-w-[100vw]"
          style={{
            scale,
            opacity: exitOpacity,
            filter: useMotionTemplate`grayscale(${grayscale})`,
          }}
        >
          {isReady && <InteractivePortrait />}
        </motion.div>
      </div>
    </section>
  )
}
