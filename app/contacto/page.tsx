"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  MessageSquare,
  Building2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground } from "@/components/brand-motif"
import { brand } from "@/lib/brand"
import { EMAIL, PHONE, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/contact"
const ADDRESS = "Libertador 580 Este (casi Caseros)"
const ADDRESS_FULL = "Av. Libertador General San Martín Este 580, San Juan, Argentina"
const MAP_QUERY = encodeURIComponent(`${ADDRESS_FULL}`)
const MAP_EMBED = `https://maps.google.com/maps?q=${MAP_QUERY}&hl=es&z=17&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`

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

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = encodeURIComponent(`Consulta web — ${form.name}`)
    const body = encodeURIComponent(
      [
        `Nombre: ${form.name}`,
        `Email: ${form.email}`,
        form.company ? `Empresa: ${form.company}` : null,
        "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n")
    )

    // Preferimos mailto al correo oficial; WhatsApp como refuerzo visual en la página
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setForm({ name: "", email: "", company: "", message: "" })
    }, 600)
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
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-10 md:pb-14 px-4 sm:px-6 z-10">
          <div className="max-w-[1280px] mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-plot-ink/50 mb-5 font-medium flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-brand-orange" />
              Hablanos
              <span className="w-8 h-px bg-brand-cyan" />
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display uppercase leading-[0.95] mb-5 tracking-tight text-plot-ink">
              <TextReveal text="Contacto" />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-plot-ink/70 font-medium max-w-2xl mx-auto leading-relaxed px-1">
              Escribinos, llamanos o pasá por el local. Estamos en Libertador 580 Este,
              casi Caseros.
            </p>
          </div>
        </section>

        {/* DATOS + FORM — columnas de igual altura */}
        <section className="relative z-10 px-4 sm:px-6 pb-12 md:pb-16">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Info */}
            <div className="lg:col-span-5 flex flex-col gap-3 h-full min-h-[480px]">
              <motion.a
                href={`tel:${PHONE_TEL}`}
                whileHover={{ x: 4 }}
                className="flex-1 flex items-center gap-4 rounded-[1.5rem] bg-white/95 border border-brand-navy/10 p-5 sm:p-6 shadow-[0_16px_40px_-24px_rgba(26,30,56,0.25)] hover:border-brand-orange/40 transition-colors min-h-[96px]"
              >
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
                  style={{ background: brand.orange }}
                >
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-plot-ink/45 mb-1">
                    Teléfono
                  </p>
                  <p className="text-xl sm:text-2xl font-display uppercase tracking-tight text-plot-ink">
                    {PHONE_DISPLAY}
                  </p>
                  <p className="text-sm text-plot-ink/55 font-medium mt-0.5">{PHONE}</p>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${EMAIL}`}
                whileHover={{ x: 4 }}
                className="flex-1 flex items-center gap-4 rounded-[1.5rem] bg-white/95 border border-brand-navy/10 p-5 sm:p-6 shadow-[0_16px_40px_-24px_rgba(26,30,56,0.25)] hover:border-brand-cyan/40 transition-colors min-h-[96px]"
              >
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
                  style={{ background: brand.cyan }}
                >
                  <Mail className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-plot-ink/45 mb-1">
                    Email
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-plot-ink break-all">
                    {EMAIL}
                  </p>
                </div>
              </motion.a>

              <motion.a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex-1 flex items-center gap-4 rounded-[1.5rem] bg-white/95 border border-brand-navy/10 p-5 sm:p-6 shadow-[0_16px_40px_-24px_rgba(26,30,56,0.25)] hover:border-brand-red/40 transition-colors min-h-[96px]"
              >
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
                  style={{ background: brand.red }}
                >
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-plot-ink/45 mb-1">
                    Ubicación
                  </p>
                  <p className="text-lg sm:text-xl font-display uppercase tracking-tight text-plot-ink leading-tight">
                    {ADDRESS}
                  </p>
                  <p className="text-sm text-plot-ink/55 font-medium mt-1">San Juan, Argentina</p>
                </div>
              </motion.a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 w-full rounded-full bg-brand-navy text-white font-bold px-8 py-4 text-sm tracking-wide uppercase hover:bg-brand-navy2 transition-colors"
              >
                WhatsApp
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 h-full min-h-[480px] flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 border border-brand-navy/10 p-6 sm:p-7 md:p-10 shadow-[0_24px_60px_-28px_rgba(26,30,56,0.3)]">
              <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-plot-ink mb-2">
                Escribinos
              </h2>
              <p className="text-plot-ink/60 font-medium mb-6 sm:mb-8">
                Completá el formulario y te respondemos a la brevedad.
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-10"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-white"
                    style={{ background: brand.orange }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display uppercase tracking-tight text-plot-ink mb-2">
                    ¡Listo!
                  </h3>
                  <p className="text-plot-ink/60 font-medium mb-6 max-w-sm">
                    Se abrió tu cliente de correo con el mensaje. Si no, escribinos a{" "}
                    <a href={`mailto:${EMAIL}`} className="text-brand-orange font-bold">
                      {EMAIL}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="rounded-full border border-brand-navy/15 px-6 py-3 text-sm font-bold uppercase tracking-wide text-plot-ink"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <label className="relative block group">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-plot-ink/30 group-focus-within:text-brand-orange transition-colors" />
                      </span>
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        type="text"
                        required
                        placeholder="Nombre completo"
                        className="w-full bg-plot-bg/60 border border-brand-navy/10 rounded-2xl py-4 pl-12 pr-4 text-plot-ink placeholder:text-plot-ink/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange/50"
                      />
                    </label>
                    <label className="relative block group">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-plot-ink/30 group-focus-within:text-brand-orange transition-colors" />
                      </span>
                      <input
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        type="email"
                        required
                        placeholder="Correo electrónico"
                        className="w-full bg-plot-bg/60 border border-brand-navy/10 rounded-2xl py-4 pl-12 pr-4 text-plot-ink placeholder:text-plot-ink/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange/50"
                      />
                    </label>
                  </div>

                  <label className="relative block group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-plot-ink/30 group-focus-within:text-brand-orange transition-colors" />
                    </span>
                    <input
                      name="company"
                      value={form.company}
                      onChange={onChange}
                      type="text"
                      placeholder="Empresa o proyecto (opcional)"
                      className="w-full bg-plot-bg/60 border border-brand-navy/10 rounded-2xl py-4 pl-12 pr-4 text-plot-ink placeholder:text-plot-ink/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange/50"
                    />
                  </label>

                  <label className="relative block group flex-1 flex flex-col min-h-[140px]">
                    <span className="absolute top-4 left-0 pl-4 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-plot-ink/30 group-focus-within:text-brand-orange transition-colors" />
                    </span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      required
                      rows={5}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full flex-1 min-h-[140px] bg-plot-bg/60 border border-brand-navy/10 rounded-2xl py-4 pl-12 pr-4 text-plot-ink placeholder:text-plot-ink/35 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange/50 resize-none"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange text-plot-ink font-bold px-8 py-4 text-sm tracking-wide uppercase disabled:opacity-70"
                  >
                    {isSubmitting ? "Abriendo correo…" : "Enviar mensaje"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* MAPA */}
        <section className="relative z-10 px-4 sm:px-6 pb-16 md:pb-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5 px-1">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange mb-2">
                  Cómo llegar
                </p>
                <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-plot-ink">
                  {ADDRESS}
                </h2>
              </div>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-full border border-brand-navy/15 bg-white/90 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-plot-ink/80 hover:bg-white"
              >
                Abrir en Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative rounded-[1.75rem] overflow-hidden border border-brand-navy/15 bg-brand-navy shadow-[0_40px_90px_-30px_rgba(26,30,56,0.5)]">
              <div className="relative w-full h-[min(50svh,560px)] min-h-[240px] sm:min-h-[360px]">
                <iframe
                  title="Mapa Plot Center — Libertador 580 Este"
                  src={MAP_EMBED}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </main>
  )
}
