import { useEffect, useRef } from "react";
import heroImage from "@/assets/hero.jpg";
import heroVideo from "@/assets/hero.mp4";

export function Hero() {
  const mediaRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.5}px, 0) scale(1.15)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={mediaRef}
        src={heroVideo}
        poster={heroImage}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transformOrigin: "center top" }}
      />
      {/* Subtle dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Top-right meta */}
      <div className="absolute top-24 right-6 md:top-28 md:right-12 text-right text-white font-sans font-light text-[12px] md:text-[13px] tracking-wide leading-relaxed">
        <p>Editorial Fashion Brand</p>
        <p>Est. 2020</p>
      </div>

      {/* KAPDA — top-left */}
      <h1
        aria-label="KAPDA CASA"
        className="absolute top-[18vh] md:top-[15vh] left-4 md:left-10 font-display font-medium text-white/85 leading-[0.85] select-none pointer-events-none"
        style={{
          fontSize: "clamp(64px, 16vw, 240px)",
          letterSpacing: "-0.02em",
        }}
      >
        KAPDA
      </h1>

      {/* CASA — bottom-right on desktop, bottom-left on mobile */}
      <span
        aria-hidden="true"
        className="absolute bottom-[8vh] md:bottom-[6vh] left-4 md:left-auto md:right-10 font-display font-medium text-white/85 leading-[0.85] select-none pointer-events-none"
        style={{
          fontSize: "clamp(64px, 16vw, 240px)",
          letterSpacing: "-0.02em",
        }}
      >
        CASA
      </span>

      {/* Bottom-left tagline (desktop only — on mobile CASA occupies this corner) */}
      <p className="hidden md:block absolute bottom-10 left-10 text-white font-sans font-normal text-[13px] tracking-[0.2em] text-left">
        Craft. Culture. Cloth.
      </p>
    </section>
  );
}
