import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="relative bg-[#050100] min-h-screen text-lorenzo-text-light">
      <Header />
      <div className="pt-32 pb-24 px-8 md:px-24 max-w-5xl mx-auto relative z-10">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Términos y <span className="font-brier text-lorenzo-accent">Condiciones</span>
            </h1>
            <p className="text-lorenzo-text-light/60 text-lg">
              Última actualización: Mayo 2026
            </p>
          </div>

          <div className="space-y-12 text-lorenzo-text-light/80 font-roboto leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Introducción</h2>
              <p>
                Bienvenido a Plot Center S.R.L. Al acceder y utilizar nuestro sitio web y servicios, usted acepta estar sujeto a los siguientes términos y condiciones. Por favor, léalos cuidadosamente antes de utilizar nuestra plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Servicios Ofrecidos</h2>
              <p>
                Plot Center es una agencia especializada en comunicación visual de alto impacto, stands 3D y soluciones interactivas. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier servicio sin previo aviso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido, diseños, gráficos, logotipos e interfaces presentes en este sitio son propiedad exclusiva de Plot Center S.R.L. o se utilizan con los permisos correspondientes. Está estrictamente prohibida su reproducción sin consentimiento explícito.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Privacidad y Datos</h2>
              <p>
                El uso de su información personal se rige por nuestra Política de Privacidad. Al utilizar nuestros servicios, usted consiente la recopilación y uso de datos según lo estipulado en dicha política.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">5. Limitación de Responsabilidad</h2>
              <p>
                Plot Center no será responsable por daños indirectos, incidentales o consecuentes que surjan del uso o la incapacidad de usar nuestros servicios o el contenido del sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">6. Contacto</h2>
              <p>
                Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos a través de nuestro formulario de contacto o enviando un correo electrónico a info@plotcenter.com.ar.
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
