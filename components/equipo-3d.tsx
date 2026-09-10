"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2, PenTool, Headphones, Smartphone, Wrench, 
  Ruler, HardHat, Printer, UserPlus, Calculator, Sparkles, Users
} from "lucide-react";
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif";

// --- DATOS DEL EQUIPO ---
const employeeData = [
  { name:'Ale Chávez', role:'Desarrollo Web', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/ALE-scaled.png' },
  { name:'Vanesa', role:'Diseño Gráfico', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/VANESA-scaled.png' },
  { name:'Fran', role:'Diseño Gráfico', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/FRAN-scaled.png' },
  { name:'Facu', role:'Atención al cliente', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/FACU-scaled.png' },
  { name:'Fede', role:'Atención al cliente', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/FEDE-scaled.png' },
  { name:'Alexis', role:'Atención al cliente', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/ALEXIS-scaled.png' },
  { name:'Juan', role:'Atención al cliente', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/JUAN-scaled.png' },
  { name:'Danielo', role:'Metalúrgica', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/DANIELO-scaled.png' },
  { name:'Enzo', role:'Metalúrgica', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/ENZO-scaled.png' },
  { name:'Joaco', role:'Metalúrgica', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/JOACO-scaled.png' },
  { name:'Panita', role:'Metalúrgica', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/PANITA-scaled.png' },
  { name:'Ivan', role:'Oficina Técnica', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/IVAN-scaled.png' },
  { name:'Leo', role:'Taller de Imprenta', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/LEO-scaled.png' },
  { name:'Nacho', role:'Taller de Imprenta', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/NACHO-scaled.png' },
  { name:'Martin Imprenta', role:'Imprenta', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/MARTIN-IMPRENTA-scaled.png' },
  { name:'Claudia', role:'Maestranza', imageUrl:'https://plotcenter.com.ar/wp-content/uploads/2026/04/CLAUDIA-scaled.png' }
];

// --- MAPA DE ICONOS POR ROL ---
const getRoleIcon = (role: string) => {
  switch (role) {
    case 'Desarrollo Web': return <Code2 size={20} />;
    case 'Diseño Gráfico': return <PenTool size={20} />;
    case 'Atención al cliente': return <Headphones size={20} />;
    case 'CM': return <Smartphone size={20} />;
    case 'Metalúrgica': return <Wrench size={20} />;
    case 'Oficina Técnica': return <Ruler size={20} />;
    case 'Instalaciones': return <HardHat size={20} />;
    case 'Taller de Imprenta': 
    case 'Imprenta': return <Printer size={20} />;
    case 'Recursos Humanos': return <UserPlus size={20} />;
    case 'Administración': 
    case 'Cobranzas': return <Calculator size={20} />;
    case 'Maestranza': return <Sparkles size={20} />;
    default: return <Users size={20} />;
  }
};

// --- COMPONENTE DE TARJETA 3D ---
const TeamCard = React.forwardRef<HTMLDivElement, { emp: any }>(({ emp }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={{ duration: 0.3 }}
      className="shrink-0 snap-start w-[200px] sm:w-[240px] md:w-[280px] h-[300px] sm:h-[360px] md:h-[400px]"
      style={{ 
        perspective: 1200,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-3xl overflow-hidden group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] border border-white/5 bg-[#1a1412] cursor-pointer"
      >
        <img 
          src={emp.imageUrl} 
          alt={emp.name} 
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=ea580c&color=fff&size=512`; }}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:saturate-150"
        />
        
        {/* Info Overlay removido para que no se superponga con el texto de la imagen */}

        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, transparent 60%)",
            x: useTransform(mouseXSpring, [-0.5, 0.5], [150, -150]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [150, -150]),
            opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.8]),
          }}
        />
      </motion.div>
    </motion.div>
  );
});

TeamCard.displayName = "TeamCard";

// --- COMPONENTE PRINCIPAL ---
export default function Equipo3D() {
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("Todos");

  // Estado para el drag-to-scroll de las áreas
  const [isDragging, setIsDragging] = useState(false);
  const hasDragged = useRef(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Estado para el drag-to-scroll de las tarjetas
  const [isDraggingCards, setIsDraggingCards] = useState(false);
  const [startCardsX, setStartCardsX] = useState(0);
  const [scrollCardsLeft, setScrollCardsLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    hasDragged.current = false;
    setStartX(e.pageX - (filterScrollRef.current?.offsetLeft || 0));
    setScrollLeft(filterScrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeaveDrag = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMoveDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (filterScrollRef.current?.offsetLeft || 0);
    // Si nos movemos más de 5 píxeles, se considera drag y no click
    if (Math.abs(x - startX) > 5) {
      hasDragged.current = true;
    }
    
    const walk = (x - startX) * 2; // Multiplicador de velocidad
    if (filterScrollRef.current) {
      filterScrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleCardsMouseDown = (e: React.MouseEvent) => {
    setIsDraggingCards(true);
    setStartCardsX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollCardsLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleCardsMouseLeaveDrag = () => {
    setIsDraggingCards(false);
  };

  const handleCardsMouseUp = () => {
    setIsDraggingCards(false);
  };

  const handleCardsMouseMoveDrag = (e: React.MouseEvent) => {
    if (!isDraggingCards) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startCardsX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollCardsLeft - walk;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (filterScrollRef.current && e.deltaY !== 0) {
      // Evita el comportamiento de la rueda por defecto solo si hace scroll horizontal aquí
      // Pero para no bloquear la página entera, solo lo hacemos si hay scroll horizontal posible
      filterScrollRef.current.scrollBy({ left: e.deltaY > 0 ? 100 : -100, behavior: 'smooth' });
    }
  };

  const uniqueRoles = useMemo(() => {
    return ["Todos", ...new Set(employeeData.map(e => e.role))].sort((a, b) => {
      if (a === "Todos") return -1;
      if (b === "Todos") return 1;
      return a.localeCompare(b);
    });
  }, []);

  const filteredTeam = useMemo(() => {
    return filter === "Todos" ? employeeData : employeeData.filter(e => e.role === filter);
  }, [filter]);

  const handleScroll = (direction: number) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 340;
      scrollRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  // Efecto Fondo 3D (Three.js)
  useEffect(() => {
    const container = bgRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 280;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color('#ea580c');
    const color2 = new THREE.Color('#431407'); // Un naranja muy oscuro / rojizo

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = Math.random() * 80;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i+2] = radius * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colorsArray[i] = mixedColor.r;
      colorsArray[i+1] = mixedColor.g;
      colorsArray[i+2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    const clock = new THREE.Clock();
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(container);
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!visible) return;
      const elapsedTime = clock.getElapsedTime();

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.02;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full py-14 sm:py-20 bg-white overflow-hidden">
      <BrandBackground variant="mosaic" intensity={1} veil={0.12} />
      
      {/* FONDO 3D DE PARTÍCULAS */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0"></div>

      {/* GRADIENTE SUPERIOR PARA UNIÓN SUAVE */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-plot-bg to-transparent z-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 mt-6 sm:mt-10">
        
        {/* ENCABEZADO */}
        <div className="mb-10 sm:mb-12 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
          <BrandTextPanel>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-plot-ink uppercase tracking-tight mb-2">
              Conocé al <br />
              <span className="text-[#ea580c] font-brier lowercase text-4xl sm:text-5xl md:text-7xl lg:text-8xl">equipo</span>
            </h2>
          </BrandTextPanel>
          <BrandTextPanel className="max-w-xl">
            <p className="text-plot-ink text-base sm:text-lg md:text-xl font-medium leading-relaxed">
              Detrás de cada proyecto hay personas apasionadas y comprometidas. Diferentes áreas y talentos trabajando juntos para superar expectativas.
            </p>
          </BrandTextPanel>
        </div>

        {/* FILTROS CON SCROLL TIPO PARALLAX / LOGUITOS */}
        <div className="mb-10 sm:mb-12 relative">
          <div 
            ref={filterScrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveDrag}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMoveDrag}
            onWheel={handleWheel}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 pt-4 px-1 sm:px-4 hide-scrollbar snap-x cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none' }}
          >
            {uniqueRoles.map(role => {
              const isSelected = filter === role;
              return (
                <button
                  key={role}
                  onClick={(e) => {
                    if (hasDragged.current) {
                      e.preventDefault();
                      return;
                    }
                    setFilter(role);
                  }}
                  className={`shrink-0 snap-center group relative flex items-center gap-2.5 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-500 overflow-hidden ${
                    isSelected 
                      ? "bg-[#ea580c] text-white shadow-[0_10px_30px_-10px_rgba(234,88,12,0.8)] border border-[#ea580c]/50" 
                      : "bg-white/80 text-plot-ink/50 border border-black/5 hover:bg-white hover:text-plot-ink hover:border-lorenzo-accent/30 hover:-translate-y-1"
                  }`}
                >
                  {/* Brillo de fondo al hacer hover en no seleccionados */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}

                  {/* Icono (Loguito) */}
                  <div className={`transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110 group-hover:text-[#ea580c]"}`}>
                    {getRoleIcon(role)}
                  </div>
                  
                  {/* Texto */}
                  <span className={`tracking-wide text-sm md:text-base ${isSelected ? "font-bold" : ""}`}>
                    {role}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CARRUSEL DE TARJETAS 3D */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onMouseDown={handleCardsMouseDown}
            onMouseLeave={handleCardsMouseLeaveDrag}
            onMouseUp={handleCardsMouseUp}
            onMouseMove={handleCardsMouseMoveDrag}
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 sm:pb-10 pt-4 sm:pt-8 items-start hide-scrollbar relative z-10 cursor-grab active:cursor-grabbing px-1"
            style={{ scrollbarWidth: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredTeam.map(emp => (
                <TeamCard key={emp.name} emp={emp} />
              ))}
            </AnimatePresence>
            <div className="shrink-0 w-4 sm:w-8"></div>
          </div>

          {/* BOTONES DE NAVEGACIÓN */}
          <div className="flex items-center gap-3 sm:gap-4 mt-4 md:mt-6 justify-center md:justify-end pr-0 md:pr-8 relative z-20 pointer-events-none">
            <button 
              onClick={() => handleScroll(-1)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-black/10 bg-white text-plot-ink flex items-center justify-center hover:bg-lorenzo-accent hover:border-lorenzo-accent hover:text-white hover:shadow-[0_0_20px_rgba(240,120,46,0.4)] transition-all duration-300 backdrop-blur-md pointer-events-auto group"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => handleScroll(1)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-black/10 bg-white text-plot-ink flex items-center justify-center hover:bg-lorenzo-accent hover:border-lorenzo-accent hover:text-white hover:shadow-[0_0_20px_rgba(240,120,46,0.4)] transition-all duration-300 backdrop-blur-md pointer-events-auto group"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

      </div>
      
      {/* Estilos para ocultar barra de scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
}
