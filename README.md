# ქართული ფოლკლორი — Folk Website

Interactive map of Georgia where each region opens a world of folk music, stories, and characters.

## Pilot

- **Region:** გურია (Guria)
- **Character:** სისონა დარჩია (Sisona Darchia)

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Inline SVG map with React event handlers

## Run

```powershell
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
src/
  app/
    layout.tsx          # root layout, Georgian fonts
    page.tsx            # home + interactive map
    region/[slug]/      # dynamic region pages
    globals.css
  components/
    GeorgiaMap.tsx      # interactive SVG map
  data/
    regions.ts          # region metadata
    sisona.ts           # Sisona Darchia content
    georgia-paths.ts    # auto-generated SVG paths
public/
  assets/
    sisona-portrait.jpg
    sisona-music.mp4
```

## Adding a new region

1. Set `available: true` in `src/data/regions.ts`
2. Create a content file (like `src/data/sisona.ts`)
3. Render it in `src/app/region/[slug]/page.tsx`

## Updating Sisona's story

Edit `src/data/sisona.ts` — the `story` array holds paragraphs.

## Regenerating SVG paths

If you replace `georgia.svg`:

```powershell
node extract.cjs
```
