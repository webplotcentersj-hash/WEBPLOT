"use client"

import MineriaSubpage from "@/components/servicios/mineria-subpage"
import { brand } from "@/lib/brand"

export default function PapeleriaCorporativaPage() {
  return (
    <MineriaSubpage
      eyebrow="Servicios mineros · Imprenta"
      title="Tarjetas y"
      titleAccent="papelería corporativa"
      intro="La papelería corporativa y las tarjetas de presentación son elementos esenciales en la construcción de una identidad visual sólida y profesional. Funcionan como herramientas estratégicas de comunicación que refuerzan la imagen de marca, generan recordación y establecen coherencia en todos los puntos de contacto con clientes y socios. Abordamos cada pieza cuidando diseño, materiales e impresión para transmitir la seriedad, el estilo y los valores de tu empresa."
      bulletsTitle="¿Qué piezas de papelería corporativa realizamos?"
      bullets={[
        "Tarjetas personales",
        "Sobres corporativos",
        "Carpetas institucionales",
        "Hojas membretadas",
        "Credenciales",
        "Calendarios personalizados",
        "Invitaciones corporativas",
      ]}
      heroImage="https://plotcenter.com.ar/wp-content/uploads/2025/07/Nuestra-promesa_-seguridad-eficiencia-y-respuesta-rapida-7.png"
      galleryImage="https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-65.png"
      accent={brand.pink}
    />
  )
}
