import localFont from "next/font/local";

export const firago = localFont({
  src: [
    { path: "../fonts/FiraGO-Thin.otf", weight: "100", style: "normal" },
    { path: "../fonts/FiraGO-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/FiraGO-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/FiraGO-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const antena = localFont({
  src: [
    { path: "../fonts/Antena-Thin.otf", weight: "100", style: "normal" },
    { path: "../fonts/Antena-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Antena-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Antena-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Antena-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
