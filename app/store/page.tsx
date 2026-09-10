"use client"

import { motion } from "framer-motion"
import { Phone, Mail, ExternalLink, ShoppingBag } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BrandBackground } from "@/components/brand-motif"
import { brand } from "@/lib/brand"

const PHONE = "2646212163"
const PHONE_DISPLAY = "264 621-2163"
const PHONE_TEL = "+542646212163"
const EMAIL = "contacto@plotcenter.com.ar"

export default function StorePage() {
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

        <section className="relative z-10 pt-32 md:pt-40 pb-20 px-6 min-h-[70vh] flex flex-col justify-center">
          <div className="max-w-[900px] mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-plot-ink/50 mb-5 font-medium flex items-center justify-center gap-4">
                <span className="w-8 h-px bg-brand-orange" />
                Store
                <span className="w-8 h-px bg-brand-cyan" />
              </p>

              <div
                className="mx-auto mb-8 w-16 h-16 rounded-2xl flex items-center justify-center text-plot-ink"
                style={{ background: brand.orange }}
              >
                <ShoppingBag className="w-7 h-7" strokeWidth={2.2} />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase leading-[0.95] mb-5 tracking-tight text-plot-ink">
                Pedidos y <span className="text-brand-orange">consultas</span>
              </h1>
              <p className="text-lg md:text-xl text-plot-ink/70 font-medium max-w-xl mx-auto mb-12 leading-relaxed">
                Para comprar o cotizar, escribinos o llamanos. Te atendemos por teléfono o email.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
              <motion.a
                href={`tel:${PHONE_TEL}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[1.75rem] bg-white/95 border border-brand-navy/10 p-8 text-left shadow-[0_20px_50px_-24px_rgba(26,30,56,0.28)] hover:border-brand-orange/50 transition-colors"
              >
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-5"
                  style={{ background: brand.orange }}
                >
                  <Phone className="w-5 h-5" />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-plot-ink/45 mb-2">
                  Teléfono
                </p>
                <p className="text-3xl font-display uppercase tracking-tight text-plot-ink">
                  {PHONE_DISPLAY}
                </p>
                <p className="text-sm text-plot-ink/50 font-medium mt-1">{PHONE}</p>
              </motion.a>

              <motion.a
                href={`mailto:${EMAIL}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="rounded-[1.75rem] bg-white/95 border border-brand-navy/10 p-8 text-left shadow-[0_20px_50px_-24px_rgba(26,30,56,0.28)] hover:border-brand-cyan/50 transition-colors"
              >
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-5"
                  style={{ background: brand.cyan }}
                >
                  <Mail className="w-5 h-5" />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-plot-ink/45 mb-2">
                  Email
                </p>
                <p className="text-xl md:text-2xl font-bold text-plot-ink break-all leading-snug">
                  {EMAIL}
                </p>
              </motion.a>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://www.plotcenterlab.com.ar/consulta-cliente"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy text-white font-bold px-8 py-4 text-sm tracking-wide uppercase"
              >
                Hacer un pedido
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white/90 text-plot-ink font-bold px-8 py-4 text-sm tracking-wide uppercase"
              >
                Ir a contacto
              </a>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </main>
  )
}
