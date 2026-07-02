import { useState } from "react";
import videoSrc from "@/assets/video2.mp4";
import { Reveal } from "@/components/Reveal";
import { RollingNumber } from "@/components/RollingNumber";

export function About() {
  return (
    <section
      id="about"
      className="bg-white px-6 md:px-12 lg:px-20"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Label */}
        <Reveal as="p"
          className="font-sans text-[#888888] uppercase"
          style={{ fontSize: "11px", letterSpacing: "0.2em" }}
        >
          Our Story
        </Reveal>

        {/* Heading */}
        <Reveal as="h2" delay={0.2} className="section-heading mt-6">
          Born from Craft.
        </Reveal>

        {/* Two-column block: portrait | text + stats */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-[45%_1fr] gap-10 md:gap-16 items-stretch">
          {/* Left: tall portrait */}
          <Reveal className="relative w-full aspect-[3/4] md:aspect-auto md:min-h-[680px] overflow-hidden">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Reveal>

          {/* Right: paragraph + stats + CTA */}
          <div className="flex flex-col justify-center">
            <Reveal as="p" delay={0.1} className="font-sans text-[18px] leading-[1.7] max-w-[560px]">
              <span className="font-bold text-[#111111]">
                KAPDA CASA blends Mediterranean tradition with modern elegance.
              </span>{" "}
              <span className="font-normal text-[#888888]">
                Born from a love of craft and culture, our collections celebrate
                the artistry of embroidery, natural fabrics, and timeless
                silhouettes rooted in Moroccan heritage.
              </span>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[560px]">
              <Reveal delay={0.2}><StatCard target={9} label="Collections" /></Reveal>
              <Reveal delay={0.3}><StatCard target={10} suffix="+" label="Years of Craft" /></Reveal>
            </div>

            <Reveal delay={0.4} className="mt-12">
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-[#111111] text-[#111111] bg-transparent font-sans uppercase transition-colors hover:bg-[#111111] hover:text-white"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  padding: "16px 32px",
                }}
              >
                More About Us
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


function StatCard({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="border border-[#E5E5E5] bg-white transition-shadow hover:shadow-sm"
      style={{ padding: "40px 32px", borderRadius: "8px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="font-display text-[#111111] leading-none"
        style={{
          fontSize: "72px",
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <RollingNumber target={target} suffix={suffix} isHovered={isHovered} />
      </div>
      <div
        className="mt-4 font-sans text-[#888888] uppercase"
        style={{ fontSize: "12px", letterSpacing: "0.15em" }}
      >
        {label}
      </div>
    </div>
  );
}
