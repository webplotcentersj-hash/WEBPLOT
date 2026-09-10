"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Users, ClipboardList, PenTool, Settings, Printer, HardHat, Car, Wrench } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { BrandBackground, BrandTextPanel } from "@/components/brand-motif";

// --- UTILIDADES ---
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

// --- DATOS DEL PROCESO ---
// Mejorados con gradientes para hacerlos más atractivos ("premium")
const processSteps = [
  {
    id: 1,
    title: "ATENCIÓN AL CLIENTE",
    desc: "Recepcionamos pedidos y brindamos un servicio personalizado, satisfaciendo las necesidades de nuestros clientes con eficiencia y amabilidad.",
    boxBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]", 
    arrowColor: "border-r-[#ea580c] border-l-[#ea580c]",
    iconBg: "bg-[#f4f4f5]", 
    iconColor: "text-[#ea580c]",
    Icon: Users
  },
  {
    id: 2,
    title: "PRESUPUESTOS",
    desc: "Encargada de cotizar los trabajos solicitados, considerando los formatos, materiales y especificaciones de cada proyecto para ofrecer propuestas claras, precisas y ajustadas a las necesidades de los clientes.",
    boxBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]",
    arrowColor: "border-r-[#ea580c] border-l-[#ea580c]",
    iconBg: "bg-[#f4f4f5]",
    iconColor: "text-[#ea580c]",
    Icon: ClipboardList
  },
  {
    id: 3,
    title: "DISEÑO GRÁFICO",
    desc: "Área centrada en la creación visual y conceptual de elementos gráficos como logotipos, carteles, folletos y material promocional.",
    boxBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]",
    arrowColor: "border-r-[#ea580c] border-l-[#ea580c]",
    iconBg: "bg-[#f4f4f5]",
    iconColor: "text-[#ea580c]",
    Icon: PenTool
  },
  {
    id: 4,
    title: "TALLER DE PRODUCCIÓN",
    desc: "Espacio especializado en la fabricación eficiente y precisa para dar vida a tus ideas y proyectos.",
    boxBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]",
    arrowColor: "border-r-[#ea580c] border-l-[#ea580c]",
    iconBg: "bg-[#f4f4f5]",
    iconColor: "text-[#ea580c]",
    Icon: Settings
  },
  {
    id: 5,
    title: "TALLER DE IMPRENTA",
    desc: "Centrada en la preproducción masiva de documentos y materiales impresos.",
    boxBg: "bg-gradient-to-br from-[#3f3f46] to-[#27272a]", 
    arrowColor: "border-r-[#3f3f46] border-l-[#3f3f46]",
    iconBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]",
    iconColor: "text-white",
    Icon: Printer
  },
  {
    id: 6,
    title: "TALLER DE METALÚRGICA",
    desc: "Espacio especializado en la fabricación eficiente y precisa para dar vida a tus ideas y proyectos.",
    boxBg: "bg-gradient-to-br from-[#3f3f46] to-[#27272a]",
    arrowColor: "border-r-[#3f3f46] border-l-[#3f3f46]",
    iconBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]",
    iconColor: "text-white",
    Icon: HardHat
  },
  {
    id: 7,
    title: "PLOTEO VEHICULAR",
    desc: "Aplicación de gráficos y vinilos sobre vehículos, con fines publicitarios de marca. Incluye desde simples textos hasta diseños con mayor complejidad.",
    boxBg: "bg-gradient-to-br from-[#3f3f46] to-[#27272a]",
    arrowColor: "border-r-[#3f3f46] border-l-[#3f3f46]",
    iconBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]",
    iconColor: "text-white",
    Icon: Car
  },
  {
    id: 8,
    title: "INSTALACIÓN",
    desc: "Colocación de piezas en distintas superficies como paredes o ventanas. Abarca tanto elementos publicitarios como decorativos, utilizando materialidades de alta calidad.",
    boxBg: "bg-gradient-to-br from-[#ea580c] to-[#c24102]",
    arrowColor: "border-r-[#ea580c] border-l-[#ea580c]",
    iconBg: "bg-[#f4f4f5]",
    iconColor: "text-[#ea580c]",
    Icon: Wrench
  }
];

