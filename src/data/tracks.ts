// Aggregated playable tracks across all available folk characters.
// Pulls from per-character song lists.

import { SISONA } from "@/data/sisona";
import { KHAREBA_GOGIA } from "@/data/khareba-gogia";
import { CHARACTERS } from "@/data/characters";

export type Track = {
  id: string;
  title: string;
  artist: string;          // character name
  characterSlug: string;   // for "go to story"
  regionSlug: string;
  region: string;
  src: string;
  type: "audio" | "video";
};

// For now, only Sisona has real audio. Add more characters' songs here as they become available.
const SISONA_TRACKS: Track[] = SISONA.songs.map((s, i) => ({
  id: `sisona-${i}`,
  title: s.title,
  artist: SISONA.name,
  characterSlug: "sisona-darchia",
  regionSlug: "guria",
  region: SISONA.region,
  src: s.src,
  type: s.type,
}));

const KHAREBA_GOGIA_TRACKS: Track[] = KHAREBA_GOGIA.songs.map((s, i) => ({
  id: `khareba-gogia-${i}`,
  title: s.title,
  artist: KHAREBA_GOGIA.name,
  characterSlug: "khareba-gogia",
  regionSlug: "kakheti",
  region: KHAREBA_GOGIA.region,
  src: s.src,
  type: s.type,
}));

export const RADIO_TRACKS: Track[] = [...SISONA_TRACKS, ...KHAREBA_GOGIA_TRACKS];

// Helper: pick a random track index different from `exclude`
export function pickRandom(exclude?: number): number {
  if (RADIO_TRACKS.length === 0) return -1;
  if (RADIO_TRACKS.length === 1) return 0;
  let i = Math.floor(Math.random() * RADIO_TRACKS.length);
  if (exclude !== undefined && i === exclude) {
    i = (i + 1) % RADIO_TRACKS.length;
  }
  return i;
}

// Reference for future expansion
export const _CHARACTERS_WITH_TRACKS = CHARACTERS.filter((c) => c.available);
