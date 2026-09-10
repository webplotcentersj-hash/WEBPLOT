"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif";
import { brand } from "@/lib/brand";

const contentData = {
  mision: {
    id: "mision",
    title: "Misión",
    color: brand.orange,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/04/Vision-1-e1745515383346.webp",
    Icon: Target,
    text: "Crear y desarrollar soluciones gráficas integrales que transformen ideas en experiencias visuales de alto impacto, combinando creatividad, tecnología 4.0 y procesos de calidad certificada."
  },
  vision: {
    id: "vision",
    title: "Visión",
    color: brand.cyan,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/04/Mision-1-e1745515907374.webp",
    Icon: Eye,
    text: "Consolidarnos como la industria integral de comunicación visual referente en el país y la región, reconocida por integrar creatividad, tecnología 4.0, calidad y responsabilidad sustentable."
  },
  valores: {
    id: "valores",
    title: "Valores",
    color: brand.purple,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/04/Valores-1-e1745515317317.webp",
    Icon: ShieldCheck,
    text: "Guiamos cada proyecto con respeto, empatía y trabajo en equipo. Valoramos la creatividad, la innovación constante y el desarrollo profesional con un servicio confiable."
  }
};

export default function MisionVisionValores3D() {
  const [activeTab, setActiveTab] = useState<keyof typeof contentData>("mision");
  const active = contentData[activeTab];

  return (
    <section className="relative w-full min-h-0 md:min-h-[100svh] bg-white flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 overflow-hidden">
      <BrandBackground variant="mosaic" intensity={1} veil={0.12} />
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[10%] left-[10%] sm:left-[20%] w-[min(100vw,420px)] sm:w-[600px] h-[min(100vw,420px)] sm:h-[600px] rounded-full blur-[80px] sm:blur-[120px] opacity-20 transition-colors duration-300"
          style={{ backgroundColor: active.color }}
        />
        <div 
          className="absolute bottom-[10%] right-[5%] sm:right-[10%] w-[min(100vw,480px)] sm:w-[800px] h-[min(100vw,480px)] sm:h-[800px] rounded-full blur-[100px] sm:blur-[160px] opacity-15 transition-colors duration-300"
          style={{ backgroundColor: active.color }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#eef1ea_80%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-plot-bg-soft via-transparent to-plot-bg-soft opacity-80"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col">
        
        <div className="text-center mb-10 sm:mb-16 mt-4 sm:mt-8">
          <BrandTextPanel className="inline-block mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-plot-ink leading-none">
              NUESTRO <br />
              <span className="text-brand-orange font-brier lowercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl">propósito</span>
            </h2>
          </BrandTextPanel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 mb-8 sm:mb-12">
          {Object.values(contentData).map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id as keyof typeof contentData)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className={`relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] border overflow-hidden group transition-[border-color,box-shadow,background-color] duration-200 ${
                  isActive 
                    ? "bg-white border-2 shadow-[0_16px_40px_rgba(26,30,56,0.14)]" 
                    : "bg-white/95 border border-brand-navy/10 hover:border-brand-navy/20 shadow-md"
                }`}
                style={{
                  boxShadow: isActive ? `0 12px 32px ${item.color}28` : undefined,
                  borderColor: isActive ? item.color : undefined,
                }}
              >
                {isActive && (
                  <div 
                    className="absolute inset-0 opacity-12 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
                  />
                )}

                <div
                  className={`w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 sm:mb-6 bg-plot-ink/[0.06] border-2 shadow-inner transition-[border-color,transform] duration-200 ${isActive ? "scale-105" : ""}`}
                  style={{ borderColor: isActive ? item.color : "rgba(26,30,56,0.1)" }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      ((e.target as HTMLElement).nextSibling as HTMLElement).style.display = 'block';
                    }}
                    className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                  />
                  <item.Icon className="w-8 h-8 sm:w-10 sm:h-10 text-plot-ink hidden" style={{ color: isActive ? item.color : undefined }} />
                </div>

                <h3 
                  className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wide md:tracking-widest transition-colors duration-200"
                  style={{ color: isActive ? item.color : brand.navy }}
                >
                  {item.title}
                </h3>
                
                <div
                  className="mt-6 h-1 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: item.color,
                    width: isActive ? 96 : 48,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        <div className="relative w-full max-w-4xl mx-auto rounded-[1.5rem] sm:rounded-[2rem] bg-white/97 backdrop-blur-xl border border-brand-navy/10 p-6 sm:p-8 md:p-14 shadow-[0_20px_50px_-20px_rgba(26,30,56,0.22)] min-h-[200px] sm:min-h-[250px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10 transition-colors duration-300 pointer-events-none"
            style={{ background: `radial-gradient(circle at top, ${active.color}, transparent)` }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="text-center relative z-10"
            >
              <h4 
                className="text-xl md:text-2xl uppercase tracking-[0.3em] font-bold mb-6"
                style={{ color: active.color }}
              >
                {active.title}
              </h4>
              <p className="text-base sm:text-xl md:text-3xl font-medium text-plot-ink leading-relaxed md:leading-[1.6]">
                {active.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
