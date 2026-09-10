"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Check,
  FileText,
  X,
  ExternalLink,
  Download,
  Shield,
  Ruler,
  Workflow,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground } from "@/components/brand-motif"
import { brand } from "@/lib/brand"
import { WHATSAPP_URL } from "@/lib/contact"

const GALLERY_IMAGES = [
  "https://plotcenter.com.ar/wp-content/uploads/2025/07/Group-121-1.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-141.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-143.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-146.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/07/Group-123-1.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/08/Group-117.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/08/Group-118-1.png",
  "https://plotcenter.com.ar/wp-content/uploads/2025/08/Group-119-1.png",
]

const PILLARS = [
  {
    title: "Planificación a medida",
    description:
      "Diseñamos cada stand para reflejar la identidad única de tu marca, creando espacios que impactan y comunican tu mensaje.",
    icon: Ruler,
    accent: brand.orange,
  },
  {
    title: "Seguridad y eficiencia",
    description:
      "Garantizamos un montaje seguro y optimizado, cumpliendo con los más altos estándares de calidad y plazos de entrega.",
    icon: Shield,
    accent: brand.cyan,
  },
  {
    title: "Proceso estructurado",
    description:
      "Seguimos una metodología probada que asegura coherencia y excelencia en cada etapa, desde el concepto hasta la entrega final.",
    icon: Workflow,
    accent: brand.purple,
  },
]

const PROCESS = [
  {
    title: "CONCEPTO",
    description:
      "Interpretamos la esencia de tu empresa y la transformamos en un espacio que habla por ella.",
    accent: brand.orange,
  },
  {
    title: "PLANOS",
    description:
      "Planificación sobre planos aprobados por arquitectos e ingenieros, con análisis del terreno y condiciones operativas.",
    accent: brand.cyan,
  },
  {
    title: "COORDINACIÓN",
    description:
      "Cada área involucrada trabaja en cadena para una construcción segura, eficiente y de alta calidad.",
    accent: brand.pink,
  },
  {
    title: "EJECUCIÓN",
    description:
      "El proyecto cobra forma en el terreno, con materiales seleccionados y estricta supervisión técnica.",
    accent: brand.purple,
  },
]

const FEATURES = [
  "Diseño y construcción de stands llave en mano",
  "Identidad de marca traducida a espacio físico",
  "Montaje seguro con protocolos técnicos",
  "Coordinación integral: estructura, gráfica, mobiliario y electricidad",
  "Experiencia validada en Panorama Minero y Fiesta Nacional del Sol",
  "Plazos claros y ejecución alineada a planos aprobados",
]

const CATALOGS = [
  {
    id: "expo-minera",
    title: "Catálogo Stand Expo Minera",
    subtitle: "Presencia industrial con impacto de marca",
    cover: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-141.png",
    pdf: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Catalogo-mineria-Plot-Center.pdf",
    accent: brand.orange,
  },
  {
    id: "fns",
    title: "Catálogo Stand FNS",
    subtitle: "Fiesta Nacional del Sol — stands que se viven",
    cover: "https://plotcenter.com.ar/wp-content/uploads/2025/07/Group-121-1.png",
    pdf: "https://plotcenter.com.ar/wp-content/uploads/2025/07/Catalogo-FNS-Plot.pdf",
    accent: brand.purple,
  },
] as const

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

