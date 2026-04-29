"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-2 h-2 bg-ink rounded-full" />
          <span className="label tracking-wide2">ფოლკი / FOLK</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 label">
          <Link href="/#map" className="link link-rev">რუკა</Link>
          <Link href="/region/guria" className="link link-rev">გურია</Link>
          <Link href="/#about" className="link link-rev">პროექტი</Link>
        </nav>

        <Link href="/region/guria" className="btn btn-solid">
          მოუსმინე
        </Link>
      </div>
    </header>
  );
}
