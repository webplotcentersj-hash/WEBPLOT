"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowLeft, X } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground } from "@/components/brand-motif"
import { brand } from "@/lib/brand"
import { WHATSAPP_URL } from "@/lib/contact"

export type MineriaSubpageProps = {
  eyebrow: string
  title: string
  titleAccent: string
  intro: string
  bulletsTitle: string
  bullets: string[]
  heroImage: string
  galleryImage?: string
  accent?: string
}

const TextReveal = ({ text }: { text: string }) => {
  const words = text.split(" ")
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.045 } }, hidden: {} }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-3">
          <motion.span
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] },
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

export default function MineriaSubpage({
  eyebrow,
  title,
  titleAccent,
  intro,
  bulletsTitle,
  bullets,
  heroImage,
  galleryImage,
  accent = brand.orange,
}: MineriaSubpageProps) {
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

        <section className="relative z-10 pt-28 md:pt-36 pb-10 px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto">
            <a
              href="/servicios/mineria#imprenta"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-plot-ink/55 hover:text-brand-orange transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a minería
            </a>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="flex flex-col justify-center h-full rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.18)]"
              >
                <p className="text-sm tracking-[0.3em] uppercase text-plot-ink/55 mb-5 font-medium flex items-center gap-4">
                  <span className="w-8 h-px" style={{ background: accent }} />
                  {eyebrow}
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase leading-[0.95] mb-6 tracking-tight text-plot-ink">
                  <TextReveal text={title} />{" "}
                  <span style={{ color: accent }}>
                    <TextReveal text={titleAccent} />
                  </span>
                </h1>
                <p className="text-base md:text-lg text-plot-ink/80 font-medium leading-relaxed mb-8">
                  {intro}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block self-start font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase text-plot-ink"
                  style={{ background: accent }}
                >
                  Consultar
                </a>
              </motion.div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                onClick={() =>
                  setLightboxImage({
                    src: galleryImage || heroImage,
                    alt: galleryImage ? "Detalle del producto" : `${title} ${titleAccent}`,
                  })
                }
                className="group relative w-full h-full min-h-[320px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-brand-navy/15 shadow-[0_24px_60px_-28px_rgba(26,30,56,0.35)] text-left"
                style={{
                  background: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navy2} 100%)`,
                }}
                aria-label="Ampliar imagen"
              >
                <img
                  src={galleryImage || heroImage}
                  alt={galleryImage ? "Detalle del producto" : `${title} ${titleAccent}`}
                  className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    galleryImage ? "object-cover" : "object-contain p-6"
                  }`}
                />
                <span className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors" />
                <span className="absolute bottom-4 right-4 z-10 rounded-full bg-black/45 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Ampliar
                </span>
              </motion.button>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative lg:col-span-7 h-full min-h-[360px] flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-24px_rgba(26,30,56,0.22)] transition-[box-shadow,border-color] duration-300 hover:border-brand-navy/20 overflow-hidden"
            >
              <div
                className="pointer-events-none absolute -top-16 -right-12 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                style={{ background: `${accent}33` }}
                aria-hidden
              />
              <h2 className="relative text-2xl md:text-4xl font-display uppercase tracking-tight text-plot-ink mb-6">
                {bulletsTitle}
              </h2>
              <ul className="relative flex-1 flex flex-col justify-between gap-1">
                {bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                    whileHover={{ x: 6 }}
                    className="flex gap-3 items-center text-plot-ink/80 font-medium leading-snug rounded-xl px-2 py-2.5 -mx-2 cursor-default transition-colors hover:bg-black/[0.03] hover:text-plot-ink"
                  >
                    <motion.span
                      whileHover={{ scale: 1.12, rotate: 8 }}
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: accent }}
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </motion.span>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="lg:col-span-5 flex flex-col gap-5 h-full min-h-[360px]">
              <button
                type="button"
                onClick={() =>
                  setLightboxImage({ src: heroImage, alt: `${title} ${titleAccent}` })
                }
                className="group relative shrink-0 h-[140px] sm:h-[160px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-brand-navy/10 text-left px-5 py-4"
                style={{
                  background: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navy2} 100%)`,
                }}
                aria-label="Ampliar banner"
              >
                <img
                  src={heroImage}
                  alt={`${title} ${titleAccent}`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-black/45 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Ampliar
                </span>
              </button>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex-1 flex flex-col justify-center rounded-[1.5rem] sm:rounded-[2rem] text-white p-7 sm:p-8"
                style={{
                  background: `linear-gradient(145deg, ${brand.navy} 0%, ${brand.navy2} 55%, ${accent}33 100%)`,
                }}
              >
                <h3 className="text-2xl font-display uppercase tracking-tight mb-3 text-white">
                  ¿Necesitás cotizar?
                </h3>
                <p className="text-white/75 font-medium mb-6 leading-relaxed">
                  Te ayudamos con formato, materiales, tirada y plazos para tu operación.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center rounded-full font-bold px-6 py-3.5 text-sm tracking-wide uppercase text-plot-ink"
                    style={{ background: accent }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href="/contacto"
                    className="inline-flex justify-center rounded-full border border-white/25 font-bold px-6 py-3.5 text-sm tracking-wide uppercase text-white hover:bg-white/10 transition-colors"
                  >
                    Contacto
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-4 sm:px-6 pb-20">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-plot-ink/45 mb-4">
              Más de imprenta minera
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Manuales", href: "/servicios/mineria/manuales" },
                { label: "Folletos y catálogos", href: "/servicios/mineria/folletos-y-catalogos" },
                { label: "Talonarios", href: "/servicios/mineria/talonarios" },
                { label: "Papelería corporativa", href: "/servicios/mineria/papeleria-corporativa" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl bg-white/90 border border-brand-navy/10 px-5 py-4 text-sm font-bold uppercase tracking-wide text-plot-ink hover:border-brand-orange/40 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
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
