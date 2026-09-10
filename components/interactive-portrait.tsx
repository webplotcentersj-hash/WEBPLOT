// interactive-portrait.tsx

"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function InteractivePortrait() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number>()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-5deg", "5deg"])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const gu = {
      time: { value: 0 },
      dTime: { value: 0 },
      aspect: { value: width / height },
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    class Blob {
      renderer: THREE.WebGLRenderer
      fbTexture: { value: THREE.FramebufferTexture }
      rtOutput: THREE.WebGLRenderTarget
      uniforms: {
        pointer: { value: THREE.Vector2 }
        pointerDown: { value: number }
        pointerRadius: { value: number }
        pointerDuration: { value: number }
      }
      rtScene: THREE.Mesh
      rtCamera: THREE.Camera

      constructor(renderer: THREE.WebGLRenderer) {
        this.renderer = renderer
        this.fbTexture = { value: new THREE.FramebufferTexture(width, height) }
        this.rtOutput = new THREE.WebGLRenderTarget(width, height)
        this.uniforms = {
          pointer: { value: new THREE.Vector2().setScalar(10) },
          pointerDown: { value: 1 },
          pointerRadius: { value: 0.38 },
          pointerDuration: { value: 1.6 },
        }

        const handleMouseMove = (event: MouseEvent) => {
          const rect = container.getBoundingClientRect()
          const x = (event.clientX - rect.left) / width
          const y = (event.clientY - rect.top) / height
          this.uniforms.pointer.value.x = x * 2 - 1
          this.uniforms.pointer.value.y = -y * 2 + 1
          
          mouseX.set(x - 0.5)
          mouseY.set(y - 0.5)
        }

        const handleMouseLeave = () => {
          this.uniforms.pointer.value.setScalar(10)
          mouseX.set(0)
          mouseY.set(0)
        }

        container.addEventListener("mousemove", handleMouseMove)
        container.addEventListener("mouseleave", handleMouseLeave)

        this.rtScene = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            onBeforeCompile: (shader) => {
              shader.uniforms.dTime = gu.dTime
              shader.uniforms.aspect = gu.aspect
              shader.uniforms.pointer = this.uniforms.pointer
              shader.uniforms.pointerDown = this.uniforms.pointerDown
              shader.uniforms.pointerRadius = this.uniforms.pointerRadius
              shader.uniforms.pointerDuration = this.uniforms.pointerDuration
              shader.uniforms.fbTexture = this.fbTexture
              shader.uniforms.time = gu.time
              shader.fragmentShader = `
                uniform float dTime, aspect, pointerDown, pointerRadius, pointerDuration, time;
                uniform vec2 pointer;
                uniform sampler2D fbTexture;
                float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
                float noise(vec2 p) {
                  vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
                  float a = hash(i); float b = hash(i + vec2(1.,0.)); float c = hash(i + vec2(0.,1.)); float d = hash(i + vec2(1.,1.));
                  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
                }
                ${shader.fragmentShader}
              `.replace(
                `#include <color_fragment>`,
                `#include <color_fragment>
                float rVal = texture2D(fbTexture, vUv).r;
                // Se limpia rápido y por completo
                rVal -= clamp(dTime / pointerDuration, 0., 0.08);
                if (rVal < 0.02) rVal = 0.;
                rVal = clamp(rVal, 0., 1.);
                float f = 0.;
                if (pointerDown > 0.5 && pointer.x < 5.) {
                  vec2 uv = (vUv - 0.5) * 2. * vec2(aspect, 1.);
                  vec2 mouse = pointer * vec2(aspect, 1.);
                  vec2 toMouse = uv - mouse;
                  float angle = atan(toMouse.y, toMouse.x);
                  float dist = length(toMouse);
                  float noiseVal = noise(vec2(angle*2.5 + time*0.4, dist*4.));
                  float noiseVal2 = noise(vec2(angle*4. - time*0.25, dist*2.5 + time*0.5));
                  float radiusVariation = 0.8 + noiseVal*0.35 + noiseVal2*0.2;
                  float organicRadius = pointerRadius * radiusVariation;
                  f = 1. - smoothstep(organicRadius*0.12, organicRadius*1.2, dist);
                  f = pow(max(f, 0.), 1.4);
                }

                rVal += f * 0.28;
                rVal = clamp(rVal, 0., 1.);
                diffuseColor.rgb = vec3(rVal);
                `,
              )
            },
          }),
        )
        this.rtScene.material.defines = { USE_UV: "" }
        this.rtCamera = new THREE.Camera()
      }

      render() {
        this.renderer.setRenderTarget(this.rtOutput)
        this.renderer.render(this.rtScene, this.rtCamera)
        this.renderer.copyFramebufferToTexture(this.fbTexture.value)
        this.renderer.setRenderTarget(null)
      }
    }

    const blob = new Blob(renderer)

    const textureLoader = new THREE.TextureLoader()
    let baseImage!: THREE.Mesh

    const baseTexture = textureLoader.load("/hero-portrait.jpeg", (texture) => {
      const img = texture.image
      const imgAspect = img.width / img.height
      const containerAspect = width / height
      let planeWidth, planeHeight
      if (imgAspect > containerAspect) {
        planeHeight = height
        planeWidth = height * imgAspect
      } else {
        planeWidth = width
        planeHeight = width / imgAspect
      }
      baseImage.geometry.dispose()
      baseImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
    })

    baseTexture.colorSpace = THREE.SRGBColorSpace

    const shaderUniforms = {
      progress: { value: 0 },
    }

    // Solo aclarado limpio con el mouse; al salir se borra todo
    const baseImageMaterial = new THREE.MeshBasicMaterial({
      map: baseTexture,
      transparent: true,
      alphaTest: 0.0,
    })
    baseImageMaterial.defines = { USE_UV: "" }

    baseImageMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.texBlob = { value: blob.rtOutput.texture }

      let vertexShader = shader.vertexShader
      vertexShader = vertexShader.replace("void main() {", "varying vec4 vPosProj;\nvoid main() {")
      vertexShader = vertexShader.replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvPosProj = gl_Position;",
      )
      shader.vertexShader = vertexShader

      shader.fragmentShader = `
        uniform sampler2D texBlob;
        varying vec4 vPosProj;
        ${shader.fragmentShader}
      `.replace(
        `#include <map_fragment>`,
        `
        #include <map_fragment>

        vec2 blobUV = ((vPosProj.xy / vPosProj.w) + 1.0) * 0.5;
        float blobRaw = texture2D(texBlob, blobUV).r;

        // Sin residuo: debajo del umbral = foto original exacta
        if (blobRaw > 0.02) {
          float blobMask = smoothstep(0.02, 0.55, blobRaw);
          vec3 photo = diffuseColor.rgb;
          vec3 bright = photo * 1.45 + vec3(0.06);
          diffuseColor.rgb = mix(photo, clamp(bright, 0.0, 1.2), blobMask);
        }
        `,
      )
    }

    baseImage = new THREE.Mesh(new THREE.PlaneGeometry(width, height), baseImageMaterial)
    scene.add(baseImage)
    baseImage.position.z = 0.0

    const clock = new THREE.Clock()
    let t = 0

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      if (window.scrollY > window.innerHeight * 1.7) return
      const dt = clock.getDelta()
      t += dt
      gu.time.value = t
      gu.dTime.value = dt
      const scrollY = window.scrollY
      const maxScroll = window.innerHeight * 0.35
      shaderUniforms.progress.value = Math.min(Math.max(scrollY / maxScroll, 0), 1)

      blob.render()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.left = newWidth / -2
      camera.right = newWidth / 2
      camera.top = newHeight / 2
      camera.bottom = newHeight / -2
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
      gu.aspect.value = newWidth / newHeight
      if (baseTexture.image) {
        const img = baseTexture.image
        const imgAspect = img.width / img.height
        const containerAspect = newWidth / newHeight
        let planeWidth, planeHeight
        if (imgAspect > containerAspect) {
          planeHeight = newHeight
          planeWidth = newHeight * imgAspect
        } else {
          planeWidth = newWidth
          planeHeight = newWidth / imgAspect
        }
        baseImage.geometry.dispose()
        baseImage.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })
      baseTexture.dispose()
      blob.rtOutput.dispose()
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full bg-white overflow-hidden">
      <div className="absolute w-[2px] h-[120%] bg-gradient-to-b from-transparent via-[#E84B93]/40 to-transparent left-[20%] -top-[10%] pointer-events-none" />
      <div className="absolute w-[1px] h-[120%] bg-gradient-to-b from-transparent via-[#00A0C6]/35 to-transparent right-[30%] -top-[10%] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(26,30,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(26,30,56,0.35) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          backgroundPosition: "center center"
      }} />

      <motion.div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ 
          touchAction: "pan-y",
          rotateX,
          rotateY,
          scale: 1,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
      />
    </div>
  )
}
