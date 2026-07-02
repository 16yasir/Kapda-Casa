import { useEffect, useRef } from "react";
import bestDresses from "@/assets/best-dresses.jpg";
import bestSets from "@/assets/best-sets.jpg";
import bestLinen from "@/assets/best-linen.jpg";
import bestHome from "@/assets/best-home.jpg";

const cards = [
  { title: "Summer Dresses", image: bestDresses },
  { title: "Embroidered Sets", image: bestSets },
  { title: "Linen Blouses", image: bestLinen },
  { title: "Home Collection", image: bestHome },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export const BestSellers = () => {
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const refs = cardInnerRefs.current;

        for (let i = 0; i < refs.length - 1; i++) {
          const currentInner = refs[i];
          const nextInner = refs[i + 1];
          if (!currentInner || !nextInner) continue;

          // Get the outer sticky wrapper (parent) of the NEXT card
          const nextCard = nextInner.parentElement;
          if (!nextCard) continue;

          const nextRect = nextCard.getBoundingClientRect();

          // overlapStart: when the next card's top is at the bottom of the viewport
          // overlapEnd: when the next card's top reaches sticky top (0px)
          const overlapStart = window.innerHeight;
          const overlapEnd = 0;
          const progress = clamp(
            (overlapStart - nextRect.top) / (overlapStart - overlapEnd),
            0,
            1
          );

          const scale = 1 - progress * 0.05;
          const brightness = 1 - progress * 0.4;

          currentInner.style.transform = `scale(${scale})`;
          currentInner.style.filter = `brightness(${brightness})`;
        }

        // Last card: always full scale/brightness
        const lastInner = refs[refs.length - 1];
        if (lastInner) {
          lastInner.style.transform = "scale(1)";
          lastInner.style.filter = "brightness(1)";
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ background: "#ffffff" }}>
      {/* Heading — unchanged */}
      <div className="bg-white px-6 pb-[60px] pt-[120px] md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#888888]">
            DISCOVER
          </p>
          <h2 className="section-heading mt-6 text-left">
            Best Sellers.
          </h2>
        </div>
      </div>

      {/* Scroll stack */}
      <div
        style={{
          position: "relative",
          height: `${cards.length * 100}vh`,
          padding: "0 clamp(20px, 1.7vw, 34px)",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={card.title}
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              zIndex: i + 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 0",
            }}
          >
            <div
              ref={(el) => { cardInnerRefs.current[i] = el; }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
                overflow: "hidden",
                willChange: "transform, filter",
                transformOrigin: "top center",
                position: "relative",
              }}
            >
              {/* Background image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.2)",
                }}
              />
              {/* Title */}
              <h3
                style={{
                  position: "absolute",
                  top: 36,
                  left: 40,
                  color: "white",
                  margin: 0,
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 52,
                  fontWeight: 400,
                }}
              >
                {card.title}
              </h3>
              {/* CTA button */}
              <button
                style={{
                  position: "absolute",
                  bottom: 36,
                  left: 40,
                  background: "transparent",
                  border: "1px solid white",
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: 999,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  cursor: "pointer",
                }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
