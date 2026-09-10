import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import MissionSection from "@/components/mission-section"
import MisionVisionValores3D from "@/components/mision-vision-valores-3d"
import Pilares3D from "@/components/pilares-3d"
import ScrollVideoSection from "@/components/scroll-video-section"
import ProcessSection from "@/components/process-section"
import Footer from "@/components/footer"
import ServicesSection from "@/components/services-section"
import HistorySection from "@/components/history-section"
import Equipo3D from "@/components/equipo-3d"
import ServiciosMineros3D from "@/components/servicios-mineros-3d"
import CreacionStands3D from "@/components/creacion-stands-3d"

import { DemoVariant1 as AnimatedGallery } from "@/components/blocks/animated-gallery-demo"
import CursorWrapper from "@/components/cursor-wrapper"
import Preloader from "@/components/preloader"

export default function Home() {
  return (
    <main className="relative bg-plot-bg">
      <Preloader />
      <Header />
      <CursorWrapper>
        <HeroSection />
        <div className="relative z-10">
          <MissionSection />
          <AnimatedGallery />
        </div>
      <div className="relative z-10">
        <div className="relative w-full h-[72px] sm:h-[100px] md:h-[240px] -my-[36px] sm:-my-[50px] md:-my-[120px] z-20 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, #FFFFFF 45%, #F7F6F3 55%, transparent 100%)' }} />
        </div>
        <ServicesSection />
        <div className="relative w-full h-[72px] sm:h-[100px] md:h-[240px] -my-[36px] sm:-my-[50px] md:-my-[120px] z-20 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, #F7F6F3 40%, #FFFFFF 60%, transparent 100%)' }} />
        </div>
        <ServiciosMineros3D />
        <div className="relative w-full h-[80px] sm:h-[120px] md:h-[200px] -my-[40px] sm:-my-[60px] md:-my-[100px] z-20 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/images/trilha2.svg)', backgroundSize: '150px', backgroundPosition: 'center', backgroundRepeat: 'repeat-x' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 50%, transparent 100%)' }} />
        </div>
        <CreacionStands3D />
        <div className="relative w-full h-[80px] sm:h-[120px] md:h-[200px] -my-[40px] sm:-my-[60px] md:-my-[100px] z-20 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.94) 50%, transparent 100%)' }} />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/images/trilha2.svg)', backgroundSize: '150px', backgroundPosition: 'center', backgroundRepeat: 'repeat-x' }} />
        </div>
        <ScrollVideoSection videoSrc="http://plotcenter.com.ar/wp-content/uploads/2026/02/WEB-FINAL-2.webm" />
        <div className="relative w-full h-[80px] sm:h-[120px] md:h-[200px] -my-[40px] sm:-my-[60px] md:-my-[100px] z-20 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.94) 50%, transparent 100%)' }} />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/images/splash.svg)', backgroundSize: '150px', backgroundPosition: 'center', backgroundRepeat: 'repeat-x' }} />
        </div>
        <ProcessSection />

        <HistorySection />
        <div className="relative w-full h-[80px] sm:h-[120px] md:h-[200px] -my-[40px] sm:-my-[60px] md:-my-[100px] z-20 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/images/trilhadiee.svg)', backgroundSize: '150px', backgroundPosition: 'center', backgroundRepeat: 'repeat-x' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 50%, transparent 100%)' }} />
        </div>
        <Equipo3D />
        <MisionVisionValores3D />
        <Pilares3D />
        <Footer />
      </div>
      </CursorWrapper>
    </main>
  )
}
