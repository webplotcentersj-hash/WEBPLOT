"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, Code2, Palette, Bot } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif"
import { brand } from "@/lib/brand"
import { WHATSAPP_URL } from "@/lib/contact"

type Project = {
  title: string
  tag: string
  description: string
  modules?: string[]
  images: string[]
  accent: string
}

const PROJECTS: Project[] = [
  {
    title: "PLOT LAB",
    tag: "App web + IA nativa",
    description:
      "Plataforma integral de gestión Plot: una app web con capa de IA nativa que centraliza la operación diaria. Incluye kanban de tareas online, recursos humanos, ERP, CRM, caja, facturación, stock y compras — todo en un solo ecosistema.",
    modules: [
      "Kanban de producción",
      "RRHH",
      "ERP",
      "CRM / Clientes",
      "Caja",
      "Facturación",
      "Stock",
      "Compras",
      "Plot AI",
    ],
    images: [
      "/proyectos/plot-lab/01-dashboard.jpg",
      "/proyectos/plot-lab/02-panel.jpg",
      "/proyectos/plot-lab/03-kanban.jpg",
    ],
    accent: brand.orange,
  },
  {
    title: "Sitio institucional Plot Center",
    tag: "Web corporativa",
    description:
      "Rediseño integral del sitio de marca: arquitectura clara, carga rápida y una experiencia visual alineada a la identidad Plot. Pensado para presentar servicios, proyectos y convertir consultas.",
    images: ["https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-01.png"],
    accent: brand.cyan,
  },
  {
    title: "VP Plot",
    tag: "Vía pública · San Juan",
    description:
      "App web para gestionar el servicio de vía pública en San Juan: administración de alquileres, geolocalización de chupetes, campañas personalizadas con datos en tiempo real y KPIs por anuncio, más una capa de IA para tomar mejores decisiones.",
    modules: [
      "Alquileres",
      "Geolocalización",
      "Chupetes",
      "Campañas",
      "KPIs en vivo",
      "IA decisional",
    ],
    images: [
      "/proyectos/vp-plot/01-instalaciones.jpg",
      "/proyectos/vp-plot/02-campanas.jpg",
      "/proyectos/vp-plot/03-mapa-clicks.jpg",
      "/proyectos/vp-plot/04-mapa-ubicaciones.jpg",
    ],
    accent: brand.pink,
  },
  {
    title: "Safari Tras Las Sierras",
    tag: "App web · Valle Fértil",
    description:
      "App web del Safari de Valle Fértil: landing del evento, gestión de inscripciones de pilotos, venta de tickets, noticias actualizadas, tiempos de las competencias y transmisión en vivo.",
    modules: [
      "Landing",
      "Inscripciones",
      "Pilotos",
      "Tickets",
      "Noticias",
      "Tiempos",
      "En vivo",
    ],
    images: ["/proyectos/safari/01-landing.jpg"],
    accent: brand.purple,
  },
  {
    title: "Joven Empresario",
    tag: "Landing + admin",
    description:
      "Web del Premio Joven Empresario Sanjuanino: landing de convocatoria y sistema de administración para gestionar postulaciones, contenidos y la operación del sitio.",
    modules: [
      "Landing",
      "Postulaciones",
      "Administración",
      "Contenidos",
      "Convocatoria",
    ],
    images: ["/proyectos/joven-empresario/01-landing.jpg"],
    accent: brand.yellow,
  },
  {
    title: "PHI (φ)",
    tag: "Bolsa freelance",
    description:
      "Plataforma de bolsa de trabajo para diseñadores freelance de Plot Center: postulación, panel de trabajos de la red creativa y entregas con el respaldo del equipo gráfico de Plot Lab.",
    modules: [
      "Bolsa de trabajos",
      "Postulación",
      "Panel diseñador",
      "Red externa φ",
      "Entregas",
    ],
    images: ["/proyectos/phi/01-landing.jpg"],
    accent: brand.blue,
  },
  {
    title: "Grupo Agencias",
    tag: "Invitación animada + admin",
    description:
      "Web de invitación animada para una agencia de inversiones: experiencia inmersiva por pasos, apertura personalizada por nombre y panel de administración para gestionar invitados, contenidos y el flujo del evento.",
    modules: [
      "Invitación animada",
      "Acceso por nombre",
      "Secuencia interactiva",
      "Panel de administración",
      "Gestión de invitados",
      "Contenidos del evento",
    ],
    images: ["/proyectos/grupo-agencias/01-invitacion.jpg"],
    accent: brand.red,
  },
]

