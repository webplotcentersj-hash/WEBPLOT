"use client"

import { motion } from "framer-motion"

const LINE_A = [
  { text: "COMUNICACIÓN VISUAL", color: "#FCDC32" },
  { text: "COMUNICACIÓN VISUAL", color: "#E84B93" },
  { text: "COMUNICACIÓN VISUAL", color: "#2BBAE2" },
  { text: "COMUNICACIÓN VISUAL", color: "#F39519" },
]

const LINE_B = [
  { text: "DE ALTO IMPACTO", color: "#FFFFFF" },
  { text: "DE ALTO IMPACTO", color: "#FCDC32" },
  { text: "DE ALTO IMPACTO", color: "#ED737B" },
  { text: "DE ALTO IMPACTO", color: "#2BBAE2" },
]

export default function SignatureMarqueeSection() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center z-0 overflow-hidden">
      <div className="w-full flex flex-col gap-3 md:gap-6 py-10 select-none pointer-events-none">
        {/* Barras sólidas = contraste garantizado */}
        <div className="w-full overflow-hidden flex bg-[#1A1E38] py-3 md:py-4 shadow-lg">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 22,
                ease: "linear",
              },
            }}
          >
            {[...LINE_A, ...LINE_A].map((item, i) => (
              <h2
                key={i}
                className="font-display uppercase text-[clamp(1.75rem,8vw,7vw)] leading-[0.9] tracking-[0.02em] px-3 sm:px-4"
                style={{ color: item.color }}
              >
                {item.text}
              </h2>
            ))}
          </motion.div>
        </div>

        <div className="w-full overflow-hidden flex bg-[#E52F2A] py-3 md:py-4 shadow-lg">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 26,
                ease: "linear",
              },
            }}
          >
            {[...LINE_B, ...LINE_B].map((item, i) => (
              <h2
                key={i}
                className="font-display uppercase text-[clamp(1.75rem,8vw,7vw)] leading-[0.9] tracking-[0.02em] px-3 sm:px-4"
                style={{ color: item.color }}
              >
                {item.text}
              </h2>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
