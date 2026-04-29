"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeorgiaMap from "@/components/GeorgiaMap";
import CharactersBrowser from "@/components/CharactersBrowser";
import { REGIONS } from "@/data/regions";
import Link from "next/link";

type View = "map" | "characters";

export default function ExploreSection() {
  const [view, setView] = useState<View>("map");

  return (
    <section id="map" className="relative px-6 py-24 md:py-32 hairline-b">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <div className="label text-ink-500 mb-4">02 — გამოიკვლიე</div>
            <h2 className="headline text-5xl md:text-7xl">
              {view === "map" ? (
                <>
                  შეარჩიე<br />რეგიონი
                </>
              ) : (
                <>
                  ხალხური<br />გმირები
                </>
              )}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 self-end flex flex-col gap-6">
            <p className="text-base md:text-lg text-ink-700 max-w-md font-light leading-relaxed">
              {view === "map" ? (
                <>
                  თითოეული რეგიონი — ცალკე სამყარო. ხმები, ლეგენდები, გმირები.
                  ახლა აქტიურია{" "}
                  <strong className="font-medium text-ink">გურია და კახეთი</strong>.
                </>
              ) : (
                <>
                  ხალხური გმირები — ყაჩაღ-რაინდები, მომღერლები და ლეგენდები
                  საქართველოს რეგიონებიდან.
                </>
              )}
            </p>

            {/* View switcher */}
            <div className="inline-flex border border-ink self-start">
              {([
                ["map", "რუკა"],
                ["characters", "გმირები"],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`px-5 py-2 label transition ${
                    view === key ? "bg-ink text-paper" : "hover:bg-paper-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <GeorgiaMap />
              <div className="mt-10 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <Link
                    key={r.id}
                    href={r.available ? `/region/${r.slug}` : "#map"}
                    className={`tag ${
                      r.available
                        ? "is-active hover:bg-paper hover:text-ink hover:border-ink transition"
                        : "text-ink-500"
                    }`}
                  >
                    {r.nameKa}
                    {r.available && <span className="ml-2">→</span>}
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chars"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <CharactersBrowser />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
