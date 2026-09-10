"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif";

export default function Comparador3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let isMounted = true;

    // 1. CONFIGURACIÓN BÁSICA DE THREE.JS
    const scene = new THREE.Scene();
    // Usamos cámara ortográfica porque queremos una vista 2D plana, sin perspectiva
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    // 2. CARGA DE TEXTURAS (Imágenes)
    const textureLoader = new THREE.TextureLoader();
    // Configuración vital para evitar errores de CORS (Cross-Origin) al cargar imágenes en WebGL
    textureLoader.setCrossOrigin('anonymous');
    
    const imgBefore = "/VID_20220611_090713156-0-00-02-12-1-1.webp";
    const imgAfter = "/RETOQUE-FRENTE-PLOT-CENTER-03-1-1.webp";

    // Imágenes de respaldo en caso de que el servidor original bloquee la petición
    const fallbackBefore = "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop";
    const fallbackAfter = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop";

    Promise.all([
      textureLoader.loadAsync(imgBefore).catch(() => textureLoader.loadAsync(fallbackBefore)),
      textureLoader.loadAsync(imgAfter).catch(() => textureLoader.loadAsync(fallbackAfter))
    ]).then(([texBefore, texAfter]) => {
      
      if (!isMounted) return;

      // Ajustes para que la textura se vea nítida
      texBefore.generateMipmaps = true;
      texBefore.minFilter = THREE.LinearMipmapLinearFilter;
      texAfter.generateMipmaps = true;
      texAfter.minFilter = THREE.LinearMipmapLinearFilter;

      // 3. SHADER PERSONALIZADO (Magia WebGL)
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform sampler2D tBefore;
        uniform sampler2D tAfter;
        uniform float uProgress;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uImageRatioBefore;
        uniform vec2 uImageRatioAfter;

        varying vec2 vUv;

        // Función para emular "object-fit: cover" de CSS en ThreeJS
        vec2 getCoverUv(vec2 uv, vec2 resolution, vec2 imageRatio) {
          float renderRatio = resolution.x / resolution.y;
          float imgRatio = imageRatio.x / imageRatio.y;
          vec2 newUv = uv;

          if (renderRatio > imgRatio) {
            float scaleY = imgRatio / renderRatio;
            newUv.y = (newUv.y - 0.5) * scaleY + 0.5;
          } else {
            float scaleX = renderRatio / imgRatio;
            newUv.x = (newUv.x - 0.5) * scaleX + 0.5;
          }
          return newUv;
        }

        void main() {
          // Calculamos las UVs corregidas de manera independiente para cada textura
          // Así ambas cubren perfectamente el cuadro sin estirarse aunque tengan distinto tamaño
          vec2 uvBeforeCover = getCoverUv(vUv, uResolution, uImageRatioBefore);
          vec2 uvAfterCover = getCoverUv(vUv, uResolution, uImageRatioAfter);

          // Corte completamente limpio y recto sin distorsión
          vec2 uvBefore = uvBeforeCover;
          vec2 uvAfter = uvAfterCover;

          vec4 colorBefore = texture2D(tBefore, clamp(uvBefore, 0.0, 1.0));
          vec4 colorAfter = texture2D(tAfter, clamp(uvAfter, 0.0, 1.0));

          // Si la posición X es menor al progreso, muestra "Antes", sino "Hoy"
          float mixFactor = step(vUv.x, uProgress);
          
          gl_FragColor = mix(colorAfter, colorBefore, mixFactor);
        }
      `;

      const uniforms = {
        tBefore: { value: texBefore },
        tAfter: { value: texAfter },
        uProgress: { value: 0.5 },
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uImageRatioBefore: { value: new THREE.Vector2(texBefore.image.width, texBefore.image.height) },
        uImageRatioAfter: { value: new THREE.Vector2(texAfter.image.width, texAfter.image.height) }
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms
      });
      materialRef.current = material;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      setIsLoaded(true);

      // 4. BUCLE DE ANIMACIÓN
      const clock = new THREE.Clock();
      let animationId: number;
      let visible = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: "100px" }
      );
      io.observe(container);

      const animate = () => {
        if (!isMounted) return;
        animationId = requestAnimationFrame(animate);
        if (!visible) return;
        material.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
      };
      animate();

      // 5. RESIZE HANDLER
      const handleResize = () => {
        if (!container || !isMounted) return;
        renderer.setSize(container.clientWidth, container.clientHeight);
        material.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        io.disconnect();
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        geometry.dispose();
        material.dispose();
        texBefore.dispose();
        texAfter.dispose();
      };
    }).catch(error => {
      console.error("Error crítico cargando texturas 3D:", error);
    });

    // LIMPIEZA GENERAL
    return () => {
      isMounted = false;
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Lógica para actualizar el uniform del shader y la posición del slider HTML
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    
    // Actualizamos el slider visual (línea y botón)
    if (handleRef.current) {
      handleRef.current.style.left = `${val * 100}%`;
    }
    
    // Actualizamos el shader de Three.js al instante
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = val;
    }
  };

  return (
    <section className="relative w-full py-24 bg-white flex flex-col items-center justify-center overflow-hidden">
      <BrandBackground variant="arcs-field" intensity={1} veil={0.12} />
      
      {/* GLOW DE FONDO ATRACTIVO */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#ea580c] rounded-full blur-[120px] pointer-events-none" 
      />

      {/* CONTENEDOR DEL COMPARADOR */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-12 mt-16 md:mt-20">
        
        {/* Título de la sección con animación */}
        <motion.div 
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="mb-12 relative z-10 text-center md:text-left"
        >
          <BrandTextPanel className="inline-block mx-auto md:mx-0">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight text-plot-ink leading-none">
              El <span className="text-lorenzo-accent font-brier lowercase text-6xl md:text-7xl lg:text-8xl">cambio</span> <br />
              en primera persona
            </h2>
          </BrandTextPanel>
        </motion.div>

        {/* Contenedor del comparador con animación de entrada y flotación */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 80 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-50px" }}
          className="relative w-full h-[50vh] md:h-[70vh] rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(234,88,12,0.3)] overflow-hidden bg-black/50 border border-white/10 group cursor-ew-resize z-10"
        >
          
          {/* LOADER */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-plot-bg z-30">
              <div className="w-12 h-12 border-4 border-[#ea580c]/30 border-t-[#ea580c] rounded-full animate-spin"></div>
            </div>
          )}

          {/* CANVAS DE THREE.JS */}
          <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* ELEMENTOS HTML SUPERPUESTOS */}
          {isLoaded && (
            <>
              {/* ETIQUETAS */}
              <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full font-bold text-xs md:text-sm tracking-wider shadow-lg pointer-events-none z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                ANTES
              </div>
              <div className="absolute top-6 right-6 bg-[#ea580c]/90 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold text-xs md:text-sm tracking-wider shadow-lg pointer-events-none z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                HOY
              </div>

              {/* INPUT INVISIBLE PARA CONTROLAR EL DRAG */}
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.001" 
                value={progress}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
                aria-label="Comparador de imágenes"
              />

              {/* LÍNEA Y BOTÓN CENTRAL (Handle) */}
              <div 
                ref={handleRef} 
                className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                style={{ left: '50%' }}
              >
                {/* Botón circular con flechas */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#ea580c] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(234,88,12,0.6)] border-4 border-white transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
                  </svg>
                </div>
              </div>
            </>
          )}

        </motion.div>
      </div>
    </section>
  );
}
