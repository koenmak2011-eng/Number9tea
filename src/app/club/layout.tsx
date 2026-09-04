import type { Metadata } from "next";
import "./club.css";

export const metadata: Metadata = {
  title: "No.9 Social Club | Bubble Tea in Wolverhampton",
  description:
    "Bold bubble tea, cafe treats and tiny finds at No.9 Bubble Tea on Lichfield Street, Wolverhampton. Order on WhatsApp.",
};

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
