"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CursorWrapper from "@/components/cursor-wrapper"
import MagneticButton from "@/components/magnetic-button"

// Roles data
const ROLES = [
  { title: "Diseñadores", description: "Mentes creativas que dan forma visual a las marcas del futuro." },
  { title: "Operarios", description: "Manos expertas que materializan nuestras ideas más audaces en el mundo físico." },
  { title: "Técnicos", description: "Especialistas que garantizan precisión absoluta y calidad técnica inigualable." },
  { title: "Vendedores", description: "Estrategas empáticos que conectan soluciones de alto impacto con grandes desafíos." },
  { title: "Administrativos", description: "El motor metódico e inteligente que mantiene todo el ecosistema en perfecto equilibrio." },
]

// Reusable animated text
const TextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ")
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function TrabajaConNosotrosPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax para el Hero
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden selection:bg-white/20">
      
      <Header />
      <CursorWrapper>
        
        {/* 1. HERO SECTION */}
        <section className="relative pt-48 pb-20 px-6 min-h-[90vh] flex flex-col justify-center items-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-[1280px] mx-auto w-full relative z-10 text-center flex flex-col items-center"
          >
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 mb-8 font-light flex items-center justify-center gap-4"
            >
              <span className="w-8 h-px bg-gray-700"></span>
              Join the team
              <span className="w-8 h-px bg-gray-700"></span>
            </motion.p>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light leading-[1.05] mb-10 tracking-tight">
              <TextReveal text="Construí" /> <br className="md:hidden" />
              <span className="font-semibold text-white">
                <TextReveal text="tu futuro." />
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed"
            >
              Buscamos personas con iniciativa, compromiso y pasión por el <span className="text-white">diseño</span>, la <span className="text-white">producción</span> y la <span className="text-white">innovación</span>.
            </motion.p>
          </motion.div>
        </section>

        {/* 2. FILOSOFÍA (QUOTE GIGANTE) */}
        <section className="relative py-32 px-6 z-10 bg-black/50 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-[1280px] mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight max-w-5xl mx-auto">
              <span className="text-gray-500">En Plot Center creemos que el talento </span>
              <span className="text-white font-medium">construye nuestro presente</span>
              <span className="text-gray-500"> y </span>
              <span className="text-white font-medium">proyecta nuestro futuro.</span>
            </h2>
          </div>
        </section>

        {/* 3. ROLES GRID */}
        <section className="relative py-32 px-6 z-10">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
              <div>
                <h3 className="text-3xl md:text-5xl font-light tracking-tight">
                  Cada talento <span className="font-semibold">suma al éxito.</span>
                </h3>
              </div>
              <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold">Áreas de impacto</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROLES.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="group relative p-8 md:p-10 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                  
                  <div className="text-sm font-black text-gray-500 tracking-widest mb-4 transition-colors group-hover:text-white/60">
                    0{index + 1}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-medium mb-4">{role.title}</h4>
                  <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                    {role.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CTA FINAL (BOTÓN MAGNÉTICO) */}
        <section className="relative py-40 px-6 z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12">
              ¿Listo para <span className="font-semibold italic">evolucionar</span> con nosotros?
            </h2>
            
            <div className="flex justify-center">
              <MagneticButton 
                href="https://plotrello.vercel.app/trabaja-con-nosotros" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-black font-semibold px-12 py-5 rounded-full text-sm md:text-base tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Cargar Mi CV Ahora
              </MagneticButton>
            </div>
          </motion.div>
        </section>

      </CursorWrapper>
      <Footer />
    </main>
  )
}
