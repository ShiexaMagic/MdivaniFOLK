"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GEORGIA_PATHS, GEORGIA_VIEWBOX } from "@/data/georgia-paths";
import { REGION_BY_ID } from "@/data/regions";

// Compute approximate centroid by sampling first M,L coordinates of path d
function approxCenter(d: string): { x: number; y: number } {
  const nums = d.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  let sx = 0, sy = 0, n = 0;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    sx += nums[i];
    sy += nums[i + 1];
    n++;
    if (n > 80) break;
  }
  return n ? { x: sx / n, y: sy / n } : { x: 0, y: 0 };
}

export default function GeorgiaMap() {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const enter = (id: string) => () => setHover(id);
  const leave = () => setHover(null);
  const move = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const hoveredRegion = hover ? REGION_BY_ID[hover] : null;

  return (
    <div className="relative w-full" onMouseMove={move}>
      <svg
        viewBox={GEORGIA_VIEWBOX}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {GEORGIA_PATHS.map((p, i) => {
          const region = REGION_BY_ID[p.id];
          const available = region?.available;
          return (
            <motion.path
              key={p.id}
              d={p.d}
              className={`region-path ${available ? "available" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={enter(p.id)}
              onMouseLeave={leave}
              onClick={() => available && router.push(`/region/${region!.slug}`)}
            >
              <title>{region?.nameKa ?? p.title}</title>
            </motion.path>
          );
        })}

        {/* Markers for available regions */}
        {GEORGIA_PATHS.map((p) => {
          const region = REGION_BY_ID[p.id];
          if (!region?.available) return null;
          const c = approxCenter(p.d);
          return (
            <g key={`m-${p.id}`} onClick={() => router.push(`/region/${region.slug}`)} style={{ cursor: "pointer" }}>
              <circle cx={c.x} cy={c.y} r={1.5} className="marker-dot" />
              <circle cx={c.x} cy={c.y} r={1.5} className="marker-ring" />
            </g>
          );
        })}
      </svg>

      {/* Floating label card */}
      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            key={hoveredRegion.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute glass-card px-4 py-3 min-w-[180px]"
            style={{
              left: pos.x + 18,
              top: pos.y + 18,
              transform: "translateZ(0)",
            }}
          >
            <div className="label-sm text-ink-500 mb-1">
              {hoveredRegion.available ? "აქტიური" : "მალე"}
            </div>
            <div className="font-display text-lg leading-tight">
              {hoveredRegion.nameKa}
            </div>
            {hoveredRegion.shortKa && (
              <div className="text-xs text-ink-500 mt-1">
                {hoveredRegion.shortKa}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
