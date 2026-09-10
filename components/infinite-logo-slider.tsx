"use client"

const logos = [
  { name: "Brand 23", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-23_Mesa-de-trabajo-1.png" },
  { name: "Brand 22", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-22_Mesa-de-trabajo-1.png" },
  { name: "Brand 21", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-21_Mesa-de-trabajo-1.png" },
  { name: "Brand 20", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-20_Mesa-de-trabajo-1.png" },
  { name: "Brand 19", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-19_Mesa-de-trabajo-1.png" },
  { name: "Brand 18", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-18_Mesa-de-trabajo-1.png" },
  { name: "Brand 17", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-17_Mesa-de-trabajo-1.png" },
  { name: "Brand 16", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-16_Mesa-de-trabajo-1.png" },
  { name: "Brand 15", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-15_Mesa-de-trabajo-1.png" },
  { name: "Brand 14", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-14_Mesa-de-trabajo-1.png" },
  { name: "Brand 13", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-13_Mesa-de-trabajo-1.png" },
  { name: "Brand 11", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-11_Mesa-de-trabajo-1.png" },
  { name: "Brand 10", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-10_Mesa-de-trabajo-1.png" },
  { name: "Brand 08", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-08_Mesa-de-trabajo-1.png" },
  { name: "Brand 07", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-07_Mesa-de-trabajo-1.png" },
  { name: "Brand 06", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-06_Mesa-de-trabajo-1.png" },
  { name: "Brand 05", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-05_Mesa-de-trabajo-1.png" },
  { name: "Brand 04", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-04_Mesa-de-trabajo-1.png" },
  { name: "Brand 03", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-03_Mesa-de-trabajo-1.png" },
  { name: "Brand 02", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-02_Mesa-de-trabajo-1.png" },
  { name: "Brand 01", src: "https://plotcenter.com.ar/wp-content/uploads/2025/04/LOGO-01_Mesa-de-trabajo-1.png" }
]

export default function InfiniteLogoSlider() {
  // Como ahora tenemos 21 logos, un solo bloque ya cubre la pantalla.
  // Solo necesitamos duplicarlo una vez para lograr el loop continuo infinito.
  const sliderContent = [...logos, ...logos]

  return (
    <div className="w-full overflow-hidden py-6 sm:py-10 relative mask-gradient bg-transparent">
      {/* Inject CSS keyframes locally to ensure it works without global dependencies */}
      <style jsx>{`
        @keyframes infinite-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-slide {
          animation: infinite-slide 40s linear infinite;
        }
        /* Pause on hover if desired, but user requested infinite non-stop */
        /* .animate-infinite-slide:hover {
          animation-play-state: paused;
        } */
      `}</style>

      <div className="flex w-max animate-infinite-slide">
        {sliderContent.map((logo, index) => (
          <div
            key={index}
            className="relative h-[44px] sm:h-[60px] md:h-[80px] w-[120px] sm:w-[160px] md:w-[220px] flex items-center justify-center flex-shrink-0 mx-3 sm:mx-6 md:mx-10 opacity-100 hover:grayscale hover:opacity-70 transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src || "/placeholder.svg"}
              alt={logo.name}
              className="h-full w-auto max-h-[36px] sm:max-h-[50px] md:max-h-[70px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
