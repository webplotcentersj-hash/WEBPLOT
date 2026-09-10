"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Check,
  MapPin,
  Maximize2,
  Shield,
  Building2,
  ExternalLink,
  Radio,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground } from "@/components/brand-motif"
import { brand } from "@/lib/brand"
import { WHATSAPP_URL } from "@/lib/contact"

const MAP_EMBED = "https://vp-zeta-eight.vercel.app/embed/mapa"

const FORMATS = [
  {
    id: "01",
    tag: "Horizontal",
    title: "Carteles Municipales",
    dims: [
      { label: "Dimensión estructura", value: "150 × 112 cm" },
    ],
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Group-132.png",
    accent: brand.orange,
  },
  {
    id: "02",
    tag: "Backlight",
    title: "Chupetes Iluminados",
    dims: [
      { label: "Estructura total", value: "104 × 142 cm" },
      { label: "Área visual útil", value: "96 × 136 cm" },
    ],
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Group-134.png",
    accent: brand.cyan,
  },
  {
    id: "03",
    tag: "Vertical",
    title: "Chupetes Estándar",
    dims: [
      { label: "Estructura total", value: "104 × 142 cm" },
      { label: "Área visual útil", value: "96 × 136 cm" },
    ],
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Group-135.png",
    accent: brand.red,
  },
]

const PILLARS = [
  {
    title: "Cobertura total",
    description:
      "Red de 120 espacios estratégicamente distribuidos en los principales puntos de circulación de San Juan.",
    detail: "Impacto constante y visibilidad real todos los días.",
    icon: Maximize2,
    accent: brand.orange,
  },
  {
    title: "Operación pro",
    description:
      "Producción y montaje profesional: de la idea creativa y la planificación hasta la instalación y el seguimiento.",
    detail: "Control total, calidad garantizada y resultados medibles.",
    icon: Building2,
    accent: brand.cyan,
  },
  {
    title: "Gestión legal",
    description:
      "Concesión oficial por licitación pública, con contrato vigente por 6 años.",
    detail: "Operación formal, transparente y con exclusividad en vía pública.",
    icon: Shield,
    accent: brand.purple,
  },
]

