"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { BrandBackground } from "@/components/brand-motif";

export default function CreacionStands3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const playVideo = () => {
    if (!hasPlayed.current && videoRef.current) {
      videoRef.current.play().catch((err) => console.log("Auto-play prevenido", err));
      hasPlayed.current = true;
    }
  };

  useEffect(() => {
    if (isInView) {
      playVideo();
    }
  }, [isInView]);

  // --- LÓGICA PARALLAX PROFESIONAL ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs muy suaves para dar sensación de peso y elegancia
  const springConfig = { stiffness: 40, damping: 30 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Capa 1: Fondo Base
  const bgX = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  // Capa 2: Textos (Primer Plano, más rápidos para dar profundidad)
  const textX = useTransform(mouseX, [-0.5, 0.5], [25, -25]);
  const textY = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- ATMÓSFERA THREE.JS (Polvo y chispas de construcción/diseño) ---
  const threeCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = threeCanvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    // Niebla naranja cinematográfica
    scene.fog = new THREE.FogExp2('#ff5500', 0.0015); 

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    // Partículas tipo brasas / chispas
    const particleCount = 160;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: {x: number, y: number, z: number}[] = [];
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;     
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400; 

      velocities.push({
        x: (Math.random() - 0.5) * 0.2,
        y: Math.random() * 0.5 + 0.2, 
        z: (Math.random() - 0.5) * 0.2
      });

      sizes[i] = Math.random() * 5 + 2; 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if(ctx){
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 220, 150, 1)'); // Núcleo brillante
      gradient.addColorStop(0.2, 'rgba(255, 85, 0, 0.8)'); // Borde fuego
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 6,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(container);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!visible) return;

      const posAttribute = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        posAttribute.array[i * 3] += velocities[i].x;
        posAttribute.array[i * 3 + 1] += velocities[i].y;
        posAttribute.array[i * 3 + 2] += velocities[i].z;

        if (posAttribute.array[i * 3 + 1] > 400) {
          posAttribute.array[i * 3 + 1] = -400;
          posAttribute.array[i * 3] = (Math.random() - 0.5) * 800;
        }
      }
      posAttribute.needsUpdate = true;
      particles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      io.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playVideo}
      className="relative w-full h-[75svh] min-h-[420px] sm:min-h-[520px] md:h-[100vh] md:min-h-[700px] overflow-hidden bg-white flex items-center justify-center cursor-crosshair group"
    >
      <BrandBackground variant="sunburst" intensity={1} veil={0.12} />
      
      {/* 1. FONDO WEB (Tonos cálidos y misteriosos) */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff5500] via-[#5a1800] to-[#050100] opacity-50"></div>
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full h-[50vh] bg-[#ff6a00] blur-[100px] md:blur-[150px] opacity-20 rounded-full pointer-events-none"></div>
      </motion.div>

      {/* 2. CAPA STAND EN VIDEO (Sólido y ESTÁTICO) */}
      <div 
        className="absolute z-10 w-full flex justify-center bottom-[5%] md:bottom-[0%] pointer-events-none px-2"
      >
        <div className="relative w-full md:w-[95vw] max-w-[1400px] flex justify-center items-end">
          
          {/* Halos de luz de ambiente del stand */}
          <div className="absolute top-[30%] left-[20%] w-24 h-24 md:w-40 md:h-40 bg-[#ff8c00] rounded-full blur-[60px] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-[30%] right-[20%] w-24 h-24 md:w-40 md:h-40 bg-[#ff8c00] rounded-full blur-[60px] opacity-20 mix-blend-overlay"></div>

          {/* Video de Creación de Stand con CSS MASK para difuminar bordes. Sin atributo 'loop' ni 'autoPlay'. */}
          <video 
            ref={videoRef}
            src="https://plotcenter.com.ar/wp-content/uploads/2026/05/cinematic_202605080848.mp4" 
            muted 
            playsInline
            className="w-full h-auto object-contain opacity-95 drop-shadow-2xl"
            style={{
              WebkitMaskImage: "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
              maskImage: "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
            }}
          />
        </div>
      </div>

      {/* 3. ATMÓSFERA 3D (Polvo y construcción - FLOTANDO SOBRE EL VIDEO) */}
      <div 
        ref={threeCanvasRef} 
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{ zIndex: 15 }}
      ></div>

      {/* 4. CAPA DE TEXTO (1ER PLANO - Flotando arriba de todo con animación de entrada) */}
      <motion.div 
        style={{ x: textX, y: textY }}
        className="absolute z-20 flex flex-col items-center justify-center top-[15%] md:top-[12%] w-full select-none pointer-events-none"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.25rem,11vw,11rem)] font-black leading-[0.85] text-transparent uppercase tracking-tight drop-shadow-[0_0_20px_rgba(255,85,0,0.6)]"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}
        >
          Creación
        </motion.h2>
        <motion.h2 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-[clamp(2.25rem,11vw,11rem)] font-black leading-[0.85] text-white uppercase tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
        >
          de Stands
        </motion.h2>
      </motion.div>

      {/* 5. SUELO OSCURO (Fundido para anclar el entorno) */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[#050100] via-[#050100]/80 to-transparent z-30 pointer-events-none"></div>

    </section>
  );
}
