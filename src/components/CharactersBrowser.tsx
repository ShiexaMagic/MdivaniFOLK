"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHARACTERS } from "@/data/characters";

const REGION_FILTERS = [
  "ყველა",
  "გურია",
  "კახეთი",
  "ქართლი",
  "აფხაზეთი",
  "თუშეთი",
];

export default function CharactersBrowser() {
  const [filter, setFilter] = useState<string>("ყველა");
  const [sort, setSort] = useState<"name" | "region">("name");

  const list = useMemo(() => {
    let l = [...CHARACTERS];
    if (filter !== "ყველა") {
      l = l.filter((c) => c.region.includes(filter));
    }
    if (sort === "name") {
      l.sort((a, b) => a.name.localeCompare(b.name, "ka"));
    } else if (sort === "region") {
      l.sort((a, b) => a.region.localeCompare(b.region, "ka"));
    }
    return l;
  }, [filter, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {REGION_FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`tag ${filter === r ? "is-active" : "hover:border-ink"}`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 label text-ink-500">
          <span>დალაგება</span>
          <div className="flex border border-ink/20">
            {([
              ["name", "სახელით"],
              ["region", "რეგიონით"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`px-3 py-1.5 text-[10px] tracking-wide2 uppercase transition ${
                  sort === key ? "bg-ink text-paper" : "hover:bg-paper-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="hairline">
        <AnimatePresence mode="popLayout">
          {list.map((c, i) => {
            const Inner = (
              <article className="grid grid-cols-12 gap-4 md:gap-8 items-center py-6 md:py-8 group">
                <div className="col-span-1 label text-ink-500">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-7 md:col-span-5">
                  <h3 className="font-display text-2xl md:text-4xl leading-tight">
                    {c.name}
                  </h3>
                  {c.epithet && (
                    <p className="mt-1 text-sm md:text-base text-ink-500 font-light">
                      {c.epithet}
                    </p>
                  )}
                </div>
                <div className="hidden md:block col-span-3 label text-ink-700">
                  {c.region}
                </div>
                <div className="col-span-3 md:col-span-2 flex md:justify-end items-center gap-2">
                  {!c.available && (
                    <span className="tag text-ink-500">მალე</span>
                  )}
                </div>
                <div className="col-span-1 flex justify-end">
                  <span
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
                      c.available
                        ? "border-ink group-hover:bg-ink group-hover:text-paper"
                        : "border-ink/30 text-ink-500"
                    }`}
                  >
                    →
                  </span>
                </div>
              </article>
            );

            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="hairline-b"
              >
                {c.available ? (
                  <Link href={`/region/${c.regionSlug}`} className="block">
                    {Inner}
                  </Link>
                ) : (
                  <div className="cursor-not-allowed opacity-90">{Inner}</div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <div className="py-20 text-center text-ink-500 font-light">
          ამ ფილტრით გმირები ვერ მოიძებნა.
        </div>
      )}
    </div>
  );
}
