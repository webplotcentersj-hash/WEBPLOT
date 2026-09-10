"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground } from "@/components/brand-motif"
import { brand } from "@/lib/brand"
import { WHATSAPP_URL } from "@/lib/contact"

/** Galería — fotos del carrusel de plotcenter.com.ar/diseno-grafico */
const GALLERY_IMAGES = [
  "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-129.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-130.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-131.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-133.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-134.png",
]

const SERVICES_CONTENT = {
  identidad: {
    title: "IDENTIDAD",
    description:
      "Desarrollo de identidades visuales y creación de marcas. Investigamos, definimos y construimos sistemas gráficos coherentes con los valores de cada proyecto.",
    accent: brand.pink,
  },
  piezas: {
    title: "PIEZAS GRÁFICAS",
    description:
      "Diseño y maquetación de folletos, tarjetas personales, carpetas institucionales y material promocional. Piezas personalizadas desde cero con impacto estético y claridad comunicacional.",
    accent: brand.orange,
  },
  preprensa: {
    title: "PRE-PRENSA",
    description:
      "Preparación de originales para impresión: color, resolución, márgenes y sangrados. Acompañamos decisiones de diseño, formatos y materiales para un resultado técnico impecable.",
    accent: brand.cyan,
  },
}

const FEATURES = [
  "Asesoramiento gráfico para optimizar el resultado visual y técnico de cada proyecto",
  "Diseño desde cero de piezas gráficas personalizadas",
  "Desarrollo de identidades visuales y creación de marcas",
  "Diseño y maquetación de folletos, tarjetas, carpetas y material promocional",
  "Preparación de originales para impresión (pre-prensa)",
  "Acompañamiento en decisiones de diseño, formatos y materiales",
]

