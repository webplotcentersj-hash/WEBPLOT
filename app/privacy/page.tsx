import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="relative bg-[#050100] min-h-screen text-lorenzo-text-light">
      <Header />
      <div className="pt-32 pb-24 px-8 md:px-24 max-w-5xl mx-auto relative z-10">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Políticas de <span className="font-brier text-lorenzo-accent">Privacidad</span>
            </h1>
            <p className="text-lorenzo-text-light/60 text-lg">
              Última actualización: Mayo 2026
            </p>
          </div>

          <div className="space-y-12 text-lorenzo-text-light/80 font-roboto leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Información que Recopilamos</h2>
              <p>
                En Plot Center S.R.L. recopilamos información personal que usted nos proporciona directamente al completar formularios de contacto, suscribirse a nuestro boletín o interactuar con nuestros servicios. Esta información puede incluir su nombre, dirección de correo electrónico, número de teléfono y detalles de la empresa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Uso de la Información</h2>
              <p>
                Utilizamos la información recopilada para proporcionarle nuestros servicios, comunicarnos con usted, procesar transacciones, mejorar nuestro sitio web y enviarle material promocional (siempre que haya optado por recibirlo). No vendemos, alquilamos ni compartimos su información personal con terceros para sus propios fines de marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">3. Protección de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Cookies y Tecnologías de Seguimiento</h2>
              <p>
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para que rechace las cookies, pero esto podría limitar la funcionalidad de ciertas partes de nuestro sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">5. Sus Derechos</h2>
              <p>
                Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal en cualquier momento. También puede retirar su consentimiento para el procesamiento de datos o darse de baja de nuestras comunicaciones de marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">6. Cambios a esta Política</h2>
              <p>
                Podemos actualizar nuestra Política de Privacidad periódicamente. Le notificaremos cualquier cambio significativo publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">7. Contacto</h2>
              <p>
                Si tiene preguntas o inquietudes sobre nuestra Política de Privacidad o el tratamiento de sus datos, contáctenos a info@plotcenter.com.ar.
              </p>
            </section>
          </div>
        </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
