"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, Users, Lightbulb, RadioReceiver, Activity } from "lucide-react";
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif";

// --- DATOS DE LOS PILARES ---
const pillarsData = [
  { 
    id: "seguridad", 
    angle: 180, // Izquierda
    title: "01 Seguridad", 
    desc: "Garantizamos el bienestar de las personas y la integridad de nuestros procesos, cumpliendo normativas.", 
    color: "#ea580c", // Naranja principal
    Icon: ShieldCheck 
  },
  { 
    id: "actitud", 
    angle: 90, // Abajo
    title: "02 Actitud", 
    desc: "Es la energía que impulsa nuestro crecimiento y nos motiva a superar objetivos creativamente.", 
    color: "#f97316", // Naranja claro
    Icon: Zap 
  },
  { 
    id: "comunidad", 
    angle: 0, // Derecha
    title: "03 Comunidad", 
    desc: "Es el vínculo genuino que construimos con el entorno. Promueve relaciones sólidas y respeto.", 
    color: "#fb923c", // Naranja pastel/dorado
    Icon: Users 
  },
  { 
    id: "creatividad", 
    angle: 270, // Arriba
    title: "04 Creatividad", 
    desc: "Es el motor que impulsa la innovación en nuestros procesos, desde la idea hasta la ejecución.", 
    color: "#f59e0b", // Ambar
    Icon: Lightbulb 
  }
];

