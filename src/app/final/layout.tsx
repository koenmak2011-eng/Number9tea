import type { Metadata } from "next";
import "./final.css";

export const metadata: Metadata = {
  title: "No.9 Bubble Tea | Made Bright in Wolverhampton",
  description:
    "Bubble tea, cafe treats and collectible little finds at No.9 Bubble Tea, 50 Lichfield Street, Wolverhampton. Start an order on WhatsApp.",
};

export default function FinalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