const SERVICES_CONTENT = {
  desarrollo: {
    title: "DESARROLLO WEB",
    description:
      "Creamos sitios web funcionales a los requerimientos de cada proyecto, con el plus de una propuesta superadora. Combinamos diseño, estrategia y tecnología para lograr experiencias digitales efectivas y personalizadas.",
    icon: Code2,
    accent: brand.cyan,
  },
  diseno: {
    title: "DISEÑO WEB",
    description:
      "Diseñamos interfaces visuales que comunican con claridad. Cada web refleja la identidad de la marca, cuidando la experiencia del usuario, la estética y la coherencia institucional única de cada proyecto.",
    icon: Palette,
    accent: brand.pink,
  },
  ia: {
    title: "SISTEMAS CON IA",
    description:
      "Implementamos soluciones con inteligencia artificial que optimizan procesos gráficos, organizacionales y comunicacionales. Tecnología aplicada para crecer con eficiencia e innovación.",
    icon: Bot,
    accent: brand.orange,
  },
}

const FEATURES = [
  "Sitios y landing pages de alto impacto",
  "Sistemas a medida y paneles de gestión",
  "Diseño UI/UX alineado a tu marca",
  "Integraciones con IA y automatizaciones",
  "Performance, SEO técnico y escalabilidad",
  "Soporte y evolución continua del producto",
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
        <span key={i} className="inline-block overflow-hidden mr-2 sm:mr-3">
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

export default function DesarrolloWebPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof SERVICES_CONTENT>("desarrollo")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [projectIndex, setProjectIndex] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 160])
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0])

  const active = SERVICES_CONTENT[activeTab]
  const ActiveIcon = active.icon
  const project = PROJECTS[projectIndex]
  const activePhoto = project.images[Math.min(photoIndex, project.images.length - 1)]

  const selectProject = (index: number) => {
    setProjectIndex(index)
    setPhotoIndex(0)
  }

  const nextProject = () => selectProject((projectIndex + 1) % PROJECTS.length)
  const prevProject = () => selectProject((projectIndex - 1 + PROJECTS.length) % PROJECTS.length)

  return (
    <main className="min-h-screen text-plot-ink relative overflow-x-clip bg-plot-bg">
      <Header />

      {/* Fondo vivo de marca — sin negro */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BrandBackground variant="sunburst" intensity={1} veil={0.1} />
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-multiply"
          style={{
            backgroundImage: 'url("/images/fondo-brand.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/50 to-white/80" />
        {/* Acentos de color en el hero */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-[min(90vw,720px)] rounded-full blur-[100px] opacity-35"
          style={{ background: `radial-gradient(circle, ${brand.cyan}55, transparent 70%)` }}
        />
        <div
          className="absolute top-[20%] right-[-10%] w-[min(70vw,480px)] h-[min(70vw,480px)] rounded-full blur-[90px] opacity-30"
          style={{ background: `radial-gradient(circle, ${brand.orange}50, transparent 70%)` }}
        />
        <div
          className="absolute top-[35%] left-[-8%] w-[min(60vw,400px)] h-[min(60vw,400px)] rounded-full blur-[80px] opacity-25"
          style={{ background: `radial-gradient(circle, ${brand.pink}40, transparent 70%)` }}
        />
      </div>

      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 min-h-[70svh] sm:min-h-[85vh] flex flex-col justify-center items-center z-10">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-[1100px] mx-auto w-full relative z-10 text-center flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full"
          >
            <p className="text-sm tracking-[0.28em] uppercase text-plot-ink/50 mb-6 font-medium flex items-center justify-center gap-3 sm:gap-4">
              <span className="w-8 h-px bg-brand-cyan" />
              Servicios 4.0
              <span className="w-8 h-px bg-brand-orange" />
            </p>

            <BrandTextPanel className="inline-block mx-auto max-w-[min(100%,52rem)] text-center mb-8">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display uppercase leading-[0.95] tracking-tight text-plot-ink">
                <TextReveal text="Evolucionamos" />
                <br />
                <span className="text-brand-cyan">
                  <TextReveal text="con las" />
                </span>
                <br />
                <span className="text-brand-orange">
                  <TextReveal text="tecnologías digitales" />
                </span>
              </h1>
            </BrandTextPanel>

            <p className="text-base sm:text-lg md:text-xl text-plot-ink/70 font-medium max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-1">
              Desarrollo web e inteligencia artificial para crear soluciones{" "}
              <span className="text-plot-ink font-bold">elegantes y escalables</span>.
            </p>

            {/* Chips de oferta */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              {[
                { label: "Web", color: brand.cyan },
                { label: "UI/UX", color: brand.pink },
                { label: "IA", color: brand.orange },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="rounded-full px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-md"
                  style={{ background: chip.color }}
                >
                  {chip.label}
                </span>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange text-plot-ink font-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm tracking-wide uppercase shadow-[0_12px_32px_-10px_rgba(243,149,25,0.65)] hover:bg-brand-yellow transition-colors"
            >
              Iniciar proyecto
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICIOS — columnas de igual altura */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative z-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group relative h-full min-h-[420px] lg:min-h-0 flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 backdrop-blur-md border border-brand-navy/10 p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.18)] transition-[box-shadow,border-color] duration-300 hover:border-brand-cyan/35 hover:shadow-[0_28px_60px_-24px_rgba(0,160,198,0.35)] overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
              style={{ background: `${brand.cyan}33` }}
              aria-hidden
            />
            <h2 className="relative text-3xl md:text-4xl font-display uppercase tracking-tight text-plot-ink mb-4">
              Qué <span className="text-brand-cyan">construimos</span>
            </h2>
            <p className="relative text-plot-ink/65 font-medium mb-6 leading-relaxed">
              Productos digitales con estética de marca, performance y foco en resultados:
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
                  className="flex gap-3 items-center text-plot-ink/80 font-medium leading-snug rounded-xl px-2 py-2 -mx-2 cursor-default transition-colors hover:bg-brand-cyan/8 hover:text-plot-ink"
                >
                  <motion.span
                    whileHover={{ scale: 1.12, rotate: 8 }}
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: brand.cyan }}
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
                  <div className="relative flex items-start gap-3 sm:gap-4 mb-3 shrink-0">
                    <motion.span
                      key={`${activeTab}-icon`}
                      initial={{ scale: 0.7, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 18 }}
                      className="w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center text-plot-ink"
                      style={{ background: active.accent }}
                    >
                      <ActiveIcon className="w-5 h-5" strokeWidth={2.4} />
                    </motion.span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-tight leading-tight pt-1.5">
                      {active.title}
                    </h3>
                  </div>
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
                  const Icon = item.icon
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
                          layoutId="dev-web-active-bar"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-full"
                          style={{ background: item.accent }}
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative flex items-center gap-3 w-full">
                        <motion.span
                          animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                          whileHover={{ rotate: -8, scale: 1.1 }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                          style={{
                            background: isActive ? item.accent : `${brand.navy}0F`,
                            color: brand.navy,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.span>
                        <h3 className="flex-1 text-base sm:text-lg md:text-xl font-display uppercase tracking-wide text-plot-ink">
                          0{index + 1}. {item.title}
                        </h3>
                        <motion.span
                          animate={isActive ? { x: 0, opacity: 1 } : { x: -4, opacity: 0.35 }}
                          className="text-lg font-black leading-none"
                          style={{ color: isActive ? item.accent : brand.navy }}
                          aria-hidden
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROYECTOS — galería por caso + descripción */}
      <section className="py-16 sm:py-20 md:py-28 relative z-10 overflow-hidden border-y border-brand-navy/10 bg-brand-navy">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: 'url("/images/fondo-brand.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-brand-navy/75 pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto text-center mb-10 sm:mb-14 px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-white mb-4"
          >
            Algunos de{" "}
            <span className="text-brand-cyan lowercase tracking-normal">nuestros proyectos</span>
          </motion.h2>
          <p className="text-white/65 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Cada caso con su objetivo, enfoque y resultado digital.
          </p>
        </div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Galería multi-foto del proyecto */}
            <div className="lg:col-span-7 relative flex flex-col gap-3">
              <AnimatePresence mode="wait">
                <motion.button
                  key={`${project.title}-${activePhoto}`}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setLightboxImage(activePhoto)}
                  className="group relative block w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/15 aspect-[16/10] sm:aspect-[16/11] text-left shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)]"
                >
                  <img
                    src={activePhoto}
                    alt={`${project.title} — captura ${photoIndex + 1}`}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent pointer-events-none" />
                  <span
                    className="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-plot-ink z-10"
                    style={{ background: project.accent }}
                  >
                    {project.tag}
                  </span>
                  {project.images.length > 1 && (
                    <span className="absolute top-4 right-4 z-10 rounded-full bg-black/45 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {photoIndex + 1} / {project.images.length}
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 z-10 text-xs font-bold uppercase tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ampliar →
                  </span>
                </motion.button>
              </AnimatePresence>

              {project.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto hide-scrollbar py-1.5 px-0.5">
                  {project.images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setPhotoIndex(i)}
                      className={`relative shrink-0 w-24 sm:w-28 h-16 sm:h-[4.5rem] rounded-lg overflow-hidden border-2 transition-all ${
                        i === photoIndex
                          ? "border-brand-orange scale-[1.03] opacity-100"
                          : "border-white/20 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Vista ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Descripción + módulos */}
            <div className="lg:col-span-5 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 rounded-[1.5rem] sm:rounded-[2rem] bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md flex flex-col"
                >
                  <p
                    className="text-[11px] font-black uppercase tracking-[0.22em] mb-3"
                    style={{ color: project.accent }}
                  >
                    Proyecto 0{projectIndex + 1} / 0{PROJECTS.length}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight text-white leading-[1.05] mb-4">
                    {project.title}
                  </h3>
                  <div
                    className="w-16 h-1.5 rounded-full mb-5"
                    style={{ background: project.accent }}
                  />
                  <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed font-medium text-pretty mb-5">
                    {project.description}
                  </p>
                  {project.modules && project.modules.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.modules.map((mod) => (
                        <span
                          key={mod}
                          className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white/85"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevProject}
                  className="p-3 rounded-full bg-white/10 border border-white/15 hover:bg-brand-cyan hover:border-brand-cyan transition-all text-white"
                  aria-label="Proyecto anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={nextProject}
                  className="p-3 rounded-full bg-white/10 border border-white/15 hover:bg-brand-cyan hover:border-brand-cyan transition-all text-white"
                  aria-label="Proyecto siguiente"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="ml-auto flex gap-2">
                  {PROJECTS.map((p, i) => (
                    <button
                      key={p.title}
                      type="button"
                      onClick={() => selectProject(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === projectIndex ? "w-8" : "w-2 bg-white/30 hover:bg-white/60"
                      }`}
                      style={i === projectIndex ? { background: project.accent } : undefined}
                      aria-label={`Ver ${p.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-6 sm:p-8 md:p-14 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.2)]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display uppercase tracking-tight text-plot-ink mb-4">
            ¿Tenés un <span className="text-brand-orange">proyecto</span>?
          </h2>
          <p className="text-plot-ink/65 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
            Contanos qué necesitás y armamos una propuesta digital a medida.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-orange text-plot-ink font-black px-8 py-4 rounded-full text-sm tracking-wide uppercase"
          >
            Hablar con el equipo
          </a>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-navy/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-brand-orange hover:text-plot-ink transition-colors z-50"
              onClick={() => setLightboxImage(null)}
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Proyecto ampliado"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
