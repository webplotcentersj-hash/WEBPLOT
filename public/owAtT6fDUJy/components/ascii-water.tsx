"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const ASCII_CHARS = " .,:;|!ilIwWMB#@";
const CELL_WIDTH = 7;
const CELL_HEIGHT = 12;
const DEFAULT_IMAGE = "/images/gradient.png";

interface Cell {
  char: string;
  brightness: number;
  r: number;
  g: number;
  b: number;
}

interface WaterParams {
  waveSpeed: number;
  damping: number;
  rippleStrength: number;
  clickStrength: number;
  refraction: number;
  surfaceTension: number;
  hoverRadius: number;
  clickRadius: number;
  audioVolume: number;
}

const DEFAULT_PARAMS: WaterParams = {
  waveSpeed: 0.4,
  damping: 0.94,
  rippleStrength: 0.15,
  clickStrength: 20,
  refraction: 1.5,
  surfaceTension: 0.92,
  hoverRadius: 3,
  clickRadius: 5,
  audioVolume: 0.5,
};

function createAudioContext() {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  } catch {
    return null;
  }
}

function playDropSound(
  audioCtx: AudioContext,
  intensity: number = 1,
  isClick: boolean = false,
  volume: number = 0.5
) {
  try {
    const now = audioCtx.currentTime;
    const vol = volume * intensity;

    const masterGain = audioCtx.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(audioCtx.destination);

    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(isClick ? 220 : 400, now);
    osc1.frequency.exponentialRampToValueAtTime(
      isClick ? 60 : 120,
      now + (isClick ? 0.4 : 0.15)
    );
    gain1.gain.setValueAtTime(
      Math.min(0.12 * vol, isClick ? 0.18 : 0.08),
      now
    );
    gain1.gain.exponentialRampToValueAtTime(
      0.001,
      now + (isClick ? 0.5 : 0.15)
    );
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + (isClick ? 0.5 : 0.2));

    const bufferSize = audioCtx.sampleRate * (isClick ? 0.3 : 0.08);
    const noiseBuffer = audioCtx.createBuffer(
      1,
      bufferSize,
      audioCtx.sampleRate
    );
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * Math.exp((-i / bufferSize) * 4);
    }
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(isClick ? 0.06 * vol : 0.02 * vol, now);
    noiseGain.gain.exponentialRampToValueAtTime(
      0.001,
      now + (isClick ? 0.3 : 0.08)
    );

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = isClick ? 800 : 2000;
    filter.Q.value = isClick ? 1 : 3;

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start(now);
    noiseSource.stop(now + (isClick ? 0.4 : 0.1));

    if (isClick) {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(600, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.35);
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.08 * vol, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now);
      osc2.stop(now + 0.45);
    }
  } catch {
    // Audio not supported
  }
}

