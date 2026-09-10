"use client"

import { ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer } from "@/components/ui/animated-gallery"
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif"

const IMAGES_1 = [
  "/Galerry/Foto 11 (2).png",
  "/Galerry/Foto 130.png",
  "/Galerry/Foto 131 (1).png",
]
const IMAGES_2 = [
  "/Galerry/Foto 133.png",
  "/Galerry/Foto 134.png",
  "/Galerry/Foto 22.png",
  "/Galerry/Foto 36.png",
]
const IMAGES_3 = [
  "/Galerry/Foto 48 (1).png",
  "/Galerry/Foto 55.png",
  "/Galerry/Rectangle 40 (1).png",
]

const ALL_IMAGES = [...IMAGES_1, ...IMAGES_2, ...IMAGES_3]

export const DemoVariant1 = () => {
  return (
    <div id="animated-gallery" className="relative bg-white overflow-x-clip md:cursor-none">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <BrandBackground variant="mosaic" intensity={1} veil={0.12} />
        </div>
      </div>

      <ContainerStagger className="relative z-50 -mb-6 md:-mb-12 place-self-center px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 text-center max-w-full">
        <ContainerAnimated>
          <BrandTextPanel className="inline-block mx-auto max-w-[min(100%,40rem)]">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-plot-ink leading-[1.05]">
              Nuestros <span className="text-brand-red font-display">Trabajos</span>
            </h1>
            <p className="mt-3 leading-normal tracking-tight text-plot-ink-muted max-w-xl mx-auto uppercase text-xs sm:text-sm font-bold tracking-wider px-1">
              Un recorrido por nuestros mejores trabajos y proyectos realizados.
            </p>
          </BrandTextPanel>
        </ContainerAnimated>
      </ContainerStagger>

      {/* Móvil / tablet chica: grilla 2 columnas legible */}
      <div className="relative z-10 md:hidden px-3 sm:px-4 pb-14 pt-2">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {ALL_IMAGES.map((imageUrl, index) => (
            <img
              key={imageUrl}
              className={`block w-full rounded-lg object-cover shadow-[0_12px_28px_-10px_rgba(26,30,56,0.28)] ring-2 ring-white ${
                index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"
              }`}
              src={imageUrl}
              alt={`Trabajo ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Desktop: galería scroll 3D */}
      <ContainerScroll className="relative hidden md:block h-[260vh] lg:h-[300vh] z-10">
        <ContainerSticky className="h-[100svh] min-h-0">
          <GalleryContainer className="gap-2 px-2 lg:px-0">
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="block h-auto max-h-full w-full rounded-xl object-cover shadow-[0_20px_40px_-12px_rgba(26,30,56,0.3)] ring-4 ring-white"
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
              {IMAGES_2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="block h-auto max-h-full w-full rounded-xl object-cover shadow-[0_20px_40px_-12px_rgba(26,30,56,0.3)] ring-4 ring-white"
                  src={imageUrl}
                  alt={`Gallery image ${index + 4}`}
                  loading="lazy"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="block h-auto max-h-full w-full rounded-xl object-cover shadow-[0_20px_40px_-12px_rgba(26,30,56,0.3)] ring-4 ring-white"
                  src={imageUrl}
                  alt={`Gallery image ${index + 8}`}
                  loading="lazy"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
