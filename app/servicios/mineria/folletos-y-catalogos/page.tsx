"use client"

import MineriaSubpage from "@/components/servicios/mineria-subpage"
import { brand } from "@/lib/brand"

export default function FolletosCatalogosPage() {
  return (
    <MineriaSubpage
      eyebrow="Servicios mineros · Imprenta"
      title="Folletos y"
      titleAccent="catálogos"
      intro="Los folletos y catálogos son herramientas clave en la comunicación comercial de una empresa. Su función es informar, promocionar y posicionar productos, servicios o la identidad de marca de forma visualmente atractiva y fácil de comprender. Bien diseñados, pueden marcar la diferencia en una presentación, una feria, un punto de venta o una campaña promocional."
      bulletsTitle="¿Para qué sirven los folletos y catálogos?"
      bullets={[
        "Promueven productos y servicios: muestran tu oferta con imágenes, descripciones, precios y beneficios",
        "Atraen y fidelizan clientes: un diseño y contenido bien jerarquizado captan la atención y generan interés",
        "Facilitan la toma de decisiones: presentan la información de manera clara y organizada",
      ]}
      heroImage="https://plotcenter.com.ar/wp-content/uploads/2025/07/Nuestra-promesa_-seguridad-eficiencia-y-respuesta-rapida-4.png"
      galleryImage="https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-36.png"
      accent={brand.cyan}
    />
  )
}
