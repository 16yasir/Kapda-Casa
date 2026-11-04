import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import TryOnSection from "@/components/fashion-viewer/TryOnSection";
import { About } from "@/components/About";
import { Collections } from "@/components/Collections";
import { BestSellers } from "@/components/BestSellers";
import { ShopNow } from "@/components/ShopNow";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import {
  BRAND_TITLE,
  BRAND_META_DESCRIPTION,
  BRAND_OG_TITLE,
} from "@/config/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: BRAND_TITLE },
      {
        name: "description",
        content: BRAND_META_DESCRIPTION,
      },
      { property: "og:title", content: BRAND_OG_TITLE },
      {
        property: "og:description",
        content:
          "Editorial women's fashion and Mediterranean home textiles.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      <Hero />
      <TryOnSection />
      <About />
      <Collections />
      <BestSellers />
      <ShopNow />
      <Footer />
    </div>
  );
}
