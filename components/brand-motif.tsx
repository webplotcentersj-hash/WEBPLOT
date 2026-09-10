"use client"

import { useEffect, useId, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { brand } from "@/lib/brand"

gsap.registerPlugin(ScrollTrigger)

type Variant = "mosaic" | "frame-white" | "frame-dark" | "sunburst" | "arcs-field"

type Props = {
  variant?: Variant
  className?: string
  intensity?: number
  veil?: number
}

/** Scroll-scrubbed motion per variant — direction tracks scroll progress */
function scrollMotionFor(variant: Variant) {
  switch (variant) {
    case "sunburst":
      // Gira con el scroll (sentido de avance)
      return {
        from: { rotate: -14, scale: 1.1, xPercent: 0, yPercent: 4 },
        to: { rotate: 14, scale: 1.18, xPercent: 0, yPercent: -4 },
      }
    case "arcs-field":
      // Diagonal opuesta al scroll (parallax cruzado)
      return {
        from: { rotate: 3, scale: 1.06, xPercent: -7, yPercent: 8 },
        to: { rotate: -3, scale: 1.1, xPercent: 7, yPercent: -8 },
      }
    case "frame-dark":
    case "frame-white":
      // Paneo horizontal + leve subida
      return {
        from: { rotate: 0, scale: 1.08, xPercent: 6, yPercent: 5 },
        to: { rotate: 0, scale: 1.12, xPercent: -6, yPercent: -5 },
      }
    case "mosaic":
    default:
      // Parallax vertical (fondo sube más lento / en contra)
      return {
        from: { rotate: -2, scale: 1.05, xPercent: -2, yPercent: 10 },
        to: { rotate: 2, scale: 1.1, xPercent: 2, yPercent: -10 },
      }
  }
}

/** Brand spectrum — dense, saturated */
export const GEO_COLORS = [
  brand.yellow,
  brand.orange,
  brand.red,
  brand.redDark,
  brand.coral,
  brand.pink,
  brand.plum,
  brand.purple,
  brand.navy,
  brand.navy2,
  brand.blueDeep,
  brand.teal,
  brand.blue,
  brand.blueMid,
  brand.cyanDeep,
  brand.cyan,
  brand.sky,
  brand.grey,
  "#FF6B35",
  "#FFD166",
  "#06D6A0",
  "#118AB2",
  "#EF476F",
  "#7B2CBF",
  "#FF9F1C",
  "#2EC4B6",
  "#E71D36",
  "#011627",
] as const

function c(seed: number, i = 0) {
  return GEO_COLORS[(seed + i + GEO_COLORS.length * 8) % GEO_COLORS.length]
}

/** Quarter rainbow arcs from a corner */
function Arcs({
  x,
  y,
  size,
  seed,
  corner,
}: {
  x: number
  y: number
  size: number
  seed: number
  corner: "bl" | "br" | "tl" | "tr"
}) {
  const n = 7
  const stroke = size * 0.07
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const r = size * 0.95 - i * (size * 0.11)
        let d = ""
        if (corner === "bl") d = `M ${x} ${y + size} A ${r} ${r} 0 0 1 ${x + r} ${y + size - 0.001}`
        if (corner === "br") d = `M ${x + size} ${y + size} A ${r} ${r} 0 0 0 ${x + size - r} ${y + size - 0.001}`
        if (corner === "tl") d = `M ${x} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y + 0.001}`
        if (corner === "tr") d = `M ${x + size} ${y} A ${r} ${r} 0 0 1 ${x + size - r} ${y + 0.001}`
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={c(seed, i)}
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        )
      })}
    </g>
  )
}

