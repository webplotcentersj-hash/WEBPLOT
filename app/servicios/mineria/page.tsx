"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  Shield,
  Wrench,
  Palette,
  MapPinned,
  Truck,
  Printer,
  CalendarDays,
  Signpost,
  ArrowRight,
  X,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground } from "@/components/brand-motif"
import { brand } from "@/lib/brand"
import { WHATSAPP_URL } from "@/lib/contact"

const PILLARS = [
  {
    title: "Cartelería",
    description:
      "Asesorías, fabricación e instalación de señalética homologada para minería: interior, exterior y personalización a medida.",
    icon: Signpost,
    accent: brand.orange,
    href: "#carteleria",
  },
  {
    title: "Imprenta digital",
    description:
      "Rapidez, volumen y precisión: manuales, folletos, talonarios y papelería corporativa con respuesta inmediata.",
    icon: Printer,
    accent: brand.cyan,
    href: "#imprenta",
  },
  {
    title: "Presencia en eventos",
    description:
      "La minería tiene su escenario: diseñamos y producimos stands que atraen miradas y transmiten identidad.",
    icon: CalendarDays,
    accent: brand.purple,
    href: "/servicios/stand",
  },
  {
    title: "Vía pública",
    description:
      "Espacios estratégicos de alto impacto para campañas con cobertura urbana y operación profesional.",
    icon: MapPinned,
    accent: brand.red,
    href: "/servicios/via-publica",
  },
  {
    title: "Ploteo vehicular",
    description:
      "Seguridad, durabilidad e impacto: flotas con identidad de marca y marcas reglamentarias de seguridad.",
    icon: Truck,
    accent: brand.yellow,
    href: "#ploteo",
  },
]

const CARTELERIA = [
  {
    title: "Materiales homologados",
    description:
      "Cartelería fabricada con materiales homologados para soportar condiciones exigentes y cumplir normativas nacionales e internacionales.",
    icon: Shield,
    accent: brand.orange,
  },
  {
    title: "Servicio de instalación",
    description:
      "Equipo capacitado para instalar señales con precisión, protocolos de seguridad y plazos claros en campo.",
    icon: Wrench,
    accent: brand.cyan,
  },
  {
    title: "Personalización a medida",
    description:
      "Además de señales estándar, desarrollamos soluciones gráficas adaptadas a cada operación minera.",
    icon: Palette,
    accent: brand.pink,
  },
  {
    title: "Señalética interior y exterior",
    description:
      "Señalización interna para organización y flujos, y exterior resistente para seguridad en cada paso del camino.",
    icon: Signpost,
    accent: brand.purple,
  },
]

const IMPRENTA = [
  {
    title: "Manuales",
    description:
      "Producción de manuales claros y concisos que cumplen normativas de seguridad, esenciales para capacitación y entrenamiento.",
    href: "/servicios/mineria/manuales",
  },
  {
    title: "Folletos y catálogos",
    description:
      "Diseño e impresión de materiales promocionales que destacan servicios, productos y capacidades de tu empresa.",
    href: "/servicios/mineria/folletos-y-catalogos",
  },
  {
    title: "Talonarios de calidad y procesos",
    description:
      "Documentación operativa impresa con precisión, pensada para procesos, controles y trazabilidad en planta.",
    href: "/servicios/mineria/talonarios",
  },
  {
    title: "Tarjetas y papelería corporativa",
    description:
      "Identidad impresa de alto nivel: tarjetas de presentación y papelería alineada a la marca corporativa.",
    href: "/servicios/mineria/papeleria-corporativa",
  },
]

const PLOTEO = [
  {
    title: "Evaluación y asesoramiento",
    description:
      "Analizamos la comunicación visual de cada flota y asesoramos para cumplir objetivos de marca y requerimientos del sector.",
  },
  {
    title: "Materiales resistentes",
    description:
      "Materiales certificados, resistentes al polvo, temperaturas extremas, abrasión y agentes químicos.",
  },
  {
    title: "Instalación profesional",
    description:
      "Personal calificado y equipamiento propio: precisión en cada montaje y cumplimiento de plazos y protocolos.",
  },
]

