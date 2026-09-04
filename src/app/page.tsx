import { LandingPage } from "@/components/landing-page";
import menuData from "@/generated/menu-data.json";
import type { MenuCategory, Product } from "@/lib/shop";

export default function Home() {
  return (
    <LandingPage
      menuProducts={menuData.products as Product[]}
      menuCategories={menuData.categories as MenuCategory[]}
    />
  );
}