/** Sunburst / fan rays from a corner */
function Rays({
  x,
  y,
  size,
  seed,
  corner,
}: {
  x: number
  y: number
  size: number
  seed: number
  corner: "bl" | "br" | "tl" | "tr"
}) {
  const count = 11
  const ox = corner.includes("l") ? x : x + size
  const oy = corner.includes("b") ? y + size : y
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const t = i / (count - 1)
        let x2 = x
        let y2 = y
        if (corner === "bl") {
          x2 = x + Math.cos(t * Math.PI * 0.5) * size
          y2 = y + size - Math.sin(t * Math.PI * 0.5) * size
        } else if (corner === "br") {
          x2 = x + size - Math.cos(t * Math.PI * 0.5) * size
          y2 = y + size - Math.sin(t * Math.PI * 0.5) * size
        } else if (corner === "tl") {
          x2 = x + Math.cos(t * Math.PI * 0.5) * size
          y2 = y + Math.sin(t * Math.PI * 0.5) * size
        } else {
          x2 = x + size - Math.cos(t * Math.PI * 0.5) * size
          y2 = y + Math.sin(t * Math.PI * 0.5) * size
        }
        return (
          <line
            key={i}
            x1={ox}
            y1={oy}
            x2={x2}
            y2={y2}
            stroke={c(seed, i)}
            strokeWidth={size * 0.055}
            strokeLinecap="round"
          />
        )
      })}
    </g>
  )
}

/** Vertical or horizontal stripes */
function Stripes({
  x,
  y,
  size,
  seed,
  vertical = true,
}: {
  x: number
  y: number
  size: number
  seed: number
  vertical?: boolean
}) {
  const n = 8
  return (
    <g>
      {Array.from({ length: n }).map((_, i) =>
        vertical ? (
          <rect
            key={i}
            x={x + (i * size) / n}
            y={y}
            width={size / n + 0.5}
            height={size}
            fill={c(seed, i)}
          />
        ) : (
          <rect
            key={i}
            x={x}
            y={y + (i * size) / n}
            width={size}
            height={size / n + 0.5}
            fill={c(seed, i + 3)}
          />
        )
      )}
    </g>
  )
}

/** Nested U / arch shapes */
function UShapes({
  x,
  y,
  size,
  seed,
}: {
  x: number
  y: number
  size: number
  seed: number
}) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const inset = size * 0.1 + i * size * 0.08
        const r = size * 0.28 - i * size * 0.045
        return (
          <path
            key={i}
            d={`M ${x + inset} ${y + size * 0.18} V ${y + size * 0.55} A ${r} ${r} 0 0 0 ${x + size - inset} ${y + size * 0.55} V ${y + size * 0.18}`}
            fill="none"
            stroke={c(seed, i + 2)}
            strokeWidth={size * 0.065}
            strokeLinecap="round"
          />
        )
      })}
    </g>
  )
}

/** Concentric circles */
function Rings({
  x,
  y,
  size,
  seed,
}: {
  x: number
  y: number
  size: number
  seed: number
}) {
  const cx = x + size / 2
  const cy = y + size / 2
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill={c(seed, 10)} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={size * 0.44 - i * size * 0.065}
          fill="none"
          stroke={c(seed, i)}
          strokeWidth={size * 0.055}
        />
      ))}
    </g>
  )
}

/** Solid color blocks with a circle accent */
function Blocks({
  x,
  y,
  size,
  seed,
}: {
  x: number
  y: number
  size: number
  seed: number
}) {
  const h = size / 2
  return (
    <g>
      <rect x={x} y={y} width={h} height={h} fill={c(seed, 0)} />
      <rect x={x + h} y={y} width={h} height={h} fill={c(seed, 4)} />
      <rect x={x} y={y + h} width={h} height={h} fill={c(seed, 8)} />
      <rect x={x + h} y={y + h} width={h} height={h} fill={c(seed, 12)} />
      <circle cx={x + size / 2} cy={y + size / 2} r={size * 0.2} fill={c(seed, 2)} />
    </g>
  )
}

/** Half-circle stack (rainbow bowl) */
function Bowls({
  x,
  y,
  size,
  seed,
  flip = false,
}: {
  x: number
  y: number
  size: number
  seed: number
  flip?: boolean
}) {
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill={c(seed, 14)} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const r = size * 0.48 - i * size * 0.07
        const cy = flip ? y + size * 0.15 : y + size * 0.85
        return (
          <path
            key={i}
            d={
              flip
                ? `M ${x + size / 2 - r} ${cy} A ${r} ${r} 0 0 1 ${x + size / 2 + r} ${cy}`
                : `M ${x + size / 2 - r} ${cy} A ${r} ${r} 0 0 0 ${x + size / 2 + r} ${cy}`
            }
            fill="none"
            stroke={c(seed, i)}
            strokeWidth={size * 0.06}
          />
        )
      })}
    </g>
  )
}