export default function ProcessSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Estado mutable para el bucle 3D, evita re-renders de React
  const cubeState = useRef({
    targetScale: 3.8,
    targetX: -3.0,
    targetY: -1.5,
    targetRotX: Math.atan(1 / Math.sqrt(2)),
    targetRotY: Math.PI / 4,
    progress: 0
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    cubeState.current.progress = latest;
    let progress = latest;
    
    // Suavizado en los bordes para la animación de entrada
    if (progress < 0) progress = 0;
    if (progress > 0.99) progress = 1.0; 

    const isMobile = window.innerWidth < 768;

    const startScale = isMobile ? 2.5 : 3.8;
    const endScale = 0.8;
    const startX = isMobile ? -0.2 : -3.5;
    const endX = 0; 
    const startY = -1.5;
    const endY = 0; 

    cubeState.current.targetScale = THREE.MathUtils.lerp(startScale, endScale, progress);
    
    const arcPower = Math.sin(progress * Math.PI); 
    cubeState.current.targetX = THREE.MathUtils.lerp(startX, endX, progress) + (arcPower * (isMobile ? 0.2 : 0.5));
    cubeState.current.targetY = THREE.MathUtils.lerp(startY, endY, progress) + (arcPower * 1.5); 

    const baseRotX = Math.atan(1 / Math.sqrt(2));
    const baseRotY = Math.PI / 4;
    cubeState.current.targetRotY = baseRotY + progress * Math.PI * 4; 
    cubeState.current.targetRotX = baseRotX + progress * Math.PI * 2;

    if (glowRef.current) {
      const opacity = progress > 0.9 ? (progress - 0.9) * 10 * 0.8 : 0;
      glowRef.current.style.opacity = opacity.toFixed(2);
    }
  });

  useEffect(() => {
    // --- CONFIGURACIÓN THREE.JS ---
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    
    // Inicialización segura para Next.js
    const initialWidth = mount.clientWidth || window.innerWidth;
    const initialHeight = mount.clientHeight || window.innerHeight;
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const texC = createFaceTexture("C", "#ea580c", "#000000"); 
    const texP = createFaceTexture("P", "#ffffff", "#000000"); 
    const matOrange = new THREE.MeshStandardMaterial({ map: texC, roughness: 0.4 });
    const matWhite = new THREE.MeshStandardMaterial({ map: texP, roughness: 0.4 });
    const matBlack = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });

    const materials = [matOrange, matOrange, matBlack, matBlack, matWhite, matWhite];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(mount);

    // --- BUCLE DE RENDERIZADO ---
    let animationFrameId: number;
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(mount);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!visible) return;
      
      const { targetScale, targetX, targetY, targetRotX, targetRotY } = cubeState.current;
      
      cube.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      cube.position.lerp(new THREE.Vector3(targetX, targetY, 0), 0.08);
      cube.rotation.y = THREE.MathUtils.lerp(cube.rotation.y, targetRotY, 0.08);
      cube.rotation.x = THREE.MathUtils.lerp(cube.rotation.x, targetRotX, 0.08);
      
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      io.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach(m => {
        if (m instanceof THREE.Material) m.dispose();
      });
      texC.dispose();
      texP.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white font-sans selection:bg-brand-orange selection:text-white pb-20">
      <BrandBackground variant="mosaic" intensity={1} veil={0.12} />

      {/* FONDO 3D - Atrapado en la sección mediante sticky */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div ref={mountRef} className="sticky top-0 w-full h-[100svh]"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col overflow-x-hidden">
        
        {/* SECCIÓN 1: HERO TIPO F1 */}
        <div className="min-h-[100svh] flex flex-col items-center justify-center px-4 md:px-12 relative pt-16 sm:pt-20">
          <div className="w-full max-w-[1400px] flex flex-col">
            <BrandTextPanel className="mb-4">
              <h2 className="text-[clamp(2.25rem,11vw,10vw)] md:text-[10vw] leading-[0.85] font-display text-plot-ink tracking-tighter text-left select-none uppercase">
                NUESTRO
              </h2>
              <h2 className="text-[clamp(2.25rem,11vw,10vw)] md:text-[10vw] leading-[0.85] font-display text-brand-red tracking-tighter text-right select-none uppercase">
                proceso
              </h2>
              <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-2xl text-plot-ink max-w-2xl font-medium self-end text-right border-r-4 border-brand-pink pr-4 sm:pr-6 ml-auto">
                Conocé el paso a paso de cómo transformamos tus ideas en realidades de alto impacto, desde el primer contacto hasta la entrega final.
              </p>
            </BrandTextPanel>
          </div>
        </div>

        {/* SECCIÓN 2: NUESTRO PROCESO (Lista) */}
        <div className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-transparent via-[#14100e] to-[#1a1412]">
          <div className="max-w-4xl ml-auto mr-0 sm:mr-4 md:mr-12 lg:mr-24">
            <div className="flex flex-col gap-10 sm:gap-12 md:gap-20 overflow-hidden py-6 sm:py-10">
              {processSteps.map((step, index) => {
                const isLeftIcon = index % 2 === 0;

                return (
                  <motion.div 
                    key={step.id} 
                    initial={{ opacity: 0, x: isLeftIcon ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                    className={`flex flex-col md:flex-row items-center gap-5 md:gap-8 w-full ${isLeftIcon ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* CÍRCULO DEL ÍCONO */}
                    <div className={`shrink-0 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-[5px] sm:border-[6px] border-[#27272a] shadow-[0_0_40px_rgba(234,88,12,0.15)] z-10 transition-transform duration-500 hover:scale-110 ${step.iconBg}`}>
                      <step.Icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${step.iconColor}`} />
                    </div>

                    {/* CAJA DE TEXTO */}
                    <div className={`relative flex-1 p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border border-white/5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(234,88,12,0.2)] ${step.boxBg}`}>
                      {/* Triángulo señalador para Desktop */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[16px] border-y-transparent ${
                          isLeftIcon 
                            ? `left-[-15px] border-r-[16px] ${step.arrowColor}` 
                            : `right-[-15px] border-l-[16px] ${step.arrowColor}`
                      }`} />

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-wide">
                        {step.title}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: PEDESTAL FINAL */}
        <div className="h-[28vh] sm:h-[42vh] md:h-[80vh] flex flex-col items-center justify-center relative pointer-events-none">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Sombra base negra siempre visible */}
            <div className="w-56 h-10 bg-black blur-xl rounded-[100%] absolute mt-40 opacity-80"></div>
            
            {/* Sombra Naranja referenciada (Aparece dinámicamente) */}
            <div 
              ref={glowRef} 
              className="w-40 h-10 bg-[#ea580c] blur-2xl rounded-[100%] absolute mt-40 opacity-0 transition-opacity duration-300"
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
}
