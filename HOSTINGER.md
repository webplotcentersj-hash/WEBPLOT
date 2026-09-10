# Subir Plot Center a Hostinger

## Archivo listo
`Desktop/Plot Reload/plot-center-hostinger.zip`

## Pasos (importante)
1. hPanel → **Archivos** → `public_html`
2. **Borrar** el contenido viejo de `public_html` (WordPress/HTML anterior)
3. Subir `plot-center-hostinger.zip`
4. Clic derecho → **Extraer**
5. Verificar que dentro de `public_html` estén:
   - `index.html`
   - `.htaccess`
   - carpeta `next`
   - carpeta `servicios`
   - carpeta `images`

`index.html` debe quedar **directo** en `public_html`, no dentro de otra carpeta.

## Qué se corrigió vs el ZIP anterior
- Hostinger bloquea carpetas `_next` → ahora se llama `next`
- Se agregó `.htaccess` para Apache/LiteSpeed
- Se limpió basura de desarrollo
- ZIP regenerado con rutas verificadas

## Regenerar
```bash
npm run hostinger
```
