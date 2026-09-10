"use client"

import MineriaSubpage from "@/components/servicios/mineria-subpage"
import { brand } from "@/lib/brand"

export default function TalonariosPage() {
  return (
    <MineriaSubpage
      eyebrow="Servicios mineros · Imprenta"
      title="Talonarios de"
      titleAccent="calidad y procesos"
      intro="Ofrecemos talonarios diseñados para acompañar los procesos de control, registro y seguimiento dentro de su empresa. Son soluciones impresas que permiten documentar de manera ordenada y práctica tareas vinculadas a la calidad, producción, mantenimiento y otros circuitos operativos. Se adaptan a distintos formatos: registros de inspección, formularios internos o partes de servicio, con materiales resistentes, encuadernación segura y opciones de numeración, duplicado o triplicado."
      bulletsTitle="Beneficios operativos"
      bullets={[
        "Mantienen la trazabilidad de los procesos",
        "Facilitan auditorías internas",
        "Refuerzan el cumplimiento de protocolos establecidos",
        "Soportan la mejora continua de las operaciones con un soporte gráfico funcional y profesional",
      ]}
      heroImage="https://plotcenter.com.ar/wp-content/uploads/2025/07/Nuestra-promesa_-seguridad-eficiencia-y-respuesta-rapida-6.png"
      galleryImage="https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-55-1.png"
      accent={brand.purple}
    />
  )
}
