"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, useInView, motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { BrandBackground, BrandTextPanel } from "./brand-motif"
import PlotCenter3D from "./plot-center-3d"

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [signatureDrawn, setSignatureDrawn] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // --- EFECTO INMERSIVO 3D INTERACTIVO ---
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { stiffness: 80, damping: 30, mass: 0.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Rotación del contenedor principal
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-8deg", "8deg"])

  // Parallax para el fondo
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], ["-3%", "3%"])
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], ["-3%", "3%"])
  
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ["100%", "0%"])
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ["100%", "0%"])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    // Sin tilt en touch / coarse pointer (celulares y tablets)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return
    }
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1.2, 1, 0.2])
  const imageY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, -200])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0])

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setSignatureDrawn(true), 800)
    }
  }, [isInView])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = rect.height
        const scrolled = -rect.top
        const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1)
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getTextTransform = () => {
    if (scrollProgress < 0.2) {
      const progress = scrollProgress / 0.2
      return {
        opacity: progress,
        transform: `translateX(${(1 - progress) * -50}px)`,
      }
    }
    return {
      opacity: 1,
      transform: "translateX(0px)",
    }
  }

  return (
    <section
      id="mission"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] bg-white text-plot-ink py-16 sm:py-20 md:py-24 flex items-center justify-center overflow-hidden"
      style={{ perspective: 1200 }}
    >
      <BrandBackground variant="arcs-field" intensity={1} veil={0.12} />
      <motion.div 
        className="absolute inset-[-5%] pointer-events-none z-0 hidden md:block"
        style={{ x: bgX, y: bgY }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(252,220,50,0.25), transparent 45%)`
          }}
        />
      </motion.div>

      {/* CONTENIDO PRINCIPAL (FLOTANTE EN 3D) */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        
        {/*
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3 border-2 border-white/20 rounded-full px-6 py-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-lorenzo-accent">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">TEAM LORENZO SINCE 2020</span>
          </div>
        </div>
        */}

        <div 
          className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 flex items-center justify-center mt-10 sm:mt-16 mx-auto"
          style={{ transform: "translateZ(80px)" }}
        >

          <PlotCenter3D />
        </div>
        
        <div 
          className="text-center mt-8 sm:mt-12 group cursor-default max-w-5xl mx-auto"
          style={{ transform: "translateZ(40px)" }}
        >
          <BrandTextPanel className="text-left md:text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-balance leading-[1.15] xl:text-6xl text-plot-ink">
              DESDE 2017 TRANSFORMAMOS{" "}
              <span className="text-brand-orange">ideas</span>
              <br />
              EN SOLUCIONES GRÁFICAS DE{" "}
              <span className="text-brand-pink">alto impacto</span>,
              <br />
              INTEGRANDO CREATIVIDAD,
              <br />
              TECNOLOGÍA Y GESTIÓN PROFESIONAL.
            </h2>
          </BrandTextPanel>
        </div>

        {/* Signature animation */}
        {/*
        <div className="relative h-32 flex items-center justify-center mt-16">
          
          <svg width="400" height="150" viewBox="0 0 400 150" className="w-full max-w-md">
            <motion.path
              d="M30,75 Q60,40 110,75 T220,75 Q250,95 310,65 Q340,45 370,75 M200,90 Q220,110 250,90"
              fill="none"
              stroke="#c8f550"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={signatureDrawn ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
        */}
      </motion.div>
    </section>
  )
}