export default function Pilares3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  
  // Ref para enviar el color e intensidad al canvas 3D
  const networkStateRef = useRef({
    color: new THREE.Color("#ea580c"),
    targetColor: new THREE.Color("#ea580c"),
    speedMultiplier: 1.0
  });

  // Actualizar estado del núcleo 3D según el hover
  useEffect(() => {
    if (hoveredPillar) {
      const pillar = pillarsData.find(p => p.id === hoveredPillar);
      if (pillar) {
        networkStateRef.current.targetColor.set(pillar.color);
        networkStateRef.current.speedMultiplier = 2.5; // Acelera la red suavemente
      }
    } else {
      networkStateRef.current.targetColor.set("#ea580c"); // Vuelve a naranja por defecto
      networkStateRef.current.speedMultiplier = 1.0; // Velocidad normal
    }
  }, [hoveredPillar]);

  // --- CONFIGURACIÓN THREE.JS (Red de Comunicación Premium) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    // Añadimos un poco de niebla para darle profundidad
    scene.fog = new THREE.FogExp2(0x1a1412, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 350; // Acercamos un poco la cámara

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    // Crear partículas y líneas para la red
    const maxParticleCount = 90; // Menos partículas = menos lag
    const r = 220; // Radio de la esfera de red
    const rHalf = r / 2;

    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] = [];
    const positions = new Float32Array(maxParticleCount * 3);
    const colors = new Float32Array(maxParticleCount * 3);

    // Distribuir partículas en una esfera
    for (let i = 0; i < maxParticleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / maxParticleCount);
      const theta = Math.sqrt(maxParticleCount * Math.PI) * phi;

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color inicial base
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.5;
      colors[i * 3 + 2] = 0.0;

      particlesData.push({
        velocity: new THREE.Vector3(-0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random()).normalize().multiplyScalar(0.4),
        numConnections: 0
      });
    }

    // Material de partículas con destello (Additive Blending)
    const pMaterial = new THREE.PointsMaterial({
      size: 4,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particleSystem = new THREE.Points(particlesGeometry, pMaterial);
    scene.add(particleSystem);

    // Geometría y Material para las líneas de conexión
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xea580c,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Interacción con mouse para rotación extra
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.0005;
      mouseY = (event.clientY - windowHalfY) * 0.0005;
    };
    window.addEventListener('mousemove', onDocumentMouseMove);

    // Bucle de renderizado
    const clock = new THREE.Clock();
    let animationId: number;
    let rotationAngle = 0;
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
      const delta = clock.getDelta();
      const state = networkStateRef.current;

      // Interpolar color de la red suavemente
      linesMaterial.color.lerp(state.targetColor, 0.08);

      // Suavizado del movimiento del mouse
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      // Rotación global y por mouse
      rotationAngle += delta * 0.15 * state.speedMultiplier;
      particleSystem.rotation.y = rotationAngle + targetX;
      linesMesh.rotation.y = rotationAngle + targetX;
      particleSystem.rotation.x += 0.05 * (targetY - particleSystem.rotation.x);
      linesMesh.rotation.x += 0.05 * (targetY - linesMesh.rotation.x);
      particleSystem.rotation.z = rotationAngle * 0.3;
      linesMesh.rotation.z = rotationAngle * 0.3;

      // Actualizar colores de los nodos según el target color
      const colorAttribute = particlesGeometry.attributes.color;
      for (let i = 0; i < maxParticleCount; i++) {
        const c = new THREE.Color(colorAttribute.getX(i), colorAttribute.getY(i), colorAttribute.getZ(i));
        c.lerp(state.targetColor, 0.05);
        colorAttribute.setXYZ(i, c.r, c.g, c.b);
      }
      colorAttribute.needsUpdate = true;

      // Lógica de conexión de la red
      const posAttribute = particlesGeometry.attributes.position;
      for (let i = 0; i < maxParticleCount; i++) {
        particlesData[i].numConnections = 0;
        
        // Movimiento local de partículas
        const pData = particlesData[i];
        posAttribute.array[i * 3] += pData.velocity.x * state.speedMultiplier;
        posAttribute.array[i * 3 + 1] += pData.velocity.y * state.speedMultiplier;
        posAttribute.array[i * 3 + 2] += pData.velocity.z * state.speedMultiplier;

        // Rebote en los límites esféricos imaginarios
        const x = posAttribute.array[i * 3];
        const y = posAttribute.array[i * 3 + 1];
        const z = posAttribute.array[i * 3 + 2];
        if (x*x + y*y + z*z > r*r) {
           pData.velocity.x *= -1;
           pData.velocity.y *= -1;
           pData.velocity.z *= -1;
        }
      }
      posAttribute.needsUpdate = true;

      // Calcular distancias y crear líneas
      const positionsArray = [];
      for (let i = 0; i < maxParticleCount; i++) {
        for (let j = i + 1; j < maxParticleCount; j++) {
          const dx = posAttribute.array[i * 3] - posAttribute.array[j * 3];
          const dy = posAttribute.array[i * 3 + 1] - posAttribute.array[j * 3 + 1];
          const dz = posAttribute.array[i * 3 + 2] - posAttribute.array[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          // Enlaces dinámicos (ref evita remount del WebGL en cada hover)
          const connectionLimit = networkStateRef.current.speedMultiplier > 1.5 ? 6000 : 4500;
          if (distSq < connectionLimit) {
            particlesData[i].numConnections++;
            particlesData[j].numConnections++;

            positionsArray.push(
              posAttribute.array[i * 3], posAttribute.array[i * 3 + 1], posAttribute.array[i * 3 + 2],
              posAttribute.array[j * 3], posAttribute.array[j * 3 + 1], posAttribute.array[j * 3 + 2]
            );
          }
        }
      }

      linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3));
      
      // Añadir un pulso de opacidad orgánico
      linesMaterial.opacity = 0.15 + Math.sin(clock.elapsedTime * state.speedMultiplier * 2) * 0.1;

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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onDocumentMouseMove);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      pMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full min-h-0 md:min-h-screen bg-white overflow-hidden py-14 sm:py-20 md:py-24 flex flex-col">
      <BrandBackground variant="sunburst" intensity={1} veil={0.12} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white z-0 pointer-events-none" />

      {/* ENCABEZADO */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16 mb-8 md:mb-0"
      >
        <BrandTextPanel className="inline-block mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-plot-ink tracking-tight mb-4 sm:mb-6">
            Pilares <span className="text-lorenzo-accent font-brier lowercase">Fundantes</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-plot-ink font-medium leading-relaxed max-w-3xl mx-auto">
            Estructuran nuestra cultura y orientan el modo en que trabajamos y nos proyectamos. Seguridad, Actitud, Comunidad y Creatividad, basados en la <strong className="text-brand-orange">comunicación</strong> como eje estructural.
          </p>
        </BrandTextPanel>
      </motion.div>

      {/* CONTENEDOR 3D Y ÓRBITA */}
      <div className="relative flex-1 w-full max-w-[1200px] mx-auto flex items-center justify-center mt-10 md:mt-20 px-4 md:px-12">
        
        {/* Canvas de Three.js (La Red de Comunicación) */}
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-60 mix-blend-screen scale-100 md:scale-110"></div>

        {/* NÚCLEO CENTRAL — flujo en móvil, absoluto en desktop */}
        <motion.div 
          className="relative z-30 flex items-center justify-center pointer-events-none mb-8 lg:mb-0 lg:absolute lg:inset-0"
          animate={{ scale: hoveredPillar ? 1.06 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
        >
          <div className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full bg-brand-orange/10 animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <div className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full bg-brand-orange/15 blur-2xl" />
          
          <div className="relative bg-white/97 backdrop-blur-xl border-2 border-brand-orange/50 text-plot-ink px-6 py-3 md:px-7 md:py-4 rounded-3xl shadow-[0_12px_40px_-8px_rgba(243,149,25,0.35)] flex flex-col items-center justify-center gap-2 overflow-hidden">
            <Activity className="w-6 h-6 md:w-7 md:h-7 text-brand-orange" />
            <span className="font-display uppercase tracking-tight text-sm md:text-lg text-plot-ink">
              Comunicaci<span className="text-brand-orange">ón</span>
            </span>
          </div>
        </motion.div>

        {/* --- VERSIÓN DESKTOP: ÓRBITA CIRCULAR --- */}
        <div className="hidden lg:block relative w-full aspect-square max-w-[850px] z-20">
          {/* CABLES SVG SUPERPUESTOS */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <AnimatePresence>
              {hoveredPillar && pillarsData.map(target => {
                if (target.id === hoveredPillar) return null;
                
                const source = pillarsData.find(p => p.id === hoveredPillar)!;
                
                // Calculamos las posiciones en base al radio (46%) y centro (50%)
                const sourceRad = (source.angle * Math.PI) / 180;
                const targetRad = (target.angle * Math.PI) / 180;
                
                const sx = 50 + Math.cos(sourceRad) * 46;
                const sy = 50 + Math.sin(sourceRad) * 46;
                const tx = 50 + Math.cos(targetRad) * 46;
                const ty = 50 + Math.sin(targetRad) * 46;

                // Curva cuadrática que pasa cerca del centro (50, 50) para rodear el núcleo
                const pathD = `M ${sx} ${sy} Q 50 50 ${tx} ${ty}`;

                return (
                  <motion.path
                    key={`${source.id}-${target.id}`}
                    d={pathD}
                    fill="none"
                    stroke={source.color}
                    strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ filter: `drop-shadow(0 0 2px ${source.color})` }}
                  />
                );
              })}
            </AnimatePresence>
          </svg>

          {/* Anillos orbitales decorativos */}
          <div className="absolute inset-4 rounded-full border border-brand-orange/15 shadow-[inset_0_0_80px_rgba(243,149,25,0.06)] z-0" />
          <div className="absolute inset-8 rounded-full border border-dashed border-brand-navy/15 z-0" />
          
          {pillarsData.map((pillar, i) => {
            // Calcular posiciones en un círculo (Radio = 46%)
            const radius = 46; 
            const angleRad = (pillar.angle * Math.PI) / 180;
            const top = `calc(50% + ${Math.sin(angleRad) * radius}%)`;
            const left = `calc(50% + ${Math.cos(angleRad) * radius}%)`;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15, type: "spring" }}
                className="absolute w-[min(280px,28vw)] xl:w-[320px] -translate-x-1/2 -translate-y-1/2"
                style={{ top, left }}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                <div 
                  className={`relative p-5 xl:p-7 rounded-3xl backdrop-blur-2xl border transition-all duration-500 group cursor-default overflow-hidden
                    ${hoveredPillar === pillar.id 
                      ? 'bg-white/95 border-lorenzo-accent/50 scale-105 z-30' 
                      : hoveredPillar !== null
                        ? 'bg-white/40 border-black/5 opacity-50 scale-95' 
                        : 'bg-white/70 border-black/5 hover:bg-white/90'}
                  `}
                  style={{ 
                    boxShadow: hoveredPillar === pillar.id ? `0 25px 50px -12px rgba(234,88,12,0.3), inset 0 0 30px rgba(234,88,12,0.1)` : '0 10px 30px -10px rgba(0,0,0,0.5)' 
                  }}
                >
                  {/* Gradiente de fondo en hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${pillar.color}15, transparent 70%)` }}
                  ></div>
                  
                  {/* Borde izquierdo dinámico */}
                  <div 
                    className="absolute top-0 left-0 w-1.5 h-full transition-all duration-500 ease-out origin-top" 
                    style={{ 
                      backgroundColor: pillar.color,
                      boxShadow: `0 0 20px ${pillar.color}`
                    }}
                  ></div>
                  
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      style={{ 
                        backgroundColor: hoveredPillar === pillar.id ? pillar.color : `${pillar.color}15`, 
                        borderColor: hoveredPillar === pillar.id ? pillar.color : `${pillar.color}30`,
                        color: hoveredPillar === pillar.id ? '#fff' : pillar.color,
                        boxShadow: hoveredPillar === pillar.id ? `0 10px 20px -5px ${pillar.color}60` : 'none'
                      }}
                    >
                      <pillar.Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-plot-ink tracking-tight">{pillar.title}</h3>
                  </div>
                  <p className="text-plot-ink-muted text-sm leading-relaxed relative z-10 font-light">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- VERSIÓN MÓVIL: LISTA EN CUADRÍCULA --- */}
        <div className="lg:hidden relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full mt-4 mb-10">
          {pillarsData.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setHoveredPillar(hoveredPillar === pillar.id ? null : pillar.id)}
              onMouseEnter={() => setHoveredPillar(pillar.id)}
              onMouseLeave={() => setHoveredPillar(null)}
              className={`relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border overflow-hidden group shadow-xl transition-colors ${
                hoveredPillar === pillar.id ? "border-brand-orange/40" : "border-black/5"
              }`}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: pillar.color, boxShadow: `0 0 10px ${pillar.color}` }}></div>
              
              <div className="flex items-center gap-4 mb-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                >
                  <pillar.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-plot-ink">{pillar.title}</h3>
              </div>
              <p className="text-plot-ink-muted text-sm leading-relaxed font-light">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
