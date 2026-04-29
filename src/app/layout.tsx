import type { Metadata, Viewport } from "next";
import "./globals.css";
import { firago, antena } from "./fonts";
import RadioPlayer from "@/components/RadioPlayer";

export const metadata: Metadata = {
  title: "ფოლკი — საქართველოს ხალხური ხმები",
  description:
    "ინტერაქტიული რუკა, სადაც ცხოვრობს საქართველოს ხალხური მუსიკა, ისტორიები და გმირები.",
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${firago.variable} ${antena.variable}`}>
      <body className="grain bg-paper text-ink antialiased pb-40 md:pb-32">
        {children}
        <RadioPlayer />
      </body>
    </html>
  );
}
