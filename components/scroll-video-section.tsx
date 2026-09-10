"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ScrollVideoSectionProps {
  videoSrc: string;
}

export default function ScrollVideoSection({ videoSrc }: ScrollVideoSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100svh] w-full bg-black overflow-hidden flex items-center justify-center cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        // Soporte para móviles (toque para reproducir/pausar)
        if (isPlaying) {
          handleMouseLeave()
        } else {
          handleMouseEnter()
        }
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        preload="metadata"
      />
      {/* Capa de oscurecimiento y botón visual sutil */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-40'}`} />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1.5 sm:ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}
