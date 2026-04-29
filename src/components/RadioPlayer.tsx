"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RADIO_TRACKS, pickRandom, type Track } from "@/data/tracks";

export default function RadioPlayer() {
  const [open, setOpen] = useState(false);
  const [trackIndex, setTrackIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track: Track | null =
    trackIndex !== null ? RADIO_TRACKS[trackIndex] ?? null : null;

  useEffect(() => {
    if (!track) return;
    const a = audioRef.current;
    if (!a) return;
    a.src = track.src;
    a.load();
    if (playing) a.play().catch(() => setPlaying(false));
  }, [trackIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing]);

  const onTime = () => {
    const a = audioRef.current;
    if (!a) return;
    setProgress(a.currentTime);
    setDuration(a.duration || 0);
  };

  const handleRandom = () => {
    const next = pickRandom(trackIndex ?? undefined);
    if (next < 0) return;
    setTrackIndex(next);
    setPlaying(true);
  };

  const handleToggle = () => {
    if (trackIndex === null) {
      handleRandom();
      return;
    }
    setPlaying((p) => !p);
  };

  const handleNext = () => {
    const next = pickRandom(trackIndex ?? undefined);
    if (next < 0) return;
    setTrackIndex(next);
    setPlaying(true);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - r.left) / r.width;
    a.currentTime = Math.max(0, Math.min(1, ratio)) * duration;
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={onTime}
        onLoadedMetadata={onTime}
        onEnded={handleNext}
        preload="none"
      />

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-3 md:bottom-4 inset-x-0 z-40 px-3 md:px-4 pointer-events-none"
      >
        <div className="max-w-[1600px] mx-auto pointer-events-auto">
          <motion.div
            layout
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card shadow-[0_8px_32px_rgba(10,10,10,0.10)]"
          >
            {/* COMPACT BAR */}
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
              <button
                onClick={handleToggle}
                aria-label={playing ? "შეჩერება" : "დაკვრა"}
                className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink text-paper flex items-center justify-center transition hover:scale-[1.04] active:scale-95"
              >
                {playing ? (
                  <span className="flex gap-[3px]">
                    <span className="block w-[3px] h-4 bg-paper" />
                    <span className="block w-[3px] h-4 bg-paper" />
                  </span>
                ) : (
                  <span className="block w-0 h-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-paper translate-x-[1px]" />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 label text-ink-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="truncate">რადიო · ფოლკი</span>
                </div>
                <div className="font-display text-lg md:text-2xl truncate leading-tight mt-1">
                  {track ? track.title : "შემთხვევითი სიმღერა"}
                </div>
                <div className="label text-ink-500 truncate mt-0.5 hidden sm:block">
                  {track ? `${track.artist} · ${track.region}` : "დააჭირე დაკვრას"}
                </div>
              </div>

              <button
                onClick={handleRandom}
                className="shrink-0 btn !px-3 md:!px-4"
                title="შემთხვევითი"
                aria-label="შემთხვევითი"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                >
                  <path d="M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M17 4l3 3-3 3M17 14l3 3-3 3" />
                </svg>
                <span className="hidden md:inline">შემთხვევითი</span>
              </button>

              <button
                onClick={() => setOpen((o) => !o)}
                className="shrink-0 w-11 h-11 border border-ink/30 flex items-center justify-center hover:border-ink transition"
                aria-label={open ? "ჩაკეცვა" : "გახსნა"}
              >
                <motion.svg
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>
            </div>

            {/* Mobile second-line */}
            {track && (
              <div className="sm:hidden px-3 pb-3 -mt-1 flex items-center justify-between label text-ink-500 gap-2">
                <span className="truncate">{track.artist} · {track.region}</span>
                <span className="tabular-nums shrink-0">
                  {fmt(progress)} / {fmt(duration)}
                </span>
              </div>
            )}

            {/* EXPANDED PANEL */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden border-t border-ink/10"
                >
                  <div className="px-4 md:px-6 py-5">
                    <div>
                      <div className="hidden sm:flex items-center justify-between label text-ink-500 mb-2">
                        <span>{track?.region ?? "—"}</span>
                        <span className="tabular-nums">
                          {fmt(progress)} / {fmt(duration)}
                        </span>
                      </div>
                      <div
                        onClick={seek}
                        className="relative h-1.5 bg-ink/15 cursor-pointer group"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-ink"
                          style={{
                            width: duration ? `${(progress / duration) * 100}%` : "0%",
                          }}
                        />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ink opacity-0 group-hover:opacity-100 transition"
                          style={{
                            left: duration
                              ? `calc(${(progress / duration) * 100}% - 6px)`
                              : "-6px",
                          }}
                        />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {track && (
                          <Link
                            href={`/region/${track.regionSlug}`}
                            onClick={() => setOpen(false)}
                            className="btn btn-solid"
                          >
                            ისტორიის წაკითხვა
                          </Link>
                        )}
                        <button onClick={handleNext} className="btn">
                          შემდეგი
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
