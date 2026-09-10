"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, Minus, X } from "lucide-react"
import { brand } from "@/lib/brand"

const CHAT_SRC = "https://www.plotcenterlab.com.ar/embed/chat-widget"

const ALLOWED_ORIGINS = [
  "https://www.plotcenterlab.com.ar",
  "https://plotcenterlab.com.ar",
  "https://www.www.plotcenterlab.com.ar",
]

type WidgetResizeMessage = {
  type: "plotai-widget-resize"
  width?: number
  height?: number
  fullscreen?: boolean
}

/**
 * Host visual Plot para el chat embebido.
 * Evita el cuadrado oscuro del iframe crudo: FAB propio + panel con chrome de marca.
 */
export default function PlotChatWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [iframeReady, setIframeReady] = useState(false)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data as WidgetResizeMessage | null
      if (!data || data.type !== "plotai-widget-resize") return
      if (!ALLOWED_ORIGINS.includes(e.origin)) return

      setIframeReady(true)

      if (data.fullscreen) {
        setOpen(true)
        setFullscreen(true)
        return
      }

      setFullscreen(false)

      // Si el widget interno colapsa al bubble, sincronizamos nuestro FAB
      const w = data.width ?? 0
      const h = data.height ?? 0
      if (w <= 120 && h <= 120) {
        setOpen(false)
      } else if (w > 120 || h > 120) {
        setOpen(true)
      }
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  const openChat = useCallback(() => {
    setMounted(true)
    setOpen(true)
    setFullscreen(false)
  }, [])

  const closeChat = useCallback(() => {
    setOpen(false)
    setFullscreen(false)
  }, [])

  const minimizeChat = useCallback(() => {
    setOpen(false)
    setFullscreen(false)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {open && (
          <motion.div
            key="plot-chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={`pointer-events-auto absolute overflow-hidden bg-[#0e0f16] shadow-[0_28px_80px_-20px_rgba(10,10,10,0.65)] ${
              fullscreen
                ? "inset-0 rounded-none"
                : "bottom-[max(12px,env(safe-area-inset-bottom))] right-[max(12px,env(safe-area-inset-right))] w-[min(400px,calc(100vw-24px))] h-[min(680px,calc(100dvh-96px))] rounded-[22px] border border-white/10"
            }`}
          >
            {/* Chrome Plot */}
            <div
              className="relative flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10"
              style={{
                background: `linear-gradient(105deg, ${brand.navy} 0%, ${brand.navy2} 55%, ${brand.orange}33 100%)`,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-plot-ink font-black text-sm"
                  style={{ background: brand.orange }}
                >
                  P
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm tracking-wide truncate">
                    Chat Plot Center
                  </p>
                  <p className="text-white/50 text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Asistente en línea
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={CHAT_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex h-9 items-center rounded-full px-3 text-[11px] font-bold uppercase tracking-wide text-white/55 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Nueva pestaña
                </a>
                {!fullscreen && (
                  <button
                    type="button"
                    onClick={minimizeChat}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Minimizar chat"
                  >
                    <Minus size={18} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeChat}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative h-[calc(100%-57px)] bg-[#0e0f16]">
              {!iframeReady && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white/60">
                  <div
                    className="w-9 h-9 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: `${brand.orange}55`, borderTopColor: brand.orange }}
                  />
                  <p className="text-sm font-medium">Conectando con Plot…</p>
                </div>
              )}
              {mounted && (
                <iframe
                  ref={iframeRef}
                  id="plotai-widget-iframe"
                  src={CHAT_SRC}
                  title="Chat Plot Center"
                  allow="microphone *; autoplay *"
                  onLoad={() => setIframeReady(true)}
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ background: "transparent" }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB de marca — reemplaza el bubble crudo del iframe */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="plot-chat-fab"
            type="button"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={openChat}
            className="pointer-events-auto absolute bottom-[max(16px,env(safe-area-inset-bottom))] right-[max(16px,env(safe-area-inset-right))] group"
            aria-label="Abrir chat Plot Center"
          >
            <span
              aria-hidden
              className="absolute inset-[-6px] rounded-full opacity-40 blur-md group-hover:opacity-60 transition-opacity"
              style={{ background: brand.orange }}
            />
            <span
              className="relative flex h-14 w-14 items-center justify-center rounded-full text-plot-ink shadow-[0_12px_32px_-8px_rgba(243,149,25,0.85)] ring-2 ring-white/25"
              style={{
                background: `linear-gradient(145deg, ${brand.yellow} 0%, ${brand.orange} 48%, ${brand.red} 120%)`,
              }}
            >
              <MessageCircle className="w-6 h-6" strokeWidth={2.4} fill="currentColor" fillOpacity={0.15} />
            </span>
            <span className="sr-only">Abrir chat</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
