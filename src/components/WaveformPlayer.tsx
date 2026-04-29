"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";

type Props = {
  src: string;
  title: string;
  subtitle?: string;
  /** Number of bars to render in the waveform */
  bars?: number;
};

// Deterministic pseudo-random heights so SSR/CSR match
function genHeights(n: number, seed = 7) {
  const arr: number[] = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    // shape: gentle envelope * noise so it looks like a song
    const env = 0.45 + 0.55 * Math.sin((i / n) * Math.PI);
    arr.push(0.18 + r * 0.82 * env);
  }
  return arr;
}

export default function WaveformPlayer({
  src,
  title,
  subtitle,
  bars = 96,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [heights] = useState(() => genHeights(bars));

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing]);

  useAnimationFrame(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.currentTime !== progress) setProgress(a.currentTime);
    if (a.duration && a.duration !== duration) setDuration(a.duration);
  });

  const ratio = duration ? progress / duration : 0;

  const seek = (clientX: number, el: HTMLDivElement) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const r = el.getBoundingClientRect();
    const r2 = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    a.currentTime = r2 * duration;
    setProgress(a.currentTime);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-paper-50 border border-ink/10 p-5 md:p-7">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
      />

      {/* Top: play + title */}
      <div className="flex items-center gap-4 md:gap-5">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "შეჩერება" : "დაკვრა"}
          className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-ink text-paper flex items-center justify-center transition hover:scale-[1.04] active:scale-95"
        >
          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.span
                key="pause"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="flex gap-[4px]"
              >
                <span className="block w-[4px] h-4 md:h-5 bg-paper" />
                <span className="block w-[4px] h-4 md:h-5 bg-paper" />
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="block w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-paper translate-x-[2px]"
              />
            )}
          </AnimatePresence>
        </button>
        <div className="min-w-0 flex-1">
          <div className="font-display text-xl md:text-3xl truncate leading-tight">
            {title}
          </div>
          {subtitle && (
            <div className="label text-ink-500 mt-1 truncate">{subtitle}</div>
          )}
        </div>
        <div className="hidden sm:block label text-ink-500 tabular-nums shrink-0">
          {fmt(progress)} / {fmt(duration)}
        </div>
      </div>

      {/* Waveform */}
      <div
        className="mt-6 h-20 md:h-24 cursor-pointer select-none"
        onClick={(e) => seek(e.clientX, e.currentTarget)}
      >
        <div className="flex items-end justify-between gap-[2px] h-full">
          {heights.map((h, i) => {
            const filled = i / heights.length < ratio;
            return (
              <span
                key={i}
                className={`flex-1 rounded-[1px] transition-colors duration-200 ${
                  filled ? "bg-ink" : "bg-ink/25"
                }`}
                style={{ height: `${h * 100}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom row: time on mobile + tags */}
      <div className="mt-4 flex items-center justify-between gap-3 sm:hidden label text-ink-500 tabular-nums">
        <span>{fmt(progress)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}
