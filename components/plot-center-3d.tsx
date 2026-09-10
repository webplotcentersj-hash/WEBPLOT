"use client"; // Necesario en Next.js porque usamos interactividad del DOM

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1. Función para generar las texturas del logo
// Se declara fuera del componente para no re-crearla innecesariamente
const createFaceTexture = (text: string, bgColor: string, textColor: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return new THREE.Texture();

  // Fondo
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 512, 512);

  // Borde negro grueso
  ctx.lineWidth = 40;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(0, 0, 512, 512);

  // Texto (P o C)
  if (text) {
    ctx.fillStyle = textColor;
    ctx.font = 'bold 380px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 280); // Centrado
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

export default function PlotCenter3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- CONFIGURACIÓN DE THREE.JS ---

    // 1. Escena
    const scene = new THREE.Scene();

    const initialWidth = mount.clientWidth || 300;
    const initialHeight = mount.clientHeight || 300;

    // 2. Cámara
    const camera = new THREE.PerspectiveCamera(50, initialWidth / initialHeight, 0.1, 1000);
    const fitCamera = (width: number, height: number) => {
      const shortSide = Math.min(width, height);
      // Más lejos en pantallas chicas para que el cubo no se corte
      camera.position.z = shortSide < 220 ? 7.2 : shortSide < 300 ? 6.4 : shortSide < 400 ? 5.6 : 5;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    fitCamera(initialWidth, initialHeight);

    // 3. Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Inicializar con tamaño seguro
    renderer.setSize(initialWidth, initialHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    // Permite scroll vertical en móvil; el drag 3D queda solo con mouse fino
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    // 4. Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.6;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      controls.enableRotate = false;
    }

    // 5. Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    // 6. Geometría y Materiales
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const texC = createFaceTexture('C', '#F39519', '#000000');
    const texP = createFaceTexture('P', '#ffffff', '#000000');

    const matOrangeC = new THREE.MeshStandardMaterial({ map: texC, roughness: 0.4 });
    const matWhiteP = new THREE.MeshStandardMaterial({ map: texP, roughness: 0.4 });
    const matBlack = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });

    const materials = [
      matOrangeC, // 0: Derecha
      matOrangeC, // 1: Izquierda
      matBlack,   // 2: Arriba
      matBlack,   // 3: Abajo
      matWhiteP,  // 4: Frente
      matWhiteP   // 5: Atrás
    ];

    const cube = new THREE.Mesh(geometry, materials);
    
    // Posición isométrica inicial aproximada
    cube.rotation.y = Math.PI / 4;
    cube.rotation.x = Math.atan(1 / Math.sqrt(2));
    scene.add(cube);

    // --- LÓGICA DE INTERACCIÓN ---
    let isHovered = false;
    let isActive = false;
    let targetScale = 1.0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateMousePosition = (event: MouseEvent | TouchEvent) => {
      const rect = mount.getBoundingClientRect();
      const clientX = 'changedTouches' in event ? event.changedTouches[0].clientX : event.clientX;
      const clientY = 'changedTouches' in event ? event.changedTouches[0].clientY : event.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onMouseMove = (event: MouseEvent) => {
      updateMousePosition(event);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);

      if (intersects.length > 0) {
        if (!isHovered) {
          isHovered = true;
          mount.style.cursor = 'pointer';
        }
      } else {
        if (isHovered) {
          isHovered = false;
          mount.style.cursor = 'default';
        }
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);
      if (intersects.length > 0) {
        isActive = !isActive;
        // Escala menor en móvil para no desbordar el contenedor
        const boost = isCoarse ? 1.15 : 1.35;
        targetScale = isActive ? boost : 1.0;
      }
    };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('click', onClick);
    mount.addEventListener('touchstart', (e) => { updateMousePosition(e); onClick(); }, { passive: true });

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          fitCamera(width, height);
          renderer.setSize(width, height, false);
        }
      }
    });
    resizeObserver.observe(mount);

    // --- BUCLE DE ANIMACIÓN ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Rotar más rápido si está el cursor encima
      const rotSpeed = isHovered ? 3.0 : 0.5;
      cube.rotation.y += rotSpeed * delta;
      cube.rotation.x += 0.2 * delta;

      // Escala suavizada (lerp)
      const currentScale = cube.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.1;
      cube.scale.set(newScale, newScale, newScale);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // --- LIMPIEZA ---
    // Vital en Next.js para que no haya fugas de memoria al cambiar de ruta
    return () => {
      resizeObserver.disconnect();
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('click', onClick);
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
  }, []); // El array vacío asegura que esto solo corra al montar el componente

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full max-w-full max-h-full bg-transparent overflow-hidden touch-pan-y" 
      style={{ display: 'block' }}
    />
  );
}
