// Region metadata for Georgian regions.
// Only `guria` is fully populated for the pilot. Other regions exist on the
// map but route to a "coming soon" state.

export type Region = {
  id: string;            // matches SVG path id (e.g. "GE-GU")
  slug: string;          // URL slug (e.g. "guria")
  nameKa: string;
  shortKa?: string;
  available: boolean;
};

export const REGIONS: Region[] = [
  { id: "GE-AB", slug: "abkhazia",   nameKa: "აფხაზეთი",                          available: false },
  { id: "GE-SZ", slug: "samegrelo",  nameKa: "სამეგრელო-ზემო სვანეთი",            available: false },
  { id: "GE-RL", slug: "racha",      nameKa: "რაჭა-ლეჩხუმი-ქვემო სვანეთი",        available: false },
  { id: "GE-IM", slug: "imereti",    nameKa: "იმერეთი",                            available: false },
  { id: "GE-GU", slug: "guria",      nameKa: "გურია", shortKa: "სისონა დარჩია",   available: true  },
  { id: "GE-AJ", slug: "ajaria",     nameKa: "აჭარა",                              available: false },
  { id: "GE-SJ", slug: "samtskhe",   nameKa: "სამცხე-ჯავახეთი",                   available: false },
  { id: "GE-SK", slug: "shida-kartli", nameKa: "შიდა ქართლი",                     available: false },
  { id: "GE-MM", slug: "mtskheta",   nameKa: "მცხეთა-მთიანეთი",                   available: false },
  { id: "GE-KA", slug: "kakheti",    nameKa: "კახეთი", shortKa: "ხარება და გოგია", available: true  },
  { id: "GE-KK", slug: "kvemo-kartli", nameKa: "ქვემო ქართლი",                    available: false },
  { id: "GE-TB", slug: "tbilisi",    nameKa: "თბილისი",                            available: false },
];

export const REGION_BY_ID = Object.fromEntries(REGIONS.map(r => [r.id, r]));
export const REGION_BY_SLUG = Object.fromEntries(REGIONS.map(r => [r.slug, r]));