const FEATURES = [
  "120 espacios estratégicos de alto impacto en San Juan",
  "Ubicaciones premium con cobertura urbana total",
  "Carteles municipales, chupetes iluminados y estándar",
  "Operación profesional de punta a punta",
  "Gestión privada con concesión oficial vigente",
  "Mapa interactivo para elegir y reservar ubicaciones",
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

export default function ViaPublicaPage() {
  const [activeFormat, setActiveFormat] = useState(0)
  const active = FORMATS[activeFormat]
  const [mapLoaded, setMapLoaded] = useState(false)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 120])
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0.15])

  return (
    <main className="min-h-screen text-plot-ink relative overflow-x-clip bg-plot-bg">
      <Header />
      <>
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

        {/* HERO compacto — el mapa manda */}
        <section className="relative pt-28 md:pt-36 pb-8 md:pb-10 px-4 sm:px-6 z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-[1280px] mx-auto w-full text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-plot-ink/50 mb-5 font-medium flex items-center justify-center gap-4">
                <span className="w-8 h-px bg-brand-orange" />
                Servicios
                <span className="w-8 h-px bg-brand-cyan" />
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display uppercase leading-[0.95] mb-5 tracking-tight text-plot-ink">
                <TextReveal text="Vía" />{" "}
                <span className="text-brand-orange">
                  <TextReveal text="pública" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-plot-ink/70 font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
                Se venden 120 espacios estratégicos de alto impacto. Explorá el mapa,
                elegí ubicación y proyectá tu marca en San Juan.
              </p>

              <a
                href="#mapa"
                className="inline-flex items-center gap-2 bg-brand-orange text-plot-ink font-bold px-8 py-3.5 rounded-full text-sm tracking-wide uppercase"
              >
                <MapPin className="w-4 h-4" />
                Ir al mapa
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* MAPA — pieza central */}
        <section id="mapa" className="relative z-10 px-4 sm:px-6 pb-12 md:pb-16 scroll-mt-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5 px-1">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-70" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange" />
                  </span>
                  Radar satelital en vivo
                </div>
                <h2 className="text-2xl md:text-4xl font-display uppercase tracking-tight text-plot-ink">
                  Mapa de <span className="text-brand-orange">ubicaciones</span>
                </h2>
                <p className="text-plot-ink/60 font-medium mt-1 max-w-xl">
                  Sistema geo-estratégico San Juan — navegá, filtrá y reservá desde el mapa.
                </p>
              </div>
              <a
                href={MAP_EMBED}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-brand-navy/15 bg-white/90 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-plot-ink/80 hover:bg-white"
              >
                Abrir en pantalla completa
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
              className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-brand-navy/15 bg-brand-navy shadow-[0_40px_90px_-30px_rgba(26,30,56,0.55)]"
            >
              {/* Barra tipo radar */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-brand-navy border-b border-white/10">
                <div className="flex items-center gap-2 text-white/85 text-xs sm:text-sm font-bold uppercase tracking-wide">
                  <Radio className="w-4 h-4 text-brand-orange animate-pulse" />
                  Plot Vía Pública · Mapa interactivo
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </div>
              </div>

                <div className="relative w-full h-[min(50svh,560px)] min-h-[260px] sm:min-h-[360px] md:min-h-[480px] bg-[#0f1220]">
                {!mapLoaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white/70">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-orange/40 border-t-brand-orange animate-spin" />
                    <p className="text-sm font-medium">Cargando mapa de ubicaciones…</p>
                  </div>
                )}
                <iframe
                  src={MAP_EMBED}
                  title="Mapa de ubicaciones Plot Center — Vía Pública"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="geolocation; fullscreen"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setMapLoaded(true)}
                />
              </div>
            </motion.div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Espacios", value: "120" },
                { label: "Ubicaciones", value: "Premium" },
                { label: "Cobertura", value: "Urbana" },
                { label: "Gestión", value: "Privada" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/90 border border-brand-navy/10 px-4 py-3 text-center"
                >
                  <p className="text-lg md:text-xl font-display uppercase tracking-tight text-plot-ink">
                    {stat.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-plot-ink/45">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUÉ OFRECEMOS + FORMATOS — columnas de igual altura */}
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
                Qué <span className="text-brand-pink">ofrecemos</span>
              </h2>
              <p className="relative text-plot-ink/65 font-medium mb-6 leading-relaxed">
                Red de vía pública con cobertura urbana, formatos premium y operación profesional:
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
                    key={activeFormat}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col rounded-[1.5rem] sm:rounded-[2rem] text-white overflow-hidden shadow-[0_20px_50px_-20px_rgba(26,30,56,0.35)]"
                  >
                    <div className="absolute inset-0 opacity-40">
                      <img
                        src={active.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/85 to-brand-navy/50" />
                    <motion.div
                      className="pointer-events-none absolute -bottom-16 -right-10 w-48 h-48 rounded-full blur-3xl opacity-50"
                      style={{ background: active.accent }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
                      transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      aria-hidden
                    />
                    <div className="relative h-full p-6 sm:p-8 flex flex-col justify-end">
                      <p
                        className="text-sm font-bold uppercase tracking-[0.22em] mb-2 shrink-0"
                        style={{ color: active.accent }}
                      >
                        {active.id} · {active.tag}
                      </p>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-tight leading-tight mb-3 shrink-0">
                        {active.title}
                      </h3>
                      <motion.div
                        key={`${activeFormat}-bar`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="w-16 sm:w-20 h-1.5 rounded-full mb-4 origin-left shrink-0"
                        style={{ background: active.accent }}
                      />
                      <div className="space-y-2">
                        {active.dims.map((d) => (
                          <p key={d.label} className="text-white/80 font-medium text-sm sm:text-base">
                            <span className="text-white/45 text-xs uppercase tracking-wide mr-2">
                              {d.label}
                            </span>
                            {d.value}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-rows-3 gap-3 flex-1 min-h-[240px]">
                {FORMATS.map((format, index) => {
                  const isActive = activeFormat === index
                  return (
                    <motion.button
                      key={format.id}
                      type="button"
                      onClick={() => setActiveFormat(index)}
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
                              borderColor: format.accent,
                              boxShadow: `0 14px 32px -14px ${format.accent}66`,
                            }
                          : undefined
                      }
                    >
                      <motion.span
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(105deg, ${format.accent}14 0%, transparent 55%)`,
                        }}
                        aria-hidden
                      />
                      {isActive && (
                        <motion.span
                          layoutId="via-publica-active-bar"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-full"
                          style={{ background: format.accent }}
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative flex items-center gap-3 w-full">
                        <motion.span
                          animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                          whileHover={{ rotate: -8, scale: 1.1 }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-black text-plot-ink"
                          style={{
                            background: isActive ? format.accent : `${format.accent}33`,
                          }}
                        >
                          {format.id}
                        </motion.span>
                        <h3 className="text-base sm:text-lg md:text-xl font-display uppercase tracking-wide text-plot-ink leading-tight">
                          {format.title}
                        </h3>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FORMATOS EXTERIORES grid visual */}
        <section className="py-8 md:py-12 px-6 relative z-10">
          <div className="max-w-[1280px] mx-auto mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-3">
              Formatos <span className="text-brand-orange">exteriores</span>
            </h2>
            <p className="text-plot-ink/65 text-lg font-medium max-w-2xl mx-auto">
              Estructuras diseñadas para capturar la atención urbana y maximizar el impacto
              visual de tu campaña.
            </p>
          </div>

          <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {FORMATS.map((format, i) => (
              <motion.div
                key={format.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white border border-brand-navy/10 shadow-[0_20px_50px_-24px_rgba(26,30,56,0.25)]"
              >
                <div className="aspect-[4/3] bg-brand-navy/5 p-4 sm:p-6 flex items-center justify-center">
                  <img
                    src={format.image}
                    alt={format.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                    style={{ color: format.accent }}
                  >
                    {format.tag}
                  </p>
                  <h3 className="text-xl font-display uppercase tracking-tight text-plot-ink mb-3">
                    {format.title}
                  </h3>
                  {format.dims.map((d) => (
                    <p key={d.label} className="text-sm text-plot-ink/65 font-medium">
                      {d.label}: <span className="text-plot-ink">{d.value}</span>
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PILARES */}
        <section className="py-16 md:py-24 px-6 relative z-10">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-[1.5rem] sm:rounded-[2rem] bg-white/90 backdrop-blur-md border border-brand-navy/10 p-5 sm:p-8 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.18)]"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-white"
                    style={{ background: pillar.accent }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight text-plot-ink mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-plot-ink/70 font-medium leading-relaxed mb-3">
                    {pillar.description}
                  </p>
                  <p className="text-sm font-bold text-plot-ink/50 leading-snug">
                    {pillar.detail}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* VIDEO */}
        <section className="py-8 md:py-12 px-6 relative z-10">
          <div className="max-w-[960px] mx-auto rounded-[2rem] overflow-hidden border border-brand-navy/10 bg-brand-navy shadow-[0_30px_70px_-30px_rgba(26,30,56,0.5)]">
            <video
              className="w-full h-auto block"
              controls
              playsInline
              muted
              autoPlay
              loop
              preload="auto"
              poster="https://plotcenter.com.ar/wp-content/uploads/2026/02/Group-194.png"
            >
              <source
                src="https://plotcenter.com.ar/wp-content/uploads/2025/08/07172.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-3xl mx-auto text-center rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-6 sm:p-8 md:p-14 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.2)]">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4">
              Reservá tu <span className="text-brand-orange">ubicación</span>
            </h2>
            <p className="text-plot-ink/65 text-lg mb-8 font-medium">
              Elegí en el mapa o escribinos: armamos tu campaña de vía pública de punta a punta.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#mapa"
                className="inline-flex items-center gap-2 bg-brand-orange text-plot-ink font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
              >
                <MapPin className="w-4 h-4" />
                Ver mapa
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-navy text-white font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
              >
                Hablanos
              </a>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </main>
  )
}
