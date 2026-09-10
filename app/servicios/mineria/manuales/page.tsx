"use client"

import MineriaSubpage from "@/components/servicios/mineria-subpage"
import { brand } from "@/lib/brand"

export default function ManualesPage() {
  return (
    <MineriaSubpage
      eyebrow="Servicios mineros · Imprenta"
      title="Manuales de"
      titleAccent="operación y seguridad"
      intro="Los manuales de operación y seguridad son documentos esenciales en toda empresa. Su propósito principal es estandarizar procesos, optimizar la eficiencia operativa y proteger la integridad de los trabajadores, los activos y el entorno laboral. Definen procedimientos claros, normas de seguridad, protocolos de emergencia y responsabilidades del personal, fomentando una cultura organizacional más sólida, segura y profesional."
      bulletsTitle="¿Para qué sirven estos manuales?"
      bullets={[
        "Establecen procesos claros",
        "Previenen accidentes y riesgos laborales",
        "Cumplen con las normativas legales",
        "Mejoran la productividad",
      ]}
      heroImage="https://plotcenter.com.ar/wp-content/uploads/2025/05/Nuestra-promesa_-seguridad-eficiencia-y-respuesta-rapida-3.png"
      galleryImage="https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-48-1.png"
      accent={brand.orange}
    />
  )
}
