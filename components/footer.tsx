"use client"

import { motion } from "framer-motion"
import InfiniteLogoSlider from "./infinite-logo-slider"
import PlotCenter3D from "./plot-center-3d"

const PAGES = [
  { name: "HOME", href: "/" },
  { name: "CONTACTO", href: "/contacto" },
  { name: "BLOG", href: "/blog" },
  {
    name: "STORE",
    href: "https://www.plotcenterlab.com.ar/cliente/login",
    external: true,
    accent: true,
  },
]

const SOCIALS = [
  { name: "INSTAGRAM", url: "https://www.instagram.com/plotcentersj/?hl=es" },
  {
    name: "FACEBOOK",
    url: "https://www.facebook.com/profile.php?id=61583706273581&ref=PROFILE_EDIT_xav_ig_profile_page_web#",
  },
  {
    name: "LINKEDIN",
    url: "https://linkedin.com/company/plot-center-srl?originalSubdomain=ar",
  },
  { name: "TIKTOK", url: "https://www.tiktok.com/@plotcenter" },
]

export default function Footer() {
  return (
    <footer className="bg-brand-orange pt-0 px-3 sm:px-5 lg:px-8 min-h-0 flex flex-col justify-end relative pb-4 sm:pb-5 overflow-x-clip">
      <div className="absolute top-0 left-0 right-0 h-28 sm:h-40 lg:h-72 bg-gradient-to-b from-plot-bg via-brand-yellow/30 to-brand-orange z-0" />

      <div className="relative flex-1 flex flex-col w-full max-w-[1688px] mx-auto mt-6 sm:mt-8 lg:mt-12 z-10">
        {/* Fondo móvil/notebook: card redondeada */}
        <div className="lg:hidden absolute inset-0 z-0 bg-brand-navy rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'url("/images/curv.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Fondo desktop: máscara SVG */}
        <div
          className="hidden lg:block absolute inset-0 z-0 bg-brand-navy overflow-hidden"
          style={{
            maskImage: 'url("/images/footer-mask.svg")',
            WebkitMaskImage: 'url("/images/footer-mask.svg")',
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url("/images/curv.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="relative z-20 flex flex-col px-5 sm:px-8 lg:px-24 py-8 sm:py-10 lg:py-20 lg:pb-12 lg:pl-0 lg:pr-0">
          {/* Bloque principal: en móvil título+cubo; en desktop grilla 3 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 lg:items-stretch lg:min-h-[640px]">
            {/* Pages — debajo en móvil, izquierda en desktop */}
            <div className="order-2 lg:order-1 lg:col-span-3 text-left lg:text-center lg:pl-8 lg:flex lg:flex-col lg:justify-center">
              <div className="grid grid-cols-2 gap-6 lg:block border-t border-white/10 lg:border-0 pt-6 lg:pt-0">
                <div>
                  <h4 className="font-black text-[10px] sm:text-xs uppercase mb-3 lg:mb-6 text-white/40 tracking-[0.2em]">
                    Pages
                  </h4>
                  <ul className="space-y-2">
                    {PAGES.map((item) => (
                      <li key={item.name} className="leading-5">
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className={`font-black text-sm sm:text-base lg:text-2xl uppercase transition-colors inline-block leading-none ${
                            item.accent
                              ? "text-brand-orange hover:text-white"
                              : "text-white hover:text-brand-orange"
                          }`}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Socials al lado en móvil; en desktop se ocultan aquí */}
                <div className="lg:hidden">
                  <h4 className="font-black text-[10px] sm:text-xs uppercase mb-3 text-white/40 tracking-[0.2em]">
                    Follow
                  </h4>
                  <ul className="space-y-2">
                    {SOCIALS.map((social) => (
                      <li key={social.name}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 font-bold text-sm sm:text-base uppercase tracking-wide hover:text-brand-orange transition-colors"
                        >
                          {social.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 lg:hidden">
                <a
                  href="https://plotrello.vercel.app/trabaja-con-nosotros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-white/15 bg-white/5 rounded-full px-3.5 py-2"
                >
                  <span className="text-white/80 text-[10px] font-black tracking-[0.14em] uppercase">
                    Trabaja con nosotros
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-orange">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Centro: título + cubo + CTA */}
            <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-center justify-center relative min-w-0 gap-5 sm:gap-6 lg:gap-0">
              <div className="relative lg:absolute lg:top-0 lg:left-0 lg:right-0 z-0 w-full lg:text-center lg:mt-16 xl:mt-24 flex-1 min-w-0">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-[clamp(1.5rem,6.5vw,5rem)] font-display uppercase tracking-tighter leading-[0.95] text-brand-orange"
                >
                  <span className="block">Ecosistema de</span>
                  <span className="block">comunicación</span>
                  <span className="block text-white">
                    de alto <span className="text-brand-cyan">impacto.</span>
                  </span>
                </motion.h2>

                <motion.a
                  href="/contacto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.03 }}
                  className="mt-5 lg:hidden inline-flex items-center gap-2 bg-brand-orange text-plot-ink font-black uppercase px-5 py-3 rounded-xl text-xs tracking-wider"
                >
                  HABLANOS
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.a>
              </div>

              {/* Un solo canvas 3D */}
              <div className="relative z-10 shrink-0 w-[112px] h-[112px] sm:w-[140px] sm:h-[140px] lg:w-[min(28vw,400px)] lg:h-auto lg:aspect-square lg:mt-44 lg:mx-auto max-w-full">
                <PlotCenter3D />
              </div>

              <motion.a
                href="/contacto"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:inline-flex absolute -bottom-12 z-20 bg-brand-orange text-plot-ink font-black uppercase px-8 py-4 rounded-[14px] text-sm tracking-wider hover:bg-white transition-colors items-center gap-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]"
              >
                HABLANOS
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>
            </div>

            {/* Follow — solo desktop */}
            <div className="hidden lg:flex order-3 lg:col-span-3 text-center pr-8 flex-col justify-center">
              <h4 className="font-black text-xs uppercase mb-6 text-lorenzo-text-light/40 tracking-[0.2em]">
                FOLLOW ON
              </h4>
              <ul className="space-y-2">
                {SOCIALS.map((social) => (
                  <li className="leading-5" key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lorenzo-text-light font-bold text-2xl uppercase hover:text-lorenzo-accent transition-colors inline-block leading-4"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <a
                  href="https://plotrello.vercel.app/trabaja-con-nosotros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 hover:bg-white/10 hover:border-lorenzo-accent transition-all duration-300"
                >
                  <span className="text-lorenzo-text-light text-[10px] font-black tracking-[0.15em] uppercase opacity-80 group-hover:opacity-100">
                    Trabaja con nosotros
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-lorenzo-accent transition-transform group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-14 -mx-1 lg:mx-0">
            <InfiniteLogoSlider />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1688px] mx-auto px-4 sm:px-8 md:px-12 relative z-20 pt-3 sm:pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-lorenzo-dark text-[10px] sm:text-xs font-bold tracking-wider uppercase gap-2 text-center sm:text-left">
          <p>© 2026 Plot Center S.R.L . All rights reserved</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="/privacy" className="hover:opacity-60 transition-opacity">
              PRIVACY POLICY
            </a>
            <a href="/terms" className="hover:opacity-60 transition-opacity">
              TERMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
