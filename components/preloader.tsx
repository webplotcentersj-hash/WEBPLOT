"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, animate } from "framer-motion";

// --- UTILIDAD PARA LAS TEXTURAS DEL CUBO ---
const createFaceTexture = (text: string, bgColor: string, textColor: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 512, 512);

  ctx.lineWidth = 40;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(0, 0, 512, 512);

  if (text) {
    ctx.fillStyle = textColor;
    ctx.font = "bold 380px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 256, 280);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isLoadedRef = useRef(false); // Para leer el estado dentro del loop de Three.js
  const mountRef = useRef<HTMLDivElement>(null);

  // Bloqueo de scroll mientras carga
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  // --- LÓGICA DEL CONTADOR Y COMPUERTAS ---
  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2, // Tiempo de carga
      ease: [0.83, 0, 0.17, 1], // Ease out expo
      onUpdate: (value) => {
        setProgress(Math.round(value));
      },
      onComplete: () => {
        setTimeout(() => {
          setIsLoaded(true);
          isLoadedRef.current = true; // Avisamos al cubo 3D que ya cargó
          
          // Desmontamos el componente tras la animación de salida (apertura)
          setTimeout(() => {
            if (onComplete) onComplete();
            setIsVisible(false);
          }, 1200); 
        }, 300);
      }
    });

    return () => controls.stop();
  }, [onComplete]);

  // --- LÓGICA DEL CUBO 3D (Three.js) ---
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Escena y Cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // 2. Renderizador (Transparente para ver el fondo)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    // 4. Construcción del Cubo
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const texC = createFaceTexture("C", "#ea580c", "#000000"); 
    const texP = createFaceTexture("P", "#ffffff", "#000000"); 
    const matOrange = new THREE.MeshStandardMaterial({ map: texC, roughness: 0.3 });
    const matWhite = new THREE.MeshStandardMaterial({ map: texP, roughness: 0.3 });
    const matBlack = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.3 });

    const materials = [matOrange, matOrange, matBlack, matBlack, matWhite, matWhite];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // 5. Configuración inicial del "Impulso"
    // Empieza muy atrás y rotado al azar para dar sensación de disparo
    cube.position.z = -50; 
    cube.rotation.x = Math.random() * Math.PI * 2;
    cube.rotation.y = Math.random() * Math.PI * 2;

    let targetZ = 0; // Se detiene en el centro
    let rotSpeedX = 0.5; // Velocidad inicial de giro (muy rápida)
    let rotSpeedY = 0.6;

    // 6. Bucle de Animación
    let animationId: number;
    const clock = new THREE.Clock();

    const animateScene = () => {
      animationId = requestAnimationFrame(animateScene);
      const time = clock.getElapsedTime();

      // Si terminó de cargar (isLoaded == true), disparamos el cubo hacia la cámara
      if (isLoadedRef.current) {
        targetZ = 15; // Posición detrás de la cámara (el cubo atraviesa la pantalla)
        rotSpeedX = 0.4;
        rotSpeedY = 0.4;
      }

      // Interpolación lineal (Lerp) para el movimiento impulsado
      // Arranca rápido por la gran distancia y frena suavemente
      cube.position.z += (targetZ - cube.position.z) * 0.08;

      // Desaceleración de la rotación a medida que se acerca al centro
      if (!isLoadedRef.current) {
        rotSpeedX += (0.01 - rotSpeedX) * 0.05;
        rotSpeedY += (0.02 - rotSpeedY) * 0.05;
        
        // Pequeño efecto de flotación vertical
        cube.position.y = Math.sin(time * 3) * 0.2;
      }

      // Aplicar rotaciones
      cube.rotation.x += rotSpeedX;
      cube.rotation.y += rotSpeedY;

      renderer.render(scene, camera);
    };

    animateScene();

    // 7. Responsive Resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach(m => m.dispose());
      texC.dispose();
      texP.dispose();
      renderer.dispose();
    };
  }, []);

  if (!isVisible) return null;

  return (
    // Contenedor principal anclado por encima de toda la web (z-[9999])
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* COMPUERTA SUPERIOR */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isLoaded ? "-100%" : "0%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#050100] border-b border-orange-500/20 pointer-events-auto"
      />

      {/* COMPUERTA INFERIOR */}
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: isLoaded ? "100%" : "0%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#050100] border-t border-orange-500/20 pointer-events-auto"
      />

      {/* CANVAS DEL CUBO 3D (Ubicado por detrás de los números) */}
      <div ref={mountRef} className="absolute inset-0 z-0"></div>

      {/* CONTENIDO DEL LOADER (Números y barra) */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1, scale: isLoaded ? 1.2 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 mix-blend-difference pointer-events-auto"
      >
        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/80 text-sm md:text-base tracking-[0.4em] font-bold uppercase"
          >
            Plot Center
          </motion.div>
        </div>

        {/* CONTADOR GIGANTE */}
        <div className="relative flex justify-center w-full overflow-hidden px-4">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="text-[30vw] md:text-[20rem] leading-none font-black text-transparent select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            style={{ 
              WebkitTextStroke: "3px rgba(255, 255, 255, 1)",
              fontVariantNumeric: "tabular-nums" 
            }}
          >
            {progress}
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute right-[5%] md:right-[20%] bottom-[20%] text-[6vw] md:text-6xl font-bold text-orange-500"
          >
            %
          </motion.span>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="w-[80%] max-w-sm md:max-w-xl h-[2px] bg-white/10 mt-2 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

      </motion.div>
      
    </div>
  );
}