function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{ color: "rgba(0,255,136,0.55)" }}
        >
          {label}
        </span>
        <span
          className="text-[10px] font-mono tabular-nums"
          style={{ color: "rgba(0,255,136,0.4)" }}
        >
          {value.toFixed(step < 0.01 ? 3 : step < 0.1 ? 2 : step < 1 ? 1 : 0)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, rgba(0,255,136,0.4) ${((value - min) / (max - min)) * 100}%, rgba(0,255,136,0.1) ${((value - min) / (max - min)) * 100}%)`,
          accentColor: "#00ff88",
        }}
      />
    </div>
  );
}

export default function AsciiWater() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<Cell[][]>([]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);

  const waveCurrentRef = useRef<Float32Array>(new Float32Array(0));
  const velocityRef = useRef<Float32Array>(new Float32Array(0));

  const mouseRef = useRef({ x: -1, y: -1, prevX: -1, prevY: -1 });
  const mouseDownRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const imageLoadedRef = useRef(false);
  const imageSrcRef = useRef(DEFAULT_IMAGE);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSoundTimeRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const paramsRef = useRef<WaterParams>({ ...DEFAULT_PARAMS });

  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [params, setParams] = useState<WaterParams>({ ...DEFAULT_PARAMS });
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  // Auto-hide hints after first interaction
  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => setHintVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const updateParam = (key: keyof WaterParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const resetParams = () => {
    setParams({ ...DEFAULT_PARAMS });
  };

  // Reset all wave buffers to zero + restore default image
  const resetWaves = useCallback(() => {
    const totalCells = colsRef.current * rowsRef.current;
    waveCurrentRef.current = new Float32Array(totalCells);
    velocityRef.current = new Float32Array(totalCells);
    // Restore default image
    imageSrcRef.current = DEFAULT_IMAGE;
    imageLoadedRef.current = false;
    initFromImage(DEFAULT_IMAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const initFromImage = useCallback((src?: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const cols = Math.floor(width / CELL_WIDTH);
    const rows = Math.floor(height / CELL_HEIGHT);
    colsRef.current = cols;
    rowsRef.current = rows;

    const totalCells = cols * rows;
    waveCurrentRef.current = new Float32Array(totalCells);
    velocityRef.current = new Float32Array(totalCells);

    const imgSrc = src || imageSrcRef.current;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = cols;
      offscreen.height = rows;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const imgAspect = img.width / img.height;
      const gridAspect = cols / rows;

      let sx = 0,
        sy = 0,
        sw = img.width,
        sh = img.height;
      if (imgAspect > gridAspect) {
        sw = img.height * gridAspect;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / gridAspect;
        sy = (img.height - sh) / 2;
      }

      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const imageData = offCtx.getImageData(0, 0, cols, rows);
      const pixels = imageData.data;

      const grid: Cell[][] = [];
      for (let row = 0; row < rows; row++) {
        const rowArr: Cell[] = [];
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const adjustedBrightness = brightness * (a / 255);
          const charIndex = Math.floor(
            adjustedBrightness * (ASCII_CHARS.length - 1)
          );

          rowArr.push({
            char: ASCII_CHARS[charIndex],
            brightness: adjustedBrightness,
            r,
            g,
            b,
          });
        }
        grid.push(rowArr);
      }

      gridRef.current = grid;
      imageLoadedRef.current = true;
    };
    img.src = imgSrc;
  }, []);

  const propagateWaves = useCallback(() => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const current = waveCurrentRef.current;
    const velocity = velocityRef.current;
    const p = paramsRef.current;

    const next = new Float32Array(current.length);
    const THRESHOLD = 0.001;

    for (let row = 1; row < rows - 1; row++) {
      for (let col = 1; col < cols - 1; col++) {
        const idx = row * cols + col;

        const laplacian =
          current[idx - 1] +
          current[idx + 1] +
          current[idx - cols] +
          current[idx + cols] -
          4 * current[idx];

        const acceleration = laplacian * p.waveSpeed;

        let v = (velocity[idx] + acceleration) * p.damping;

        let d = current[idx] + v;

        if (Math.abs(d) > 25) {
          d *= p.surfaceTension;
          v *= p.surfaceTension * 0.9;
        }

        if (Math.abs(v) < THRESHOLD && Math.abs(d) < THRESHOLD) {
          v = 0;
          d = 0;
        }

        velocity[idx] = v;
        next[idx] = d;
      }
    }

    const EDGE_DAMP = 0.3;
    for (let col = 0; col < cols; col++) {
      next[col] *= EDGE_DAMP;
      velocity[col] *= EDGE_DAMP;
      next[(rows - 1) * cols + col] *= EDGE_DAMP;
      velocity[(rows - 1) * cols + col] *= EDGE_DAMP;
    }
    for (let row = 0; row < rows; row++) {
      next[row * cols] *= EDGE_DAMP;
      velocity[row * cols] *= EDGE_DAMP;
      next[row * cols + cols - 1] *= EDGE_DAMP;
      velocity[row * cols + cols - 1] *= EDGE_DAMP;
    }

    waveCurrentRef.current = next;
  }, []);

  const addRipple = useCallback(
    (
      col: number,
      row: number,
      strength: number,
      radius: number,
      ringMode: boolean = false
    ) => {
      const cols = colsRef.current;
      const rows = rowsRef.current;
      const current = waveCurrentRef.current;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const c = col + dx;
          const r = row + dy;
          if (c >= 0 && c < cols && r >= 0 && r < rows) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= radius) {
              const idx = r * cols + c;
              if (ringMode) {
                const normalizedDist = dist / radius;
                const ring =
                  Math.sin(normalizedDist * Math.PI) *
                  Math.exp(-normalizedDist * 0.5);
                current[idx] += strength * ring;
              } else {
                const sigma = radius * 0.4;
                const gaussian = Math.exp(
                  -(dist * dist) / (2 * sigma * sigma)
                );
                current[idx] += strength * gaussian;
              }
            }
          }
        }
      }
    },
    []
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoadedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const grid = gridRef.current;
    const current = waveCurrentRef.current;
    const p = paramsRef.current;

    ctx.fillStyle = "#080c0d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${10 * dpr}px "Geist Mono", "SF Mono", "Fira Code", "Consolas", monospace`;
    ctx.textBaseline = "middle";

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = grid[row]?.[col];
        if (!cell) continue;

        const idx = row * cols + col;
        const wave = current[idx];

        if (Math.abs(wave) < 0.01 && cell.brightness < 0.02 && cell.char === " ")
          continue;

        let gradX = 0;
        let gradY = 0;
        if (col > 0 && col < cols - 1) {
          gradX = current[idx + 1] - current[idx - 1];
        }
        if (row > 0 && row < rows - 1) {
          gradY = current[idx + cols] - current[idx - cols];
        }

        const srcCol = Math.round(col - gradX * p.refraction);
        const srcRow = Math.round(row - gradY * p.refraction);

        let displayCell = cell;
        if (
          srcCol >= 0 &&
          srcCol < cols &&
          srcRow >= 0 &&
          srcRow < rows &&
          grid[srcRow]?.[srcCol]
        ) {
          displayCell = grid[srcRow][srcCol];
        }

        let caustic = 0;
        if (col > 0 && col < cols - 1 && row > 0 && row < rows - 1) {
          const laplacian =
            current[idx - 1] +
            current[idx + 1] +
            current[idx - cols] +
            current[idx + cols] -
            4 * wave;
          caustic = Math.max(0, -laplacian * 0.06);
        }

        const waveIntensity = Math.abs(wave);

        const specular =
          Math.pow(Math.max(0, 1 - Math.abs(gradY + gradX) * 0.03), 8) *
          waveIntensity *
          0.1;

        const brightBoost =
          1 + waveIntensity * 0.03 + caustic * 2.5 + specular;

        const r = Math.min(
          255,
          displayCell.r * brightBoost + caustic * 60 + specular * 180
        );
        const g = Math.min(
          255,
          displayCell.g * brightBoost + caustic * 120 + specular * 220
        );
        const b = Math.min(
          255,
          displayCell.b * brightBoost + caustic * 80 + specular * 150
        );

        const alpha = Math.min(
          1,
          displayCell.brightness * 1.3 +
          waveIntensity * 0.015 +
          caustic * 1.5 +
          specular
        );

        if (alpha < 0.02) continue;

        const combinedBrightness = Math.min(
          1,
          displayCell.brightness + waveIntensity * 0.015 + caustic * 1.2
        );
        const charIdx = Math.floor(
          combinedBrightness * (ASCII_CHARS.length - 1)
        );
        const displayChar = ASCII_CHARS[charIdx] || displayCell.char;

        if (displayChar === " " && alpha < 0.05) continue;

        ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`;

        const drawX = col * CELL_WIDTH * dpr;
        const drawY = (row * CELL_HEIGHT + CELL_HEIGHT * 0.5) * dpr;

        const displaceX = gradX * 0.5 * dpr;
        const displaceY = gradY * 0.35 * dpr;

        ctx.fillText(displayChar, drawX + displaceX, drawY + displaceY);
      }
    }
  }, []);

  const animate = useCallback(() => {
    const mouse = mouseRef.current;
    const p = paramsRef.current;
    const isDown = mouseDownRef.current;

    if (mouse.x >= 0 && mouse.y >= 0) {
      const col = Math.floor(mouse.x / CELL_WIDTH);
      const row = Math.floor(mouse.y / CELL_HEIGHT);

      if (
        col >= 0 &&
        col < colsRef.current &&
        row >= 0 &&
        row < rowsRef.current
      ) {
        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        if (isDown) {
          // Click+drag: much stronger continuous ripples like dragging through water
          const dragStrength = Math.min(speed * p.rippleStrength * 3, 15);
          const radius = p.clickRadius;

          if (dragStrength > 0.2) {
            addRipple(col, row, dragStrength, radius);
          } else {
            // Even when holding still, pulse gently
            addRipple(col, row, p.clickStrength * 0.08, Math.max(2, radius - 1));
          }

          const now = performance.now();
          if (
            audioCtxRef.current &&
            now - lastSoundTimeRef.current > 60 &&
            speed > 2
          ) {
            lastSoundTimeRef.current = now;
            playDropSound(
              audioCtxRef.current,
              Math.min(speed / 15, 0.6),
              true,
              p.audioVolume * 0.4
            );
          }
        } else {
          // Normal hover: gentle ripple
          const strength = Math.min(speed * p.rippleStrength, 6);

          if (strength > 0.3) {
            addRipple(col, row, strength, p.hoverRadius);

            const now = performance.now();
            if (
              audioCtxRef.current &&
              now - lastSoundTimeRef.current > 100 &&
              speed > 4
            ) {
              lastSoundTimeRef.current = now;
              playDropSound(
                audioCtxRef.current,
                Math.min(speed / 25, 0.4),
                false,
                p.audioVolume
              );
            }
          }
        }
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    }

    propagateWaves();
    render();
    animFrameRef.current = requestAnimationFrame(animate);
  }, [propagateWaves, render, addRipple]);

  const handleFileUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        imageSrcRef.current = dataUrl;
        imageLoadedRef.current = false;
        initFromImage(dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [initFromImage]
  );

  useEffect(() => {
    initFromImage();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      if (!hasInteracted) {
        setHasInteracted(true);
        initAudio();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
      mouseRef.current.prevX = -1;
      mouseRef.current.prevY = -1;
      mouseDownRef.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseDownRef.current = true;
      initAudio();
      if (!hasInteracted) setHasInteracted(true);

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / CELL_WIDTH);
      const row = Math.floor(y / CELL_HEIGHT);
      const p = paramsRef.current;

      // Initial raindrop impact
      addRipple(col, row, p.clickStrength, p.clickRadius, false);

      if (audioCtxRef.current) {
        playDropSound(audioCtxRef.current, 1, true, p.audioVolume);
      }

      // Staggered ring ripples for realistic raindrop
      setTimeout(() => {
        addRipple(col, row, -p.clickStrength * 0.4, p.clickRadius + 3, true);
      }, 70);
      setTimeout(() => {
        addRipple(col, row, p.clickStrength * 0.2, p.clickRadius + 7, true);
      }, 160);
      setTimeout(() => {
        addRipple(col, row, -p.clickStrength * 0.1, p.clickRadius + 12, true);
      }, 280);
    };

    const handleMouseUp = () => {
      mouseDownRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
    };

    const handleTouchStart = (e: TouchEvent) => {
      mouseDownRef.current = true;
      initAudio();
      if (!hasInteracted) setHasInteracted(true);
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.prevX = x;
      mouseRef.current.prevY = y;

      const col = Math.floor(x / CELL_WIDTH);
      const row = Math.floor(y / CELL_HEIGHT);
      const p = paramsRef.current;
      addRipple(col, row, p.clickStrength, p.clickRadius, false);

      if (audioCtxRef.current) {
        playDropSound(audioCtxRef.current, 1, true, p.audioVolume);
      }

      setTimeout(
        () =>
          addRipple(
            col,
            row,
            -p.clickStrength * 0.4,
            p.clickRadius + 3,
            true
          ),
        70
      );
      setTimeout(
        () =>
          addRipple(
            col,
            row,
            p.clickStrength * 0.2,
            p.clickRadius + 7,
            true
          ),
        160
      );
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
      mouseRef.current.prevX = -1;
      mouseRef.current.prevY = -1;
      mouseDownRef.current = false;
    };

    const handleResize = () => {
      initFromImage();
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFileUpload(file);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("dragover", handleDragOver);
    canvas.addEventListener("dragleave", handleDragLeave);
    canvas.addEventListener("drop", handleDrop);
    window.addEventListener("resize", handleResize);

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("dragover", handleDragOver);
      canvas.removeEventListener("dragleave", handleDragLeave);
      canvas.removeEventListener("drop", handleDrop);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    initFromImage,
    animate,
    addRipple,
    handleFileUpload,
    initAudio,
    hasInteracted,
  ]);

  const btnBase: React.CSSProperties = {
    borderColor: "rgba(0, 255, 136, 0.2)",
    background: "rgba(0, 20, 12, 0.6)",
    color: "rgba(0, 255, 136, 0.5)",
    backdropFilter: "blur(4px)",
  };

  const btnHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.5)";
    e.currentTarget.style.color = "rgba(0, 255, 136, 0.9)";
    e.currentTarget.style.background = "rgba(0, 30, 18, 0.8)";
  };

  const btnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.2)";
    e.currentTarget.style.color = "rgba(0, 255, 136, 0.5)";
    e.currentTarget.style.background = "rgba(0, 20, 12, 0.6)";
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "#080c0d" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-crosshair"
      />

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="rounded-2xl border-2 border-dashed px-12 py-8"
            style={{
              borderColor: "rgba(0, 255, 136, 0.5)",
              background: "rgba(0, 20, 12, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="text-lg font-mono tracking-wider"
              style={{ color: "rgba(0, 255, 136, 0.8)" }}
            >
              DROP IMAGE
            </p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />

      {/* Top bar */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
        {/* Reset -- zeroes waves + restores default image */}
        <button
          onClick={resetWaves}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer"
          style={btnBase}
          onMouseEnter={btnHover}
          onMouseLeave={btnLeave}
          title="Reset waves and restore default image"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Reset
        </button>

        {/* Image upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer"
          style={btnBase}
          onMouseEnter={btnHover}
          onMouseLeave={btnLeave}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Image
        </button>

        {/* Controls toggle */}
        <button
          onClick={() => setShowControls((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer"
          style={{
            ...btnBase,
            borderColor: showControls
              ? "rgba(0, 255, 136, 0.5)"
              : btnBase.borderColor,
            background: showControls
              ? "rgba(0, 30, 18, 0.8)"
              : (btnBase.background as string),
            color: showControls ? "rgba(0, 255, 136, 0.9)" : btnBase.color,
          }}
          onMouseEnter={btnHover}
          onMouseLeave={(e) => {
            if (!showControls) btnLeave(e);
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          Controls
        </button>
      </div>

      {/* Controls panel */}
      {showControls && (
        <div
          className="absolute top-16 right-5 z-10 w-64 rounded-xl border p-4 flex flex-col gap-3"
          style={{
            borderColor: "rgba(0, 255, 136, 0.15)",
            background: "rgba(0, 12, 8, 0.92)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-mono uppercase tracking-widest font-semibold"
              style={{ color: "rgba(0, 255, 136, 0.7)" }}
            >
              Water Physics
            </span>
            <button
              onClick={resetParams}
              className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border transition-all duration-200 cursor-pointer"
              style={{
                borderColor: "rgba(0, 255, 136, 0.2)",
                color: "rgba(0, 255, 136, 0.4)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.5)";
                e.currentTarget.style.color = "rgba(0, 255, 136, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.2)";
                e.currentTarget.style.color = "rgba(0, 255, 136, 0.4)";
              }}
            >
              Defaults
            </button>
          </div>

          <div
            className="w-full h-px"
            style={{ background: "rgba(0, 255, 136, 0.1)" }}
          />

          <ParamSlider
            label="Wave Speed"
            value={params.waveSpeed}
            min={0.1}
            max={0.6}
            step={0.01}
            onChange={(v) => updateParam("waveSpeed", v)}
          />
          <ParamSlider
            label="Damping"
            value={params.damping}
            min={0.85}
            max={0.99}
            step={0.005}
            onChange={(v) => updateParam("damping", v)}
          />
          <ParamSlider
            label="Hover Strength"
            value={params.rippleStrength}
            min={0.02}
            max={0.5}
            step={0.01}
            onChange={(v) => updateParam("rippleStrength", v)}
          />
          <ParamSlider
            label="Click Strength"
            value={params.clickStrength}
            min={3}
            max={50}
            step={1}
            onChange={(v) => updateParam("clickStrength", v)}
          />
          <ParamSlider
            label="Refraction"
            value={params.refraction}
            min={0}
            max={4}
            step={0.1}
            onChange={(v) => updateParam("refraction", v)}
          />
          <ParamSlider
            label="Surface Tension"
            value={params.surfaceTension}
            min={0.8}
            max={1}
            step={0.005}
            onChange={(v) => updateParam("surfaceTension", v)}
          />
          <ParamSlider
            label="Hover Radius"
            value={params.hoverRadius}
            min={1}
            max={10}
            step={1}
            onChange={(v) => updateParam("hoverRadius", v)}
          />
          <ParamSlider
            label="Click Radius"
            value={params.clickRadius}
            min={2}
            max={16}
            step={1}
            onChange={(v) => updateParam("clickRadius", v)}
          />

          <div
            className="w-full h-px"
            style={{ background: "rgba(0, 255, 136, 0.1)" }}
          />

          <ParamSlider
            label="Sound Volume"
            value={params.audioVolume}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => updateParam("audioVolume", v)}
          />
        </div>
      )}

      {/* Bottom hints -- more visible with background pill, fades after interaction */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none select-none transition-opacity duration-1000"
        style={{ opacity: hintVisible ? 1 : 0 }}
      >
        <div
          className="flex items-center gap-3 rounded-full px-6 py-3 border"
          style={{
            background: "rgba(0, 12, 8, 0.75)",
            borderColor: "rgba(0, 255, 136, 0.15)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "rgba(0, 255, 136, 0.6)" }}
          >
            hover to ripple
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: "rgba(0, 255, 136, 0.2)" }}
          >
            /
          </span>
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "rgba(0, 255, 136, 0.6)" }}
          >
            click to splash
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: "rgba(0, 255, 136, 0.2)" }}
          >
            /
          </span>
          <span
            className="text-xs font-mono tracking-widest uppercase font-semibold"
            style={{ color: "rgba(0, 255, 136, 0.8)" }}
          >
            hold + drag
          </span>
        </div>
      </div>
    </div>
  );
}
