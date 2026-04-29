"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import ExploreSection from "@/components/ExploreSection";
import { Reveal } from "@/components/Reveal";
import { SISONA } from "@/data/sisona";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Nav />

      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative min-h-[100vh] flex flex-col">
        {/* Top meta bar */}
        <div className="pt-20 px-6">
          <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2 label text-ink-500">
            <span>თბილისი · 04:24</span>
            <span className="hidden md:inline">საქართველო · 12 რეგიონი</span>
            <span>2026 / პილოტი</span>
          </div>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="flex-1 flex flex-col justify-center px-6 py-16"
        >
          <div className="max-w-[1600px] mx-auto w-full">
            <div className="label text-ink-500 mb-8">N°01 — გურია</div>
            <h1 className="headline text-[clamp(3rem,13vw,12rem)] text-ink text-balance">
              ხალხური<br />
              ხმები<span className="text-ink-500">.</span>
            </h1>
            <div className="mt-12 grid md:grid-cols-12 gap-6 items-end">
              <p className="md:col-span-6 text-lg md:text-xl text-ink-700 max-w-xl leading-relaxed font-light">
                ინტერაქტიული რუკა, სადაც ცხოვრობს საქართველოს ხალხური მუსიკა,
                ისტორიები და მხატვრული გმირები. დაიწყე გურიიდან.
              </p>
              <div className="md:col-span-6 flex md:justify-end gap-3 flex-wrap">
                <Link href="/region/guria" className="btn btn-solid">
                  → გურიაში შესვლა
                </Link>
                <a href="#map" className="btn">რუკის ნახვა</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <div className="pb-8 px-6">
          <div className="max-w-[1600px] mx-auto label text-ink-500 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-ink-500" />
            გადაახვიე
          </div>
        </div>
      </section>

      {/* ==================== NOW PLAYING STRIP ==================== */}
      <section className="hairline-b hairline px-6 py-3 bg-paper-50">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center gap-x-4 gap-y-1 label text-ink-700">
          <span className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            ახლა უკრავს
          </span>
          <span className="text-ink-500 truncate">სისონა დარჩია — გურული ხალხური</span>
          <span className="ml-auto shrink-0 hidden md:inline text-ink-500">გურია · GE-GU</span>
        </div>
      </section>

      {/* ==================== EXPLORE (Map / Characters) ==================== */}
      <ExploreSection />

      {/* ==================== FEATURED CHARACTER ==================== */}
      <section className="px-6 py-24 md:py-40 hairline-b">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <Reveal className="md:col-span-7">
              <div className="label text-ink-500 mb-4">03 — გმირი</div>
              <h2 className="headline text-5xl md:text-8xl text-balance">
                სისონა<br />დარჩია
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="tag">გურია</span>
                <span className="tag">XIX–XX ს.</span>
                <span className="tag">პოლიფონია</span>
              </div>
              <p className="mt-10 text-lg md:text-xl text-ink-700 max-w-xl font-light leading-relaxed">
                {SISONA.shortBio}
              </p>
              <div className="mt-10 flex gap-3">
                <Link href="/region/guria" className="btn btn-solid">
                  → სრული პროფილი
                </Link>
                <Link href="/region/guria#music" className="btn">
                  ♪ სიმღერები
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-5">
              <Link href="/region/guria" className="group block relative aspect-[4/5] overflow-hidden bg-ink-300">
                <Image
                  src={SISONA.portrait}
                  alt={SISONA.name}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  style={{ filter: "grayscale(0.15) contrast(1.05)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <div className="label text-paper/80">პროფილი 01</div>
                    <div className="font-display text-paper text-2xl mt-1">გურია</div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-paper/60 text-paper flex items-center justify-center text-sm transition-transform group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== MARQUEE ==================== */}
      <section className="hairline-b py-8 overflow-hidden">
        <div className="marquee-track gap-12 label text-ink-500 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {[
                "გურული პოლიფონია",
                "კრიმანჭული",
                "ნადური",
                "ხორუმი",
                "ნანა",
                "მრავალჟამიერ",
                "ჩვენი ხმა",
                "სამი ხმა · სამი თაობა",
                "ფოლკი / FOLK",
              ].map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-12 shrink-0">
                  <span>{t}</span>
                  <span className="text-ink-300">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="px-6 py-24 md:py-40 hairline-b">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="label text-ink-500 mb-4">04 — პროექტი</div>
            <h2 className="headline text-5xl md:text-7xl">
              რატომ<br />ფოლკი?
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg md:text-xl text-ink-700 font-light leading-relaxed">
            <p>
              ფოლკი არის ცოცხალი არქივი — ადგილი, სადაც საქართველოს რეგიონების
              ხმები, ისტორიები და გმირები ერთ ინტერაქტიულ სივრცეში ხვდებიან.
            </p>
            <p className="text-ink-500">
              პილოტი მიეძღვნება სისონა დარჩიას — გურული ხალხური სიმღერის
              ლეგენდარულ შემსრულებელს. შემდეგ რეგიონებს ეტაპობრივად დავამატებთ.
            </p>
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div>
                <div className="label text-ink-500 mb-2">რეგიონები</div>
                <div className="font-display text-3xl">12</div>
              </div>
              <div>
                <div className="label text-ink-500 mb-2">აქტიური</div>
                <div className="font-display text-3xl">01</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="px-6 py-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="font-display text-3xl">ფოლკი / FOLK</div>
            <div className="label text-ink-500 mt-2">© 2026 · ყველა უფლება დაცულია</div>
          </div>
          <div className="flex flex-wrap gap-6 label text-ink-500">
            <a href="#" className="link link-rev">Instagram</a>
            <a href="#" className="link link-rev">YouTube</a>
            <a href="mailto:hello@folk.ge" className="link link-rev">hello@folk.ge</a>
          </div>
        </div>
      </footer>
    </>
  );
}