const FEATURES = [
  "Seguridad, eficiencia y respuesta rápida",
  "Equipo multidisciplinario de idea a instalación",
  "Cartelería homologada para condiciones extremas",
  "Imprenta digital de alto volumen y precisión",
  "Ploteo vehicular con marca y normativa de seguridad",
  "Stands y presencia en eventos del sector minero",
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

const CARTELERIA_PHOTOS = [
  {
    src: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-01.png",
    alt: "Cartelería industrial instalada",
  },
  {
    src: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-02.png",
    alt: "Instalación de cartelería en campo",
  },
  {
    src: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-04.png",
    alt: "Señalética de evacuación Plot Center",
  },
] as const

export default function MineriaPage() {
  const [activeCarteleria, setActiveCarteleria] = useState(0)
  const activeCarteleriaItem = CARTELERIA[activeCarteleria]
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)

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

        {/* HERO */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-14 md:pb-20 px-4 sm:px-6 z-10">
          <div className="max-w-[1280px] mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-plot-ink/50 mb-5 font-medium flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-brand-orange" />
              Servicios
              <span className="w-8 h-px bg-brand-cyan" />
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[4.5rem] font-display uppercase leading-[0.95] mb-6 tracking-tight text-plot-ink">
              <TextReveal text="Servicios" />{" "}
              <span className="text-brand-orange">
                <TextReveal text="mineros" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-plot-ink/70 font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
              Nuestra promesa: <strong className="text-plot-ink">seguridad, eficiencia y respuesta rápida</strong>.
              Un equipo multidisciplinario garantiza cada proyecto, desde la idea hasta la instalación.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-orange text-plot-ink font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
              >
                Consultar proyecto
              </a>
              <a
                href="#productos"
                className="inline-block border border-brand-navy/20 bg-white/80 text-plot-ink font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
              >
                Ver productos
              </a>
            </div>
          </div>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="relative z-10 px-6 pb-16 md:pb-24 scroll-mt-28">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-3">
                Productos y <span className="text-brand-orange">servicios</span>
              </h2>
              <p className="text-plot-ink/65 text-lg font-medium max-w-2xl mx-auto">
                Soluciones integrales para el sector minero: comunicación visual, seguridad y presencia de marca.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {PILLARS.map((item, i) => {
                const Icon = item.icon
                const indexLabel = String(i + 1).padStart(2, "0")
                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col rounded-[1.75rem] overflow-hidden bg-white border border-brand-navy/10 shadow-[0_20px_50px_-24px_rgba(26,30,56,0.25)]"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 28px 56px -20px ${item.accent}55`
                      e.currentTarget.style.borderColor = `${item.accent}66`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 20px 50px -24px rgba(26,30,56,0.25)"
                      e.currentTarget.style.borderColor = "rgba(26,30,56,0.1)"
                    }}
                  >
                    <div
                      className="aspect-[16/10] relative overflow-hidden flex items-center justify-center"
                      style={{
                        background: `linear-gradient(155deg, ${brand.navy} 0%, ${brand.navy2} 42%, ${item.accent}55 100%)`,
                      }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.14]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/2 skew-x-[-18deg] opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(180deg, transparent, ${item.accent}, transparent)`,
                        }}
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute -bottom-16 -right-10 w-52 h-52 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                        style={{ background: item.accent }}
                        aria-hidden
                      />

                      <span className="absolute top-4 left-4 z-10 text-[11px] font-black tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors">
                        {indexLabel}
                      </span>

                      <div className="relative z-10 flex items-center justify-center">
                        <span
                          className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-white/15 scale-90 group-hover:scale-100 transition-transform duration-500"
                          aria-hidden
                        />
                        <span
                          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-dashed opacity-70 animate-[spin_18s_linear_infinite] group-hover:[animation-duration:8s]"
                          style={{ borderColor: `${item.accent}88` }}
                          aria-hidden
                        />
                        <motion.span
                          className="relative w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 rounded-[1.4rem] flex items-center justify-center text-plot-ink shadow-[0_18px_40px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                          style={{ background: item.accent }}
                        >
                          <Icon className="w-9 h-9 sm:w-11 sm:h-11" strokeWidth={2.15} />
                        </motion.span>
                      </div>
                    </div>

                    <div className="relative flex flex-col flex-1 p-6 pt-5">
                      <div
                        className="h-1 w-10 rounded-full mb-4 group-hover:w-16 transition-all duration-400"
                        style={{ background: item.accent }}
                      />
                      <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight text-plot-ink mb-2">
                        {item.title}
                      </h3>
                      <p className="text-plot-ink/65 font-medium leading-relaxed text-sm md:text-base flex-1">
                        {item.description}
                      </p>
                      <span
                        className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide"
                        style={{ color: item.accent }}
                      >
                        Ver más
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-plot-ink transition-transform duration-300 group-hover:translate-x-1"
                          style={{ background: item.accent }}
                        >
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.8} />
                        </span>
                      </span>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </section>

        {/* QUÉ HACEMOS */}
        <section className="relative z-10 px-6 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group relative max-w-[1280px] mx-auto rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.18)] transition-[box-shadow,border-color] duration-300 hover:border-brand-pink/35 hover:shadow-[0_28px_60px_-24px_rgba(232,75,147,0.35)] overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
              style={{ background: `${brand.pink}33` }}
              aria-hidden
            />
            <h2 className="relative text-3xl md:text-4xl font-display uppercase tracking-tight text-plot-ink mb-4">
              Qué <span className="text-brand-pink">hacemos</span>
            </h2>
            <p className="relative text-plot-ink/65 font-medium mb-6 leading-relaxed max-w-2xl">
              Seguridad, eficiencia y respuesta rápida para operaciones mineras:
            </p>
            <ul className="relative grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {FEATURES.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                  whileHover={{ x: 6 }}
                  className="flex gap-3 items-center text-plot-ink/80 font-medium leading-snug rounded-xl px-2 py-2.5 -mx-2 cursor-default transition-colors hover:bg-brand-pink/8 hover:text-plot-ink"
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
        </section>

        {/* CARTELERÍA — columnas de igual altura */}
        <section id="carteleria" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 md:py-28 scroll-mt-28">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative h-full min-h-[420px] lg:min-h-0 flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 backdrop-blur-md border border-brand-navy/10 p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.18)] transition-[box-shadow,border-color] duration-300 hover:border-brand-orange/35 hover:shadow-[0_28px_60px_-24px_rgba(243,149,25,0.35)] overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                style={{ background: `${brand.orange}33` }}
                aria-hidden
              />
              <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-brand-orange mb-3">
                Cartelería minera
              </p>
              <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4 leading-[0.95]">
                Asesorías, fabricación e{" "}
                <span className="text-brand-orange">instalación</span>
              </h2>
              <p className="relative text-plot-ink/70 font-medium leading-relaxed mb-5 shrink-0">
                En la minería, cada señal importa. Diseñamos cartelería para condiciones exigentes,
                normativas nacionales e internacionales, y seguridad en cada paso del camino.
              </p>
              <div className="relative mt-auto grid grid-cols-2 gap-2.5 flex-1 min-h-[180px]">
                {CARTELERIA_PHOTOS.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setLightboxImage(photo)}
                    className={`group/photo relative rounded-2xl overflow-hidden bg-brand-navy/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      i === 0
                        ? "col-span-2 sm:col-span-1 row-span-2 min-h-[160px]"
                        : "min-h-[90px]"
                    }`}
                    aria-label={`Ampliar: ${photo.alt}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                    />
                    <span className="absolute inset-0 bg-brand-navy/0 group-hover/photo:bg-brand-navy/25 transition-colors duration-300" />
                    <span className="absolute bottom-2 right-2 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 group-hover/photo:opacity-100 transition-opacity">
                      Ampliar
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col gap-3 h-full min-h-[420px] lg:min-h-0">
              <div className="relative flex-[1.2] min-h-[240px] sm:min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCarteleria}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col rounded-[1.5rem] sm:rounded-[2rem] text-white p-6 sm:p-8 overflow-hidden shadow-[0_20px_50px_-20px_rgba(26,30,56,0.35)]"
                    style={{
                      background: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navy2} 55%, ${activeCarteleriaItem.accent}33 100%)`,
                    }}
                  >
                    <motion.div
                      className="pointer-events-none absolute -bottom-16 -right-10 w-48 h-48 rounded-full blur-3xl opacity-50"
                      style={{ background: activeCarteleriaItem.accent }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
                      transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      aria-hidden
                    />
                    {(() => {
                      const Icon = activeCarteleriaItem.icon
                      return (
                        <motion.span
                          key={`${activeCarteleria}-icon`}
                          initial={{ scale: 0.7, rotate: -12 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 380, damping: 18 }}
                          className="relative w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center text-plot-ink mb-4"
                          style={{ background: activeCarteleriaItem.accent }}
                        >
                          <Icon className="w-5 h-5" strokeWidth={2.4} />
                        </motion.span>
                      )
                    })()}
                    <h3 className="relative text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-tight leading-tight mb-3 shrink-0">
                      {activeCarteleriaItem.title}
                    </h3>
                    <motion.div
                      key={`${activeCarteleria}-bar`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-16 sm:w-20 h-1.5 rounded-full mb-4 origin-left shrink-0"
                      style={{ background: activeCarteleriaItem.accent }}
                    />
                    <p className="relative flex-1 min-h-0 text-sm sm:text-base md:text-[1.05rem] text-white/90 leading-relaxed font-medium text-pretty">
                      {activeCarteleriaItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-rows-4 gap-3 flex-1 min-h-[280px]">
                {CARTELERIA.map((item, index) => {
                  const Icon = item.icon
                  const isActive = activeCarteleria === index
                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveCarteleria(index)}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      className={`group/btn relative h-full min-h-[64px] w-full text-left px-5 sm:px-6 py-0 rounded-2xl border bg-white/95 overflow-hidden flex items-center ${
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
                          layoutId="mineria-carteleria-active-bar"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-full"
                          style={{ background: item.accent }}
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative flex items-center gap-3 w-full">
                        <motion.span
                          animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                          whileHover={{ rotate: -8, scale: 1.1 }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-plot-ink"
                          style={{
                            background: isActive ? item.accent : `${item.accent}33`,
                          }}
                        >
                          <Icon className="w-4 h-4" strokeWidth={2.4} />
                        </motion.span>
                        <h3 className="text-base sm:text-lg font-display uppercase tracking-wide text-plot-ink leading-tight">
                          {item.title}
                        </h3>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* IMPRENTA */}
        <section id="imprenta" className="relative z-10 px-6 py-16 md:py-24 bg-brand-navy scroll-mt-28">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'url("/images/fondo-brand.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-navy/80 pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange mb-3">
                Imprenta digital
              </p>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white mb-4">
                Rapidez, volumen y <span className="text-brand-yellow">precisión</span>
              </h2>
              <p className="text-white/65 text-lg font-medium max-w-2xl mx-auto">
                Tecnología avanzada y experiencia para soluciones impresas de alta calidad con respuesta inmediata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {IMPRENTA.map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-[1.5rem] bg-white/5 border border-white/10 p-6 md:p-7 hover:bg-white/10 transition-colors group"
                >
                  <h3 className="text-2xl font-display uppercase tracking-tight text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-medium leading-relaxed">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-orange">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* PLOTEO */}
        <section id="ploteo" className="relative z-10 px-6 py-16 md:py-24 scroll-mt-28">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange mb-3">
                Ploteo vehicular
              </p>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4">
                Seguridad, durabilidad e{" "}
                <span className="text-brand-orange">impacto</span>
              </h2>
              <p className="text-plot-ink/65 text-lg font-medium leading-relaxed">
                Reforzamos la identidad corporativa de tu flota y aseguramos que los vehículos cumplan
                con las marcas reglamentarias de seguridad.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {PLOTEO.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-[1.5rem] sm:rounded-[1.75rem] bg-white/90 border border-brand-navy/10 p-5 sm:p-7 shadow-[0_20px_50px_-24px_rgba(26,30,56,0.2)]"
                >
                  <p className="text-brand-orange text-sm font-bold uppercase tracking-[0.2em] mb-3">
                    0{i + 1}
                  </p>
                  <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight text-plot-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-plot-ink/70 font-medium leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STANDS CTA */}
        <section className="relative z-10 px-6 pb-16 md:pb-20">
          <div className="max-w-[1280px] mx-auto rounded-[2rem] overflow-hidden border border-brand-navy/10 bg-white shadow-[0_24px_60px_-28px_rgba(26,30,56,0.3)]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange mb-3">
                  Presencia en eventos
                </p>
                <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-plot-ink mb-4 leading-tight">
                  La minería tiene su escenario,{" "}
                  <span className="text-brand-orange">nosotros lo construimos</span>
                </h2>
                <p className="text-plot-ink/65 font-medium leading-relaxed mb-8">
                  Diseñamos y producimos stands que atraen miradas y transmiten identidad. Validado
                  en Expo San Juan Minero y Fiesta Nacional del Sol.
                </p>
                <a
                  href="/servicios/stand"
                  className="inline-flex items-center gap-2 self-start rounded-full bg-brand-orange text-plot-ink font-bold px-8 py-4 text-sm tracking-wide uppercase"
                >
                  Ver armado de stands
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="relative min-h-[280px] md:min-h-full grid grid-rows-2 gap-0 bg-brand-navy">
                <div className="relative overflow-hidden min-h-[160px]">
                  <img
                    src="https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-141.png"
                    alt="Stand Expo Minera Plot Center"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/90">
                    Expo Minera
                  </span>
                </div>
                <div className="relative overflow-hidden min-h-[160px]">
                  <img
                    src="https://plotcenter.com.ar/wp-content/uploads/2025/07/Group-121-1.png"
                    alt="Stand Fiesta Nacional del Sol Plot Center"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/90">
                    Fiesta Nacional del Sol
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto text-center rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-6 sm:p-8 md:p-14 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.2)]">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4">
              Tu próximo <span className="text-brand-orange">proyecto minero</span>
            </h2>
            <p className="text-plot-ink/65 text-lg mb-8 font-medium">
              Contanos qué necesitás: cartelería, imprenta, flota, vía pública o stands.
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
              type="button"
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white z-50 hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/20 cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