export default function StandPage() {
  const [activeStep, setActiveStep] = useState(0)
  const activeProcess = PROCESS[activeStep]
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [[page, direction], setPage] = useState([0, 0])
  const [openCatalog, setOpenCatalog] = useState<(typeof CATALOGS)[number] | null>(null)

  const currentIndex =
    ((page % GALLERY_IMAGES.length) + GALLERY_IMAGES.length) % GALLERY_IMAGES.length

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    if (!openCatalog) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCatalog(null)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [openCatalog])

  const paginate = (dir: number) => setPage([page + dir, dir])
  const goToPage = (index: number) => {
    if (index === currentIndex) return
    setPage([index, index > currentIndex ? 1 : -1])
  }
  const dragMoved = React.useRef(false)

  const magazineVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? -88 : 88,
      opacity: 0.4,
      x: dir > 0 ? 40 : -40,
      scale: 0.96,
      zIndex: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      x: 0,
      scale: 1,
      zIndex: 10,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? 88 : -88,
      opacity: 0.25,
      x: dir > 0 ? -48 : 48,
      scale: 0.94,
      zIndex: 0,
    }),
  }

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
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 min-h-[70svh] sm:min-h-[78vh] flex flex-col justify-center items-center z-10">
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
                <TextReveal text="Armado de" />
                <br />
                <span className="text-brand-orange">
                  <TextReveal text="stands" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-plot-ink/70 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                Antes de ofrecerlo al mercado, lo probamos en nosotros mismos. En Panorama Minero
                y en la Fiesta Nacional del Sol demostramos que no improvisamos.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-orange text-plot-ink font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
                >
                  Consultar proyecto
                </a>
                <a
                  href="#catalogos"
                  className="inline-block border border-brand-navy/20 bg-white/80 text-plot-ink font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase"
                >
                  Ver catálogos
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* POR QUÉ */}
        <section className="py-16 md:py-24 px-6 relative z-10">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4">
                ¿Por qué elegir <span className="text-brand-orange">Plot Center</span>?
              </h2>
              <p className="text-plot-ink/65 text-lg font-medium leading-relaxed">
                Desarrollar un stand no es solo montar estructuras. Es interpretar la esencia de
                una empresa y transformarla en un espacio que hable por ella.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
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
                    <p className="text-plot-ink/70 font-medium leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* PROCESO + FEATURES — columnas de igual altura */}
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
                Stands llave en mano con identidad de marca, montaje seguro y coordinación integral:
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
              <div className="relative flex-[1.2] min-h-[220px] sm:min-h-[240px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col rounded-[1.5rem] sm:rounded-[2rem] text-white p-6 sm:p-8 overflow-hidden shadow-[0_20px_50px_-20px_rgba(26,30,56,0.35)]"
                    style={{
                      background: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navy2} 55%, ${activeProcess.accent}33 100%)`,
                    }}
                  >
                    <motion.div
                      className="pointer-events-none absolute -bottom-16 -right-10 w-48 h-48 rounded-full blur-3xl opacity-50"
                      style={{ background: activeProcess.accent }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
                      transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      aria-hidden
                    />
                    <p
                      className="relative text-sm tracking-[0.25em] uppercase font-bold mb-2 shrink-0"
                      style={{ color: activeProcess.accent }}
                    >
                      0{activeStep + 1} / 04
                    </p>
                    <h3 className="relative text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-tight leading-tight mb-3 shrink-0">
                      {activeProcess.title}
                    </h3>
                    <motion.div
                      key={`${activeStep}-bar`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-16 sm:w-20 h-1.5 rounded-full mb-4 origin-left shrink-0"
                      style={{ background: activeProcess.accent }}
                    />
                    <p className="relative flex-1 min-h-0 text-sm sm:text-base md:text-[1.05rem] text-white/90 leading-relaxed font-medium text-pretty">
                      {activeProcess.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-rows-4 gap-3 flex-1 min-h-[280px]">
                {PROCESS.map((step, index) => {
                  const isActive = activeStep === index
                  return (
                    <motion.button
                      key={step.title}
                      type="button"
                      onClick={() => setActiveStep(index)}
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
                              borderColor: step.accent,
                              boxShadow: `0 14px 32px -14px ${step.accent}66`,
                            }
                          : undefined
                      }
                    >
                      <motion.span
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(105deg, ${step.accent}14 0%, transparent 55%)`,
                        }}
                        aria-hidden
                      />
                      {isActive && (
                        <motion.span
                          layoutId="stand-active-bar"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-full"
                          style={{ background: step.accent }}
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative flex items-center gap-3 w-full">
                        <motion.span
                          animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                          whileHover={{ rotate: -8, scale: 1.1 }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-black text-plot-ink"
                          style={{
                            background: isActive ? step.accent : `${step.accent}33`,
                          }}
                        >
                          0{index + 1}
                        </motion.span>
                        <h3 className="text-base sm:text-lg md:text-xl font-display uppercase tracking-wide text-plot-ink leading-tight">
                          {step.title}
                        </h3>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CATÁLOGOS PDF */}
        <section id="catalogos" className="py-16 md:py-24 px-6 relative z-10 scroll-mt-28">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4">
                Catálogos <span className="text-brand-orange">PDF</span>
              </h2>
              <p className="text-plot-ink/65 text-lg font-medium">
                Abrí cada catálogo en pantalla completa. Sin salir del sitio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {CATALOGS.map((catalog, i) => (
                <motion.button
                  key={catalog.id}
                  type="button"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setOpenCatalog(catalog)}
                  className="group text-left rounded-[2rem] overflow-hidden border border-brand-navy/10 bg-white shadow-[0_24px_60px_-28px_rgba(26,30,56,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={catalog.cover}
                      alt={catalog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/35 to-transparent" />
                    <div
                      className="absolute top-5 left-5 flex items-center gap-2 rounded-full px-4 py-2 text-white text-xs font-bold uppercase tracking-wider"
                      style={{ background: catalog.accent }}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      PDF
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white mb-1">
                        {catalog.title}
                      </h3>
                      <p className="text-white/75 font-medium">{catalog.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-5 bg-white">
                    <span className="text-sm font-bold uppercase tracking-wide text-plot-ink/70">
                      Abrir en modal
                    </span>
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white"
                      style={{ background: catalog.accent }}
                    >
                      Ver catálogo
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </motion.button>
              ))}
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

          <div className="relative max-w-[1280px] mx-auto text-center mb-10 md:mb-14 px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-4"
            >
              Espacios que{" "}
              <span className="text-brand-yellow lowercase tracking-normal">comunican</span>
            </motion.h2>
            <p className="text-white/65 max-w-2xl mx-auto text-lg font-medium">
              Ojeá la revista: arrastrá o usá las flechas. Cada foto entra completa.
            </p>
          </div>

          <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6">
            {/* Revista / flipbook */}
            <div
              className="relative mx-auto w-full max-w-[920px] h-[min(58svh,480px)] md:h-[min(78vh,720px)] perspective-[1800px]"
              style={{ perspectiveOrigin: "50% 50%" }}
            >
              {/* Páginas debajo (efecto de lomo) */}
              <div
                aria-hidden
                className="absolute inset-[3%] rounded-[1.1rem] bg-white/10 border border-white/10 translate-x-2 translate-y-2"
              />
              <div
                aria-hidden
                className="absolute inset-[3%] rounded-[1.1rem] bg-white/8 border border-white/10 translate-x-1 translate-y-1"
              />

              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={magazineVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    rotateY: { type: "spring", stiffness: 150, damping: 20, mass: 0.85 },
                    opacity: { duration: 0.25 },
                    x: { type: "spring", stiffness: 170, damping: 22 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => {
                    dragMoved.current = false
                  }}
                  onDrag={(_, info) => {
                    if (Math.abs(info.offset.x) > 8) dragMoved.current = true
                  }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80 || info.velocity.x < -400) paginate(1)
                    else if (info.offset.x > 80 || info.velocity.x > 400) paginate(-1)
                  }}
                  onClick={() => {
                    if (dragMoved.current) return
                    setLightboxImage(GALLERY_IMAGES[currentIndex])
                  }}
                  className="absolute inset-[3%] cursor-grab active:cursor-grabbing"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                  }}
                >
                  {/* Página de revista */}
                  <div className="relative h-full w-full rounded-[1.15rem] overflow-hidden bg-[#f4f1ea] shadow-[0_28px_70px_rgba(0,0,0,0.55)] border border-white/40">
                    {/* Lomo / borde de página */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(26,30,56,0.14), rgba(26,30,56,0.04) 45%, transparent)",
                      }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 w-3 z-10"
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(0,0,0,0.08), transparent)",
                      }}
                    />

                    <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex items-center justify-center">
                      <img
                        src={GALLERY_IMAGES[currentIndex]}
                        alt={`Stand Plot Center ${currentIndex + 1}`}
                        className="max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none"
                        draggable={false}
                      />
                    </div>

                    <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-brand-navy/45">
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(GALLERY_IMAGES.length).padStart(2, "0")}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft size={28} />
              </button>
              <div className="flex gap-2">
                {GALLERY_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToPage(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "w-10 bg-brand-orange" : "w-2 bg-white/35 hover:bg-white/55"
                    }`}
                    aria-label={`Ir a página ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => paginate(1)}
                className="p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-colors"
                aria-label="Página siguiente"
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
              Tu próxima <span className="text-brand-orange">presencia</span>
            </h2>
            <p className="text-plot-ink/65 text-lg mb-8 font-medium">
              Contanos el evento y armamos un stand que hable por tu marca.
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

      {/* Lightbox imágenes */}
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
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Stand ampliado"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal PDF */}
      <AnimatePresence>
        {openCatalog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={openCatalog.title}
          >
            <motion.button
              type="button"
              aria-label="Cerrar catálogo"
              className="absolute inset-0 bg-brand-navy/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenCatalog(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-6xl h-[92vh] sm:h-[88vh] rounded-t-[1.75rem] sm:rounded-[1.75rem] overflow-hidden bg-brand-navy border border-white/15 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)] flex flex-col"
            >
              <div
                className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-white/10"
                style={{
                  background: `linear-gradient(90deg, ${openCatalog.accent}22, transparent)`,
                }}
              >
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-bold mb-1">
                    Catálogo PDF
                  </p>
                  <h3 className="text-lg sm:text-2xl font-display uppercase tracking-tight text-white truncate">
                    {openCatalog.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={openCatalog.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wide"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Descargar</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpenCatalog(null)}
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center"
                    aria-label="Cerrar"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 bg-[#0f1220]">
                <iframe
                  key={openCatalog.pdf}
                  src={`${openCatalog.pdf}#view=FitH`}
                  title={openCatalog.title}
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
