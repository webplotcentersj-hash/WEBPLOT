/**
 * Prepara el export estático para Hostinger:
 * - renombra `_next` → `next` (Hostinger suele bloquear carpetas con _)
 * - reescribe referencias en HTML/JS/CSS/JSON/TXT
 * - agrega .htaccess Apache/LiteSpeed
 * - limpia basura de desarrollo
 * - genera ZIP listo para public_html
 */
import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const outDir = path.join(root, "out")
const distDir = path.join(root, "hostinger-dist")
const zipPath = path.join(root, "..", "plot-center-hostinger.zip")

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true })
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

function walkFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkFiles(full, files)
    else files.push(full)
  }
  return files
}

console.log("1) Building static export...")
execSync("npm run build", { cwd: root, stdio: "inherit" })

if (!fs.existsSync(outDir)) {
  console.error("No existe /out. Abortando.")
  process.exit(1)
}

console.log("2) Preparing hostinger-dist...")
rmrf(distDir)
copyDir(outDir, distDir)

const nextSrc = path.join(distDir, "_next")
const nextDest = path.join(distDir, "next")
if (fs.existsSync(nextSrc)) {
  if (fs.existsSync(nextDest)) rmrf(nextDest)
  fs.renameSync(nextSrc, nextDest)
  console.log("   Renamed _next → next")
}

const TEXT_EXT = new Set([
  ".html",
  ".js",
  ".css",
  ".json",
  ".txt",
  ".xml",
  ".svg",
  ".map",
])

let rewritten = 0
for (const file of walkFiles(distDir)) {
  const ext = path.extname(file).toLowerCase()
  if (!TEXT_EXT.has(ext)) continue
  const raw = fs.readFileSync(file, "utf8")
  if (!raw.includes("/_next/") && !raw.includes("\"/_next") && !raw.includes("'_next")) {
    continue
  }
  const next = raw
    .replaceAll("/_next/", "/next/")
    .replaceAll('"_next/', '"next/')
    .replaceAll("'_next/", "'next/")
  if (next !== raw) {
    fs.writeFileSync(file, next, "utf8")
    rewritten++
  }
}
console.log(`   Rewrote ${rewritten} files with /next/ paths`)

// Limpieza de archivos que no aportan en hosting
const junk = [
  "owAtT6fDUJy",
  "owAtT6fDUJy.zip",
  "components-archive",
  "LEEME-HOSTINGER.txt",
  "__next._full.txt",
  "__next._index.txt",
  "__next._tree.txt",
  "__next.__PAGE__.txt",
  "index.txt",
]
for (const j of junk) {
  rmrf(path.join(distDir, j))
}

const htaccess = `# Plot Center — Hostinger / Apache / LiteSpeed
Options -Indexes -MultiViews
DirectoryIndex index.html

<IfModule mod_mime.c>
  AddType text/css .css
  AddType application/javascript .js
  AddType font/woff2 .woff2
  AddType image/svg+xml .svg
  AddType video/mp4 .mp4
  AddType video/webm .webm
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(js|css|woff2|png|jpg|jpeg|webp|svg|ico|mp4|webm)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
  <FilesMatch "\\.(html)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # HTTPS (descomentar si el dominio ya tiene SSL)
  # RewriteCond %{HTTPS} off
  # RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Si piden un directorio sin barra final y existe, agregar /
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^(.+[^/])$ $1/ [R=301,L]

  # Archivos y carpetas reales: servirlos
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Fallback 404
  RewriteRule ^ 404.html [L]
</IfModule>
`

fs.writeFileSync(path.join(distDir, ".htaccess"), htaccess, "utf8")

const readme = `PLOT CENTER — SUBIDA A HOSTINGER
================================

1) Entrar a hPanel → Archivos → Administrador de archivos
2) Abrir public_html
3) BORRAR el contenido viejo de public_html (si hay WordPress/HTML anterior)
4) Subir plot-center-hostinger.zip
5) Clic derecho → Extraer
6) Verificar que veas estos archivos DENTRO de public_html:
   - index.html
   - .htaccess
   - next/   (carpeta de JS/CSS)
   - images/
   - servicios/

IMPORTANTE:
- index.html debe quedar directo en public_html (NO dentro de otra carpeta)
- Si el sitio queda en blanco, revisar que exista la carpeta "next"
- El chat embebido solo funciona bien en dominios plotcenter.com.ar

Soporte: regenerar con  npm run hostinger
`

fs.writeFileSync(path.join(distDir, "LEEME.txt"), readme, "utf8")

console.log("3) Creating ZIP...")
rmrf(zipPath)

// Usar tar.exe de Windows (zip más compatible que Compress-Archive)
try {
  execSync(`tar -a -cf "${zipPath}" -C "${distDir}" .`, { stdio: "inherit" })
} catch {
  // Fallback PowerShell
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: "inherit" }
  )
}

const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(1)
console.log(`\nOK → ${zipPath}`)
console.log(`Size: ${sizeMb} MB`)
console.log("Subí ese ZIP a public_html y extráelo ahí.")
