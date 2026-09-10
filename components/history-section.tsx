"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif";

export default function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [200, -200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 100 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-white overflow-hidden flex justify-center"
    >
      <BrandBackground variant="frame-dark" intensity={1} veil={0.12} />

      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
      >
        <span className="text-[clamp(4rem,28vw,20rem)] font-display text-plot-ink/[0.06] whitespace-nowrap">
          2017
        </span>
      </motion.div>

      <div className="max-w-[1400px] w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <motion.div
          className="lg:col-span-5 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <BrandTextPanel>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-display uppercase tracking-tight text-plot-ink leading-[1.05] mb-6 space-y-1"
            >
              <span className="block">Conocé</span>
              <span className="block">nuestra</span>
              <span className="block text-brand-cyan">historia</span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="w-24 h-2 my-6 md:my-8 rounded-full bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink"
            />

            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-light text-plot-ink leading-tight max-w-md"
            >
              Convertimos tu idea en una{" "}
              <span className="text-brand-red font-bold">experiencia</span>.
            </motion.h3>
          </BrandTextPanel>
        </motion.div>

        <motion.div
          className="lg:col-span-7 flex flex-col gap-6 md:gap-8 text-lg md:text-xl font-light leading-relaxed justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <BrandTextPanel className="space-y-6 text-plot-ink">
            <motion.p variants={itemVariants}>
              Desde 2017 transformamos ideas en soluciones gráficas de alto impacto,
              integrando creatividad, tecnología y gestión profesional. Nacimos como
              una pequeña empresa y hoy somos una industria integral de comunicación
              visual con más de{" "}
              <strong className="text-plot-ink font-bold">45 colaboradores</strong>,
              cumpliendo con todas las normativas.
            </motion.p>

            <motion.p variants={itemVariants}>
              Trabajamos con entidades públicas y privadas, aplicando los más altos
              estándares de seguridad y calidad, y avanzamos en la certificación de
              la{" "}
              <strong className="text-plot-ink font-bold">trilogía de normas ISO</strong>.
            </motion.p>

            <motion.p variants={itemVariants}>
              Incorporamos tecnología 4.0 para ofrecer soluciones innovadoras y
              eficientes. Mostramos qué hacemos y, sobre todo, cómo lo hacemos: con
              procesos optimizados y una filosofía de mejora continua.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-2 p-5 md:p-6 rounded-xl bg-plot-ink text-white relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-brand-yellow via-brand-pink to-brand-cyan" />
              <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed italic pl-2">
                &quot;Somos un equipo que impulsa innovación, excelencia y
                experiencias visuales que inspiran, porque la verdadera comunicación{" "}
                <span className="text-brand-yellow not-italic font-display uppercase tracking-tight">
                  no solo se ve... se vive.
                </span>
                &quot;
              </p>
            </motion.div>
          </BrandTextPanel>
        </motion.div>
      </div>
    </section>
  );
}
