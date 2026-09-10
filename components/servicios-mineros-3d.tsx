"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { BrandBackground } from "@/components/brand-motif";

export default function ServiciosMineros3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const playVideo = () => {
    if (!hasPlayed.current && videoRef.current) {
      videoRef.current.play().catch(() => {});
      hasPlayed.current = true;
    }
  };

  useEffect(() => {
    if (isInView) {
      playVideo();
    }
  }, [isInView]);

  // --- LÓGICA PARALLAX PROFESIONAL ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs muy suaves para dar sensación de peso
  const springConfig = { stiffness: 40, damping: 30 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Capa 1: Fondo Base
  const bgX = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  // Capa 2: Textos (Primer Plano, más rápidos)
  const textX = useTransform(mouseX, [-0.5, 0.5], [25, -25]);
  const textY = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  // Capa 3: Camión (Movimiento sutil opuesto)
  const truckX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const truckY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playVideo}
      className="relative w-full h-[75svh] min-h-[420px] sm:min-h-[520px] md:h-[100vh] md:min-h-[700px] overflow-hidden bg-white flex items-center justify-center group"
      id="mineria"
    >
      <BrandBackground variant="arcs-field" intensity={1} veil={0.12} />
      {/* 1. FONDO WEB (Tonos cálidos y cinematográficos) */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff5500] via-[#5a1800] to-[#050100] opacity-80"></div>
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full max-w-[100%] h-[50vh] bg-[#ff6a00] blur-[100px] md:blur-[150px] opacity-25 rounded-full"></div>
      </motion.div>



      {/* 3. CAPA CAMIÓN EN VIDEO */}
      <motion.div 
        style={{ x: truckX, y: truckY }}
        className="absolute z-10 w-full flex justify-center bottom-[5%] md:bottom-[0%] pointer-events-none px-2"
      >
        <div className="relative w-full md:w-[95vw] max-w-[1500px] flex justify-center items-end">
          
          {/* Halos de luz de los faros */}
          <div className="absolute top-[42%] left-[18%] w-24 h-24 md:w-48 md:h-48 bg-white rounded-full blur-[40px] opacity-30 mix-blend-overlay"></div>
          <div className="absolute top-[42%] right-[28%] w-24 h-24 md:w-48 md:h-48 bg-white rounded-full blur-[40px] opacity-30 mix-blend-overlay"></div>

          {/* Video del Camión con CSS MASK. */}
          <video 
            ref={videoRef}
            src="https://plotcenter.com.ar/wp-content/uploads/2026/05/cinematic_202605080827.mp4" 
            muted 
            playsInline
            className="w-full h-auto object-contain opacity-100 drop-shadow-[0_0_30px_rgba(255,85,0,0.3)]"
            style={{
              WebkitMaskImage: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
              maskImage: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)"
            }}
          />
        </div>
      </motion.div>

      {/* 4. CAPA DE TEXTO (1ER PLANO - Flotando arriba de todo con entrada animada) */}
      <motion.div 
        style={{ x: textX, y: textY }}
        className="absolute z-20 flex flex-col items-center justify-center top-[15%] md:top-[12%] w-full select-none pointer-events-none"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.5rem,12vw,13rem)] font-black leading-[0.85] text-transparent uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,85,0,0.6)]"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}
        >
          Servicios
        </motion.h2>
        <motion.h2 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.5rem,12vw,13rem)] font-black leading-[0.85] text-white uppercase tracking-tighter drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
        >
          Mineros
        </motion.h2>
        <a
          href="/servicios/mineria"
          className="pointer-events-auto mt-6 md:mt-8 inline-flex items-center gap-2 rounded-full bg-white text-black font-black uppercase tracking-wider text-xs md:text-sm px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-[#ff5500] hover:text-white transition-colors"
        >
          Ver servicios mineros
        </a>
      </motion.div>

      {/* 5. SUELO OSCURO (Fundido para anclar el entorno) */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050100] via-[#050100]/80 to-transparent z-30 pointer-events-none"></div>

    </section>
  );
}