const TextReveal = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ")
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
        hidden: {},
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-3">
          <motion.span
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function DisenoGraficoPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof SERVICES_CONTENT>("identidad")
  const active = SERVICES_CONTENT[activeTab]
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)

  const getCoverflowStyle = (index: number) => {
    const diff = index - currentIndex
    const absDiff = Math.abs(diff)
    const direction = diff > 0 ? 1 : -1
    const step =
      typeof window !== "undefined" && window.innerWidth < 640 ? 42 : window.innerWidth < 1024 ? 72 : 100
    const far =
      typeof window !== "undefined" && window.innerWidth < 640 ? 160 : 400

    if (diff === 0) {
      return { x: 0, rotateY: 0, z: 150, scale: 1, opacity: 1, zIndex: 50 }
    }
    if (absDiff > 3) return { x: direction * far, opacity: 0, zIndex: 0, scale: 0.7 }

    return {
      x: direction * (absDiff * step),
      rotateY: -direction * (typeof window !== "undefined" && window.innerWidth < 640 ? 8 : 15),
      z: -absDiff * 40,
      scale: 1 - absDiff * 0.08,
      opacity: 1 - absDiff * 0.15,
      zIndex: 40 - absDiff,
    }
  }

  return (
    <main className="min-h-screen text-plot-ink relative overflow-x-clip bg-plot-bg">
      <Header />
      <>
        {/* Fondo de marca (geometría PC) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BrandBackground variant="mosaic" intensity={1} veil={0.08} />
          <div
            className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
            style={{
              backgroundImage: 'url("/images/fondo-brand.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/55 to-white/80" />
        </div>

        {/* HERO */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 min-h-[70svh] sm:min-h-[75vh] flex flex-col justify-center items-center z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-[1280px] mx-auto w-full relative z-10 text-center flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-5xl relative"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-plot-ink/50 mb-6 font-medium flex items-center justify-center gap-4">
                <span className="w-8 h-px bg-brand-orange" />
                Servicios
                <span className="w-8 h-px bg-brand-cyan" />
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[4.5rem] font-display uppercase leading-[0.95] mb-8 tracking-tight text-plot-ink">
                <TextReveal text="Te ayudamos a" />
                <br />
                <span className="text-brand-orange">
                  <TextReveal text="destacarte" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-plot-ink/70 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                Damos forma visual a las ideas: impacto estético, claridad comunicacional y
                preparación técnica para una impresión impecable.
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-orange text-plot-ink font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
              >
                Consultar proyecto
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* FEATURES + TABS — columnas de igual altura */}
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative z-10">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative h-full min-h-[420px] lg:min-h-0 flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 backdrop-blur-md border border-brand-navy/10 p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.18)] transition-[box-shadow,border-color] duration-300 hover:border-brand-pink/35 hover:shadow-[0_28px_60px_-24px_rgba(232,75,147,0.35)] overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                style={{ background: `${brand.pink}33` }}
                aria-hidden
              />
              <h2 className="relative text-3xl md:text-4xl font-display uppercase tracking-tight text-plot-ink mb-4">
                Qué <span className="text-brand-pink">hacemos</span>
              </h2>
              <p className="relative text-plot-ink/65 font-medium mb-6 leading-relaxed">
                Diseño gráfico con criterio estético y preparación técnica para cada pieza:
              </p>
              <ul className="relative flex-1 flex flex-col justify-between gap-1">
                {FEATURES.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                    whileHover={{ x: 6 }}
                    className="flex gap-3 items-center text-plot-ink/80 font-medium leading-snug rounded-xl px-2 py-2 -mx-2 cursor-default transition-colors hover:bg-brand-pink/8 hover:text-plot-ink"
                  >
                    <motion.span
                      whileHover={{ scale: 1.12, rotate: 8 }}
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: brand.pink }}
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </motion.span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="flex flex-col gap-3 h-full min-h-[420px] lg:min-h-0">
              <div className="relative flex-[1.4] min-h-[260px] sm:min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col rounded-[1.5rem] sm:rounded-[2rem] text-white p-6 sm:p-8 overflow-hidden shadow-[0_20px_50px_-20px_rgba(26,30,56,0.35)]"
                    style={{
                      background: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navy2} 55%, ${active.accent}33 100%)`,
                    }}
                  >
                    <motion.div
                      className="pointer-events-none absolute -bottom-16 -right-10 w-48 h-48 rounded-full blur-3xl opacity-50"
                      style={{ background: active.accent }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
                      transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      aria-hidden
                    />
                    <h3 className="relative text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-tight leading-tight mb-3 shrink-0">
                      {active.title}
                    </h3>
                    <motion.div
                      key={`${activeTab}-bar`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-16 sm:w-20 h-1.5 rounded-full mb-4 origin-left shrink-0"
                      style={{ background: active.accent }}
                    />
                    <p className="relative flex-1 min-h-0 text-sm sm:text-base md:text-[1.05rem] text-white/90 leading-relaxed font-medium text-pretty">
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-rows-3 gap-3 flex-1 min-h-[240px]">
                {(Object.keys(SERVICES_CONTENT) as Array<keyof typeof SERVICES_CONTENT>).map(
                  (tab, index) => {
                    const item = SERVICES_CONTENT[tab]
                    const isActive = activeTab === tab
                    return (
                      <motion.button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
                        whileHover={{ x: 4, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        className={`group/btn relative h-full min-h-[72px] w-full text-left px-5 sm:px-6 py-0 rounded-2xl border bg-white/95 overflow-hidden flex items-center ${
                          isActive ? "" : "border-brand-navy/10"
                        }`}
                        style={
                          isActive
                            ? {
                                borderColor: item.accent,
                                boxShadow: `0 14px 32px -14px ${item.accent}66`,
                              }
                            : undefined
                        }
                      >
                        <motion.span
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(105deg, ${item.accent}14 0%, transparent 55%)`,
                          }}
                          aria-hidden
                        />
                        {isActive && (
                          <motion.span
                            layoutId="diseno-grafico-active-bar"
                            className="absolute left-0 top-2 bottom-2 w-1 rounded-full"
                            style={{ background: item.accent }}
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                          />
                        )}
                        <span className="relative flex items-center gap-3 w-full">
                          <motion.span
                            animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                            whileHover={{ rotate: -8, scale: 1.1 }}
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-black text-plot-ink"
                            style={{
                              background: isActive ? item.accent : `${item.accent}33`,
                            }}
                          >
                            0{index + 1}
                          </motion.span>
                          <h3 className="text-base sm:text-lg md:text-xl font-display uppercase tracking-wide text-plot-ink leading-tight">
                            {item.title}
                          </h3>
                        </span>
                      </motion.button>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="py-20 md:py-28 relative z-10 overflow-hidden border-y border-brand-navy/10 bg-brand-navy">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'url("/images/fondo-brand.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-navy/75 pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto text-center mb-16 md:mb-24 px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-4"
            >
              Nuestros{" "}
              <span className="text-brand-yellow lowercase tracking-normal">proyectos</span>
            </motion.h2>
            <p className="text-white/65 max-w-2xl mx-auto text-lg font-medium">
              Identidades, piezas impresas y sistemas gráficos con la energía Plot.
            </p>
          </div>

          <div className="relative h-[min(58svh,380px)] sm:h-[420px] md:h-[560px] flex items-center justify-center perspective-[2000px] overflow-x-clip">
            {GALLERY_IMAGES.map((src, index) => {
              const styles = getCoverflowStyle(index)
              const isActive = index === currentIndex

              return (
                <motion.div
                  key={src}
                  initial={false}
                  animate={{
                    x: styles.x,
                    rotateY: styles.rotateY,
                    z: styles.z,
                    scale: styles.scale,
                    opacity: styles.opacity,
                    zIndex: styles.zIndex,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                  className="absolute w-[min(92vw,720px)] max-w-full aspect-[4/3] origin-center cursor-pointer group"
                  onClick={() => {
                    if (isActive) setLightboxImage(src)
                    else setCurrentIndex(index)
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.55)] border border-white/15 bg-brand-navy">
                    <img
                      src={src}
                      alt={`Diseño gráfico ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-brand-navy/35" />
                    )}
                  </div>
                </motion.div>
              )
            })}

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-5 z-50">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/10 border border-white/15 text-white"
                aria-label="Anterior"
              >
                <ChevronLeft size={28} />
              </button>
              <div className="flex gap-2">
                {GALLERY_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-400 ${
                      i === currentIndex
                        ? "w-10 bg-brand-orange"
                        : "w-2 bg-white/35"
                    }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/10 border border-white/15 text-white"
                aria-label="Siguiente"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-3xl mx-auto text-center rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-6 sm:p-8 md:p-14 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.2)]">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4">
              Listos para tu <span className="text-brand-orange">próxima pieza</span>
            </h2>
            <p className="text-plot-ink/65 text-lg mb-8 font-medium">
              Contanos tu idea y la transformamos en comunicación visual de alto impacto.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-navy text-white font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
            >
              Hablanos
            </a>
          </div>
        </section>
      </>
      <Footer />

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-navy/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white z-50"
              onClick={() => setLightboxImage(null)}
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Pieza ampliada"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
