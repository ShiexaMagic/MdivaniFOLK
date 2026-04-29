// Sisona Darchia — Gurian folk character / pilot content.
// NOTE: Story text below is a placeholder template — replace with the
// content you've gathered. Audio/image filenames map to /public assets.

export type Song = {
  title: string;
  description?: string;
  src: string;          // path under /public
  type: "audio" | "video";
};

export type Character = {
  name: string;
  region: string;
  era?: string;
  portrait: string;
  shortBio: string;
  story: string[];      // paragraphs
  songs: Song[];
};

export const SISONA: Character = {
  name: "სისონა დარჩია",
  region: "გურია",
  era: "XIX–XX საუკუნეები",
  portrait: "/assets/sisona-portrait.jpg",
  shortBio:
    "სისონა დარჩია — გურული ხალხური სიმღერის ლეგენდარული შემსრულებელი, რომლის ხმაც თაობებს გადაეცა.",
  story: [
    "სისონა დარჩია გურული ფოლკლორის ერთ-ერთი ყველაზე ცნობილი სახეა. მისი სიმღერები დღემდე ცოცხლობს გურულ სოფლებში და კონცერტების სცენებზე.",
    "აქ ჩაანაცვლე სრული ტექსტი — ბიოგრაფია, ლეგენდები და ისტორიები, რომელიც შეაგროვე.",
    "ამბავი მისი თანამოსაუბრისა — მეხუძლა — და მათი ერთობლივი შემოქმედება გურული პოლიფონიის უმნიშვნელოვანესი ფურცელია.",
  ],
  songs: [
    {
      title: "სისონას სიმღერა",
      description: "ჩანაწერი — გურული ხალხური მელოდია",
      src: "/assets/sisona-music.mp4",
      type: "video",
    },
  ],
};
