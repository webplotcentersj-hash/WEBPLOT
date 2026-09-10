"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { BrandBackground } from "@/components/brand-motif";
import { brand } from "@/lib/brand";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Wrapper simple — usado también en páginas de servicio */
export const CometCard = ({
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) => (
  <div
    className={cn("relative rounded-[20px] h-full", className)}
    style={{ boxShadow: "rgba(0,0,0,0.35) 0px 20px 40px -12px" }}
  >
    {children}
  </div>
);

const services = [
  {
    id: "1",
    title1: "IMPRESIÓN",
    title2: "DIGITAL",
    tagline: "Alta calidad en gran y pequeño formato",
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Rectangle-72.png",
    accent: brand.yellow,
    accentSoft: "rgba(252, 220, 50, 0.45)",
    href: "/servicios/impresion-digital",
  },
  {
    id: "2",
    title1: "GRÁFICA",
    title2: "INTEGRAL",
    tagline: "De la idea a la instalación final",
    image: "/Galerry/Foto 22.png",
    accent: brand.orange,
    accentSoft: "rgba(243, 149, 25, 0.5)",
    href: "/servicios/grafica-integral",
  },
  {
    id: "3",
    title1: "VÍA",
    title2: "PÚBLICA",
    tagline: "Cartelería y gran formato urbano",
    image: "https://plotcenter.com.ar/wp-content/uploads/2026/02/Group-194.png",
    accent: brand.red,
    accentSoft: "rgba(229, 47, 42, 0.45)",
    href: "/servicios/via-publica",
  },
  {
    id: "4",
    title1: "DISEÑO",
    title2: "GRÁFICO",
    tagline: "Identidad y piezas con estrategia",
    image: "/Galerry/Rectangle 40 (1).png",
    accent: brand.pink,
    accentSoft: "rgba(232, 75, 147, 0.45)",
    href: "/servicios/diseno-grafico",
  },
  {
    id: "5",
    title1: "DESARROLLO",
    title2: "WEB",
    tagline: "Sitios, sistemas e IA a medida",
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-01.png",
    accent: brand.cyan,
    accentSoft: "rgba(0, 160, 198, 0.45)",
    href: "/servicios/desarrollo-web",
  },
  {
    id: "6",
    title1: "ARMADO DE",
    title2: "STANDS",
    tagline: "Estructuras y presencia de marca",
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-141.png",
    accent: brand.purple,
    accentSoft: "rgba(98, 74, 151, 0.5)",
    href: "/servicios/stand",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="relative z-10 w-full py-14 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <BrandBackground variant="sunburst" intensity={0.65} veil={0.32} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10 md:mb-14 text-center">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter leading-[0.9] flex flex-col items-center justify-center gap-1 text-plot-ink drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)]">
            <span>NUESTROS</span>
            <span className="text-brand-orange font-display uppercase tracking-tighter">
              servicios
            </span>
          </h2>
          <p className="mt-4 text-plot-ink-muted text-base md:text-lg max-w-xl mx-auto">
            Elegí un servicio para ver más detalles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded-[20px]"
            >
              <CometCard className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
                <div
                  className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-[#0A0A0A]"
                  style={{
                    border: `1.5px solid ${service.accent}55`,
                    boxShadow: `0 16px 36px rgba(0,0,0,0.35), 0 12px 28px -10px ${service.accentSoft}`,
                  }}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    alt={`${service.title1} ${service.title2}`}
                    src={service.image}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-500 ease-out group-hover:scale-105"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(160deg, ${service.accent}33 0%, transparent 42%),
                        linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.12) 72%, transparent 100%)
                      `,
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none"
                    style={{ background: service.accent }}
                  />
                  <div
                    className="absolute top-5 right-5 flex gap-0.5 font-display text-lg leading-none tracking-tighter pointer-events-none"
                    style={{ color: service.accent }}
                    aria-hidden
                  >
                    <span>››</span>
                    <span className="opacity-70">››</span>
                    <span className="opacity-40">››</span>
                  </div>
                  <div className="absolute bottom-5 left-4 right-4 sm:bottom-7 sm:left-6 sm:right-6 flex flex-col text-white">
                    <span
                      className="mb-2 inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black"
                      style={{ background: service.accent }}
                    >
                      Plot Center
                    </span>
                    <span className="font-display uppercase text-xl sm:text-2xl md:text-3xl leading-[0.95] tracking-tight drop-shadow-lg">
                      {service.title1}
                    </span>
                    <span
                      className="font-display uppercase text-2xl sm:text-3xl md:text-4xl leading-[0.95] tracking-tight drop-shadow-lg"
                      style={{ color: service.accent }}
                    >
                      {service.title2}
                    </span>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium leading-snug text-white/80">
                      {service.tagline}
                    </p>
                    <span
                      className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{ color: service.accent }}
                    >
                      Ver más
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </CometCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
