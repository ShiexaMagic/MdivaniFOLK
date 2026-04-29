// Folk characters / heroes — placeholder roster.
// Replace bios/portraits as content is gathered.

export type FolkCharacter = {
  id: string;
  slug: string;
  name: string;
  epithet?: string;       // short descriptor under the name
  region: string;         // human-readable region label
  regionSlug: string;     // matches REGIONS slug (for routing once available)
  era?: string;
  tags: string[];
  bio: string;            // short placeholder bio
  portrait?: string;      // optional /assets path
  available: boolean;     // does it have a full page yet
};

export const CHARACTERS: FolkCharacter[] = [
  {
    id: "sisona-darchia",
    slug: "sisona-darchia",
    name: "სისონა დარჩია",
    epithet: "გურული ხალხური სიმღერის ლეგენდა",
    region: "გურია",
    regionSlug: "guria",
    era: "XIX–XX საუკუნეები",
    tags: ["მომღერალი", "პოლიფონია", "გურული"],
    bio: "სისონა დარჩია — გურული ხალხური სიმღერის ლეგენდარული შემსრულებელი, რომლის ხმაც თაობებს გადაეცა.",
    portrait: "/assets/sisona-portrait.jpg",
    available: true,
  },
  {
    id: "khareba-gogia",
    slug: "khareba-gogia",
    name: "ხარება და გოგია",
    epithet: "კახეთის ყაჩაღი-გმირები",
    region: "კახეთი",
    regionSlug: "kakheti",
    era: "XIX–XX საუკუნეები",
    tags: ["კახეთი", "ყაჩაღი-გმირები", "ისტორიული ამბავი"],
    bio: "თელაველი ყაჩაღების მეთაურები — ხარება ჯიბუტიშვილი და გოგია კენკიშვილი, რომელთა ისტორია 1913 წლის მოვლენებს უკავშირდება.",
    portrait: "/assets/khareba-gogia-portrait.jpg",
    available: true,
  },
  {
    id: "arsena",
    slug: "arsena-odzelashvili",
    name: "არსენა ოძელაშვილი",
    epithet: "ქართლის ყაჩაღი-გმირი",
    region: "ქართლი / თბილისი და შემოგარენი",
    regionSlug: "shida-kartli",
    era: "XIX საუკუნე",
    tags: ["ყაჩაღი-გმირი", "ქართლი", "ქალაქთან ახლოს"],
    bio: 'მოქმედებდა მუხრანის, მცხეთის, თბილისის მიდამოებში. ერთ-ერთი ყველაზე „ქალაქთან ახლოს" მოქმედი გმირი.',
    available: false,
  },
  {
    id: "datiko",
    slug: "datiko-shervashidze",
    name: "დათიკო შერვაშიძე",
    epithet: "არისტოკრატი გმირი",
    region: "აფხაზეთი",
    regionSlug: "abkhazia",
    era: "XIX საუკუნე",
    tags: ["შერვაშიძეები", "არისტოკრატია", "აფხაზეთი"],
    bio: "შერვაშიძეთა საგვარეულოდან — უფრო არისტოკრატიული გმირის ტიპი.",
    available: false,
  },
  {
    id: "bashi-achuki",
    slug: "bashi-achuki",
    name: "ბაში-აჩუკი",
    epithet: "ალაზნის ველის გმირი",
    region: "კახეთი",
    regionSlug: "kakheti",
    era: "XVII საუკუნე",
    tags: ["კახეთი", "ალაზნის ველი", "მითოლოგიზებული"],
    bio: "ალაზნის ველის კონტექსტი. რეალურ ამბებზე დაფუძნებული, მაგრამ ძლიერ მითოლოგიზებული.",
    available: false,
  },
  {
    id: "luka",
    slug: "luka-isarlovi",
    name: "ლუკა ისარლოვი",
    epithet: "ნაკლებად ცნობილი ყაჩაღი-გმირი",
    region: "კახეთი / აღმოსავლეთ საქართველო",
    regionSlug: "kakheti",
    era: "XIX საუკუნე",
    tags: ["კახეთი", "ყაჩაღი-გმირი"],
    bio: 'ნაკლებად ცნობილი, მაგრამ იგივე „ყაჩაღი-გმირის" ხაზში.',
    available: false,
  },
  {
    id: "dzmebi",
    slug: "dzmebi-kachaghebi",
    name: "ძმები-ყაჩაღები",
    epithet: "თუშური მთიანი არე",
    region: "კახეთი / თუშეთი",
    regionSlug: "kakheti",
    era: "XIX საუკუნე",
    tags: ["კახეთი", "თუშეთი", "ძმები"],
    bio: "ხშირად დაკავშირებულია თუშეთთანაც — მთიანი არე.",
    available: false,
  },
];

export const CHARACTER_BY_SLUG = Object.fromEntries(
  CHARACTERS.map((c) => [c.slug, c])
);