type TileKind =
  | "arcs-bl"
  | "arcs-br"
  | "arcs-tl"
  | "arcs-tr"
  | "rays-bl"
  | "rays-br"
  | "rays-tl"
  | "rays-tr"
  | "stripes-v"
  | "stripes-h"
  | "u"
  | "rings"
  | "blocks"
  | "bowl"
  | "bowl-flip"

const TILE_SEQ: TileKind[] = [
  "arcs-bl",
  "rays-tr",
  "stripes-v",
  "u",
  "rings",
  "arcs-br",
  "bowl",
  "rays-bl",
  "blocks",
  "stripes-h",
  "arcs-tl",
  "rays-br",
  "bowl-flip",
  "u",
  "arcs-tr",
  "rays-tl",
  "stripes-v",
  "rings",
  "arcs-bl",
  "blocks",
  "bowl",
  "rays-tr",
  "stripes-h",
  "arcs-br",
]

function Tile({
  x,
  y,
  size,
  kind,
  seed,
}: {
  x: number
  y: number
  size: number
  kind: TileKind
  seed: number
}) {
  switch (kind) {
    case "arcs-bl":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 16)} />
          <Arcs x={x} y={y} size={size} seed={seed} corner="bl" />
        </g>
      )
    case "arcs-br":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 11)} />
          <Arcs x={x} y={y} size={size} seed={seed + 2} corner="br" />
        </g>
      )
    case "arcs-tl":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 7)} />
          <Arcs x={x} y={y} size={size} seed={seed + 4} corner="tl" />
        </g>
      )
    case "arcs-tr":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 3)} />
          <Arcs x={x} y={y} size={size} seed={seed + 1} corner="tr" />
        </g>
      )
    case "rays-bl":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 9)} />
          <Rays x={x} y={y} size={size} seed={seed} corner="bl" />
        </g>
      )
    case "rays-br":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 5)} />
          <Rays x={x} y={y} size={size} seed={seed + 3} corner="br" />
        </g>
      )
    case "rays-tl":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 13)} />
          <Rays x={x} y={y} size={size} seed={seed + 5} corner="tl" />
        </g>
      )
    case "rays-tr":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 1)} />
          <Rays x={x} y={y} size={size} seed={seed + 6} corner="tr" />
        </g>
      )
    case "stripes-v":
      return <Stripes x={x} y={y} size={size} seed={seed} vertical />
    case "stripes-h":
      return <Stripes x={x} y={y} size={size} seed={seed + 4} vertical={false} />
    case "u":
      return (
        <g>
          <rect x={x} y={y} width={size} height={size} fill={c(seed, 15)} />
          <UShapes x={x} y={y} size={size} seed={seed} />
        </g>
      )
    case "rings":
      return <Rings x={x} y={y} size={size} seed={seed} />
    case "blocks":
      return <Blocks x={x} y={y} size={size} seed={seed} />
    case "bowl":
      return <Bowls x={x} y={y} size={size} seed={seed} />
    case "bowl-flip":
      return <Bowls x={x} y={y} size={size} seed={seed + 2} flip />
  }
}

