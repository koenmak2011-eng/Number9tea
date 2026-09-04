import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const outfit = localFont({
  src: [
    {
      path: "../../public/fonts/outfit-regular.ttf",
      weight: "100 500",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit-bold.ttf",
      weight: "600 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit-black.ttf",
      weight: "800 900",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "No.9 Bubble Tea | Your little happy place in Wolverhampton",
  description:
    "Bubble tea, cafe treats and cute little finds. Find your new favourite at No.9 Bubble Tea, 50 Lichfield Street, Wolverhampton. Start your order on WhatsApp.",
  applicationName: "No.9 Bubble Tea",
  openGraph: {
    title: "No.9 Bubble Tea | Sip happy. Stay a little.",
    description:
      "Your little happy place on Lichfield Street, Wolverhampton. Bubble tea, sweet treats and tiny surprises.",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={outfit.variable}>{children}</body>
    </html>
  );
}
