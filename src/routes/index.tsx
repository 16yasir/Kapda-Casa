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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAPDA CASA — Women's Fashion & Mediterranean Home Textiles" },
      {
        name: "description",
        content:
          "KAPDA CASA crafts editorial women's fashion and decorative home textiles inspired by the Mediterranean and Morocco.",
      },
      { property: "og:title", content: "KAPDA CASA" },
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