/** Dense modular mosaic — inspired by brand geometric artwork */
function MosaicSVG({ id = "mosaic" }: { id?: string }) {
  const cols = 6
  const rows = 4
  const size = 160
  const w = cols * size
  const h = rows * size

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect width={w} height={h} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        {Array.from({ length: cols * rows }).map((_, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)
          const kind = TILE_SEQ[i % TILE_SEQ.length]
          const motion = i % 6
          return (
            <g
              key={i}
              className={`brand-tile brand-tile-${motion}`}
              style={{
                // Stagger so tiles don't pulse in lockstep
                animationDelay: `${(i % 9) * -0.85}s`,
              }}
            >
              <Tile
                x={col * size}
                y={row * size}
                size={size}
                kind={kind}
                seed={i * 5 + col * 2}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/** Prefer the section (or tall ancestor) so sticky wrappers still scrub with content */
function resolveScrollTriggerEl(root: HTMLElement) {
  const section = root.closest("section")
  if (section instanceof HTMLElement) return section

  let el: HTMLElement | null = root.parentElement
  while (el && el !== document.body) {
    if (el.offsetHeight > window.innerHeight * 1.15) return el
    el = el.parentElement
  }
  return root.parentElement ?? root
}

/**
 * Animated geometric brand background (SVG recreation, not the photo).
 * Layer motion is scrubbed to section scroll (GSAP); tiles keep light CSS life.
 */
export function BrandBackground({
  variant = "mosaic",
  className = "",
  intensity = 1,
  veil = 0.12,
}: Props) {
  const uid = useId().replace(/:/g, "")
  const rootRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const layer = layerRef.current
    const root = rootRef.current
    if (reduce || !layer || !root) return

    const trigger = resolveScrollTriggerEl(root)
    const { from, to } = scrollMotionFor(variant)

    gsap.set(layer, from)

    const tween = gsap.to(layer, {
      ...to,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
    })

    ScrollTrigger.refresh()

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [variant])

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <div
        ref={layerRef}
        className="absolute inset-[-18%] w-[136%] h-[136%] will-change-transform"
        style={{ opacity: intensity }}
      >
        <MosaicSVG id={uid} />
      </div>
      {/* Light wash only — color stays dominant; white panels handle readable copy */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,255,255,${Math.min(veil + 0.1, 0.28)}) 0%, rgba(255,255,255,${veil * 0.35}) 50%, transparent 78%),
            linear-gradient(to bottom, rgba(255,255,255,${veil * 0.5}) 0%, transparent 14%, transparent 86%, rgba(255,255,255,${veil * 0.55}) 100%)
          `,
        }}
      />
    </div>
  )
}

/** High-contrast text surface for titles/copy over busy backgrounds */
export function BrandTextPanel({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-white/97 backdrop-blur-md text-plot-ink shadow-[0_12px_40px_-12px_rgba(26,30,56,0.28)] border border-brand-navy/12 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 md:px-8 md:py-6 max-w-full break-words ${className}`}
    >
      {children}
    </div>
  )
}

export function BrandMotif({
  className = "",
  variant = "corner-arcs",
}: {
  className?: string
  variant?: "corner-arcs" | "rays" | "pill-arcs"
}) {
  if (variant === "rays") {
    return (
      <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
        {GEO_COLORS.slice(0, 12).map((color, i) => {
          const a = (i / 12) * Math.PI * 0.5
          return (
            <line
              key={`${color}-${i}`}
              x1="0"
              y1="200"
              x2={200 * Math.cos(a)}
              y2={200 - 200 * Math.sin(a)}
              stroke={color}
              strokeWidth="10"
            />
          )
        })}
      </svg>
    )
  }

  if (variant === "pill-arcs") {
    return (
      <svg className={className} viewBox="0 0 320 160" fill="none" aria-hidden>
        {GEO_COLORS.slice(0, 10).map((color, i) => (
          <path
            key={`${color}-${i}`}
            d={`M 20 ${140 - i * 12} A ${120 - i * 9} ${120 - i * 9} 0 0 1 ${300 - i * 3} ${140 - i * 12}`}
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
          />
        ))}
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" aria-hidden>
      {GEO_COLORS.slice(0, 10).map((color, i) => {
        const r = 220 - i * 18
        return (
          <path
            key={`${color}-${i}`}
            d={`M 0 ${240 - (220 - r)} A ${r} ${r} 0 0 1 ${r} 240`}
            stroke={color}
            strokeWidth="14"
          />
        )
      })}
    </svg>
  )
}

export function BrandStripeBar({ className = "" }: { className?: string }) {
  return (
    <div className={`h-2.5 w-full flex ${className}`} aria-hidden>
      {GEO_COLORS.map((color, i) => (
        <span key={`${color}-${i}`} className="flex-1 h-full" style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}

void brand
