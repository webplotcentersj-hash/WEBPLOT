"use client"

import React, { useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
}

export default function MagneticButton({ children, className, href, target, rel, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Físicas del resorte para un movimiento orgánico
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calcula la distancia desde el centro
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Factor de fuerza magnética (ajustable)
    x.set(distanceX * 0.3)
    y.set(distanceY * 0.3)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const Content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block relative p-4" // Padding extra para que el "campo magnético" sea más grande que el botón
    >
      <motion.div
        style={{ x, y }}
        className="inline-block"
      >
        {href ? (
          <a href={href} target={target} rel={rel} className={className}>
            {children}
          </a>
        ) : (
          <button className={className} {...props}>
            {children}
          </button>
        )}
      </motion.div>
    </motion.div>
  )

  return Content
}
