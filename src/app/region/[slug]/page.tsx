import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { REGION_BY_SLUG } from "@/data/regions";
import { SISONA } from "@/data/sisona";
import { KHAREBA_GOGIA } from "@/data/khareba-gogia";
import Nav from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import WaveformPlayer from "@/components/WaveformPlayer";

export function generateStaticParams() {
  return [{ slug: "guria" }, { slug: "kakheti" }];
}

export default function RegionPage({ params }: { params: { slug: string } }) {
  const region = REGION_BY_SLUG[params.slug];
  if (!region) notFound();

  if (region.slug !== "guria" && region.slug !== "kakheti") {
    return (
      <>
        <Nav />
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="label text-ink-500 mb-6">{region.nameKa}</div>
          <h1 className="headline text-6xl md:text-8xl">მალე<span className="text-ink-500">.</span></h1>
          <p className="mt-6 text-ink-700 max-w-md font-light">ეს რეგიონი მზადდება. დაბრუნდი მალე.</p>
          <Link href="/" className="mt-10 btn">← რუკაზე დაბრუნება</Link>
        </main>
      </>
    );
  }

  const c = region.slug === "kakheti" ? KHAREBA_GOGIA : SISONA;
  const profileNumber = region.slug === "kakheti" ? "02" : "01";
  const regionFlavor = region.slug === "kakheti" ? "კახური" : "გურული";

  return (
    <>
      <Nav />

      {/* ==================== TOP META ==================== */}
      <section className="pt-20 px-6 hairline-b">
        <div className="max-w-[1600px] mx-auto py-4 flex flex-wrap items-center justify-between gap-2 label text-ink-500">
          <Link href="/" className="link link-rev">← რუკა</Link>
          <span>პროფილი {profileNumber} / 12</span>
          <span className="hidden md:inline">{c.region} · {region.id}</span>
        </div>
      </section>

      {/* ==================== HERO ==================== */}
      <section className="px-6 py-16 md:py-24 hairline-b">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-7 flex flex-col justify-end">
            <div className="label text-ink-500 mb-6">{c.region} · {c.era}</div>
            <h1 className="headline text-[clamp(2.75rem,12vw,11rem)] text-balance break-words">
              {c.name}
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-ink-700 font-light leading-relaxed max-w-2xl">
              {c.shortBio}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#story" className="btn btn-solid">↓ ისტორია</a>
              <a href="#music" className="btn">♪ მოუსმინე</a>
            </div>
          </div>

          <div className="md:col-span-5 relative aspect-[4/5] bg-ink-300 overflow-hidden">
            <Image
              src={c.portrait}
              alt={c.name}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              style={{ filter: "grayscale(0.1) contrast(1.05)" }}
            />
          </div>
        </div>
      </section>

      {/* ==================== STORY ==================== */}
      <section id="story" className="px-6 py-24 md:py-40 hairline-b">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <div className="sticky top-24">
              <div className="label text-ink-500 mb-4">თავი 01</div>
              <h2 className="headline text-5xl md:text-7xl">ისტორია</h2>
              <div className="mt-8 space-y-2 label text-ink-500">
                <div>კითხვის დრო · 4 წთ</div>
                <div>ქართულად</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-8">
              {c.story.map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-xl md:text-2xl leading-relaxed text-ink-700 font-light">
                    {i === 0 ? (
                      <>
                        <span className="font-display text-7xl md:text-8xl text-ink float-left mr-4 leading-[0.85] mt-1">
                          {para.charAt(0)}
                        </span>
                        {para.slice(1)}
                      </>
                    ) : (
                      para
                    )}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-20 hairline pt-12">
              <p className="font-display text-3xl md:text-5xl text-ink leading-tight text-balance">
                „ხმა, რომელიც <em className="not-italic text-ink-500">თაობებს</em> გადაეცა."
              </p>
              <div className="label text-ink-500 mt-6">{regionFlavor} ხალხური ტრადიცია</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== MUSIC ==================== */}
      <section id="music" className="px-6 py-24 md:py-40 hairline-b">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <div className="label text-ink-500 mb-4">თავი 02</div>
              <h2 className="headline text-5xl md:text-7xl">მუსიკა</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 self-end">
              <p className="text-base md:text-lg text-ink-700 font-light max-w-md">
                ცოცხალი ჩანაწერები — {regionFlavor} ხალხური მელოდიების მაგალითები.
              </p>
            </div>
          </div>

          <div className="grid gap-px bg-ink-300/40">
            {c.songs.map((song, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article className="bg-paper grid md:grid-cols-12 gap-6 md:gap-8 p-6 md:p-10">
                  <div className="md:col-span-1 label text-ink-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-display text-2xl md:text-3xl text-ink">
                      {song.title}
                    </h3>
                    {song.description && (
                      <p className="mt-2 text-sm text-ink-500 font-light">
                        {song.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="tag">აუდიო</span>
                      <span className="tag">{regionFlavor}</span>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <WaveformPlayer
                      src={song.src}
                      title={song.title}
                      subtitle={`${c.name} · ${c.region}`}
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CHARACTER ANIM ==================== */}
      <section className="px-6 py-24 md:py-40 hairline-b">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-4">
              <div className="label text-ink-500 mb-4">თავი 03</div>
              <h2 className="headline text-5xl md:text-7xl">ხალხური<br />გმირი</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 self-end">
              <p className="text-base md:text-lg text-ink-700 font-light max-w-md">
                ანიმაციური ინტერპრეტაცია — პერსონაჟის სახე ცოცხლდება.
              </p>
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/9] border border-ink/20 flex items-center justify-center overflow-hidden bg-paper-50">
              <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-l border-ink/5" />
                ))}
              </div>
              <div className="relative text-center px-8">
                <div className="inline-flex w-16 h-16 mb-6 rounded-full border border-ink/40 items-center justify-center text-2xl text-ink/60 animate-pulse">
                  ✦
                </div>
                <div className="font-display text-2xl md:text-3xl">
                  ანიმაცია მზადების პროცესშია
                </div>
                <p className="mt-3 text-ink-500 max-w-md mx-auto font-light">
                  Lottie / Rive გმირი მალე გაცოცხლდება ამ სივრცეში
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== CONTINUE ==================== */}
      <section className="px-6 py-20 hairline-b">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="label text-ink-500 mb-3">გააგრძელე</div>
            <h3 className="headline text-4xl md:text-6xl">
              შემდეგი რეგიონი მალე<span className="text-ink-500">...</span>
            </h3>
          </div>
          <Link href="/" className="btn btn-solid shrink-0">← რუკაზე</Link>
        </div>
      </section>

      <footer className="px-6 py-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="font-display text-3xl">ფოლკი / FOLK</div>
            <div className="label text-ink-500 mt-2">{c.region} · {c.name} · 2026</div>
          </div>
          <div className="flex flex-wrap gap-6 label text-ink-500">
            <Link href="/" className="link link-rev">მთავარი</Link>
            <a href="#story" className="link link-rev">ისტორია</a>
            <a href="#music" className="link link-rev">მუსიკა</a>
          </div>
        </div>
      </footer>
    </>
  );
}
