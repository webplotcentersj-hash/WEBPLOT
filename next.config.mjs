/** @type {import('next').NextConfig} */
const isHostinger = process.env.HOSTINGER === "1"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Vercel: imágenes optimizadas. Hostinger (export estático): sin optimización.
  images: {
    unoptimized: isHostinger,
  },
  // Solo export estático cuando se prepara Hostinger (`npm run hostinger`)
  ...(isHostinger
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
