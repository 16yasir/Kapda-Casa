import { useState } from "react";
import { Reveal } from "@/components/Reveal";
const items = [
  { label: "Clothes", image: "/Assets/C1.webp", sub: ["New Arrivals", "View All"], cropClass: "object-top" },
  { label: "Blouses & Shirts", image: "/Assets/C2.webp", sub: ["Linen", "Embroidered"], cropClass: "object-top" },
  { label: "Sets & Outfits", image: "/Assets/C3.webp", sub: ["Co-ord Sets", "View All"], cropClass: "object-top" },
  { label: "Home Textiles", image: "/Assets/C4.webp", sub: ["Cushions", "Bedding"], cropClass: "object-[center_40%]" },
];

export function Collections() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
   <section className="bg-white px-6 pt-[120px] pb-[80px] md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal as="p" className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#888888]">
          What We Offer
        </Reveal>
        <Reveal as="h2" delay={0.2} className="section-heading mt-6">
          Collections.
        </Reveal>
        <Reveal as="p" delay={0.3} className="mt-8 max-w-xl text-[18px] leading-relaxed text-[#888888]">
          Handcrafted garments and textiles for the modern woman.
        </Reveal>

        {/* Desktop: hover-expand row */}
        <div className="mt-20 hidden gap-3 md:flex">
          {items.map((item, i) => {
            const isHovered = hovered === i;
            return (
              <Reveal key={item.label} delay={0.1 * i} className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col">
                  <h3
                    className="font-display font-medium leading-tight text-[#111111]"
                    style={{
                      fontSize: 32,
                      marginBottom: 16,
                      opacity: isHovered ? 0 : 1,
                      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    {item.label}
                  </h3>
                  <div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative w-full cursor-pointer overflow-hidden rounded-md"
                    style={{
                      height: isHovered ? 560 : 220,
                      transition: isHovered
                        ? "height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s"
                        : "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className={`h-full w-full object-cover ${item.cropClass}`}
                      style={{
                        transformOrigin: "top center",
                        transform: isHovered ? "scale(1.04)" : "scale(1)",
                        transition: "transform 0.6s ease",
                      }}
                    />
                    {isHovered && <div className="absolute inset-0 bg-black/20" />}
                    <h3
                      className="absolute font-display font-medium leading-tight text-white"
                      style={{
                        top: 20,
                        left: 20,
                        fontSize: 36,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(4px)",
                        transition: isHovered
                          ? "opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s"
                          : "opacity 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      {item.label}
                    </h3>
                    <div
                      className="absolute flex flex-col"
                      style={{
                        bottom: 20,
                        left: 20,
                        gap: 8,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(8px)",
                        transition: isHovered
                          ? "opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s"
                          : "opacity 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      {item.sub.map((s) => (
                        <span
                          key={s}
                          className="uppercase text-white font-sans"
                          style={{ fontSize: 11, letterSpacing: "0.2em" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile: tap to expand */}
        <div className="mt-12 flex flex-col gap-3 md:hidden">
          {items.map((item, i) => {
            const isHovered = hovered === i;
            return (
              <div 
                key={item.label} 
                onClick={() => setHovered(isHovered ? null : i)}
                className="relative overflow-hidden rounded-md cursor-pointer"
                style={{
                  height: isHovered ? 480 : 280,
                  transition: isHovered
                    ? "height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    : "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className={`h-full w-full object-cover ${item.cropClass}`}
                  style={{
                    transformOrigin: "top center",
                    transform: isHovered ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.6s ease",
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute left-0 top-0 p-5 font-display text-[28px] font-medium leading-tight text-white">
                  {item.label}
                </h3>
                
                <div
                  className="absolute flex flex-col"
                  style={{
                    bottom: 20,
                    left: 20,
                    gap: 8,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(8px)",
                    transition: isHovered
                      ? "opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s"
                      : "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {item.sub.map((s) => (
                    <span
                      key={s}
                      className="uppercase text-white font-sans"
                      style={{ fontSize: 11, letterSpacing: "0.2em" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing row: editorial line + CTA */}
        <Reveal delay={0.2}>
          <div className="mt-16 border-t border-black/10 pt-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="font-display text-[#111111] italic"
                style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400 }}
              >
                Every piece begins with a single thread.
              </p>
              <a
                href="#collections"
                className="inline-flex items-center justify-center rounded-full border border-[#111111] text-[#111111] bg-transparent font-sans uppercase transition-colors hover:bg-[#111111] hover:text-white whitespace-nowrap shrink-0"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  padding: "16px 32px",
                }}
              >
                View All Collections
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

