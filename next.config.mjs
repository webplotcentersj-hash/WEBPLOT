/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Export estático para Hostinger (subir contenido de /out a public_html)
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
