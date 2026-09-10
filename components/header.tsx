"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { WHATSAPP_URL } from "@/lib/contact"

const MENU_SOCIALS = [
  { name: "INSTAGRAM", url: "https://www.instagram.com/plotcentersj/?hl=es" },
  {
    name: "LINKEDIN",
    url: "https://linkedin.com/company/plot-center-srl?originalSubdomain=ar",
  },
  { name: "WHATSAPP", url: WHATSAPP_URL },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [logoColor, setLogoColor] = useState<"white" | "dark">("dark")

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrolled(currentScroll >= 300)

      // En tema claro el logo oscuro es el default
      let newColor: "white" | "dark" = "dark"

      const headerOffset = 100

      const video = document.querySelector("video")
      if (video) {
        const rect = video.getBoundingClientRect()
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          newColor = "white"
        }
      }

      const social = document.getElementById("social-section")
      if (social) {
        const rect = social.getBoundingClientRect()
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          newColor = "dark"
        }
      }

      setLogoColor(newColor)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-14 sm:h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center items-start min-w-0"
          >
            <Link href="/" className="block max-w-[120px] sm:max-w-[140px]">
              <Image 
                src="/logon.png" 
                alt="Plot Center" 
                width={140} 
                height={35} 
                className={`w-full h-auto transition-all duration-300 ${logoColor === "white" ? "brightness-0 invert" : ""}`}
                priority
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-lorenzo-dark/80 border border-white/30 hover:bg-lorenzo-dark rounded-lg transition-colors text-white px-3 py-2.5"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-lorenzo-dark/95 backdrop-blur-xl z-40 flex items-center justify-center overflow-y-auto overscroll-contain py-16 px-4"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              className="text-center my-auto"
            >
              <motion.ul className="space-y-4 md:space-y-6 text-xl sm:text-3xl md:text-6xl font-black uppercase text-white">
                {[
                  { name: "NOSOTROS", href: "/#nosotros" },
                  { 
                    name: "SERVICIOS", 
                    href: "#", 
                    subItems: [
                      { name: "DESARROLLO WEB", href: "/servicios/desarrollo-web" },
                      { name: "DISEÑO GRÁFICO", href: "/servicios/diseno-grafico" },
                      { name: "GRÁFICA INTEGRAL", href: "/servicios/grafica-integral" },
                      { name: "IMPRESIÓN DIGITAL", href: "/servicios/impresion-digital" },
                      { name: "ARMADO DE STANDS", href: "/servicios/stand" },
                      { name: "VÍA PÚBLICA", href: "/servicios/via-publica" },
                      { name: "MINERÍA", href: "/servicios/mineria" },
                    ]
                  },
                  { name: "MINERÍA", href: "/servicios/mineria" },
                  { name: "BLOG", href: "/blog" },
                  { name: "CONTACTO", href: "/contacto" },
                  { name: "CLIENTES", href: "https://www.plotcenterlab.com.ar/cliente/login", external: true },
                  { name: "TÚ PEDIDO", href: "https://www.plotcenterlab.com.ar/consulta-cliente", external: true },
                ].map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      open: { opacity: 1, y: 0, rotate: 0 },
                      closed: { opacity: 0, y: 20, rotate: -5 },
                    }}
                    className="relative flex flex-col items-center"
                  >
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center hover:text-lorenzo-accent transition-colors duration-300 hover:scale-110 transform"
                      onClick={(e) => {
                        if (item.subItems) {
                          e.preventDefault()
                          e.stopPropagation() // Evitar cerrar el menú principal
                          setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                        } else {
                          setMenuOpen(false)
                        }
                      }}
                    >
                      {item.name}
                      {item.subItems && (
                        <svg className={`w-6 h-6 ml-4 transition-transform duration-300 ${openSubmenu === item.name ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </a>
                    
                    {/* Submenú */}
                    <AnimatePresence>
                      {item.subItems && openSubmenu === item.name && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="flex flex-col space-y-4 overflow-hidden"
                          onClick={(e) => e.stopPropagation()} // Prevenir cerrar al hacer click dentro del submenu
                        >
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <a
                                href={subItem.href}
                                className="text-lg sm:text-2xl md:text-3xl text-gray-300 hover:text-lorenzo-accent transition-colors duration-300 inline-block hover:scale-105 transform"
                                onClick={() => setMenuOpen(false)}
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                className="mt-12 flex justify-center gap-6"
              >
                {MENU_SOCIALS.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1, color: "#eb671b" }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white/60 hover:text-lorenzo-accent transition-colors"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
