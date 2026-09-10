"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { TubesCursor } from "@/components/ui/tube-cursor";
import { shouldEnableHeavyEffects } from "@/lib/webgl-perf";

const TUBE_COLORS = ["#E52F2A", "#F39519", "#2F65AE"];
const LIGHT_COLORS = ["#FCDC32", "#E84B93", "#00A0C6", "#624A97"];

export default function CursorWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);
  const [tubesGone, setTubesGone] = useState(false);
  const [enableTubes, setEnableTubes] = useState(false);
  const galleryHide = useMotionValue(1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.14, 0.97, 1.0],
    [0, 1, 1, 0]
  );

  const opacity = useTransform(
    [scrollOpacity, galleryHide],
    ([scroll, hide]: number[]) => scroll * hide
  );

  useEffect(() => {
    setEnableTubes(shouldEnableHeavyEffects());
  }, []);

  useEffect(() => {
    if (!enableTubes) return;
    const gallery = document.getElementById("animated-gallery");
    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (dismissedRef.current) return;
        if (!entry.isIntersecting || entry.intersectionRatio < 0.12) return;

        dismissedRef.current = true;
        observer.disconnect();

        animate(galleryHide, 0, {
          duration: 0.9,
          ease: "easeInOut",
        }).then(() => {
          setTubesGone(true);
        });
      },
      { threshold: [0, 0.12, 0.25] }
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, [galleryHide, enableTubes]);

  return (
    <div ref={containerRef} className="relative">
      {enableTubes && !tubesGone && (
        <motion.div 
          className="fixed inset-0 z-50 pointer-events-none mix-blend-multiply"
          style={{ opacity }}
        >
          <TubesCursor 
            title="" 
            subtitle="" 
            caption="" 
            initialColors={TUBE_COLORS}
            lightColors={LIGHT_COLORS}
            lightIntensity={140}
            enableRandomizeOnClick={false}
            className="pointer-events-none"
          />
        </motion.div>
      )}
      {children}
    </div>
  );
}
