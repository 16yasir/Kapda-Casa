import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import collectionClothes from "@/assets/collection-clothes.jpg";
import collectionBlouses from "@/assets/collection-blouses.jpg";
import collectionSets from "@/assets/collection-sets.jpg";
import collectionHome from "@/assets/collection-home.jpg";
import bestHome from "@/assets/best-home.jpg";
import product8 from "@/assets/product-8.jpg";
import bestDresses from "@/assets/best-dresses.jpg";
import bestLinen from "@/assets/best-linen.jpg";

type CategoryKey = "women" | "textiles" | "about" | "contact";

type Category = {
  key: CategoryKey;
  label: string;
  sections: { num: string; name: string }[];
  items: string[];
  images: string[];
};

const categories: Category[] = [
  {
    key: "women",
    label: "WOMEN'S FASHION",
    sections: [
      { num: "01", name: "NEW IN" },
      { num: "02", name: "COLLECTION" },
    ],
    items: ["CLOTHES", "SETS", "BLOUSES AND SHIRTS", "SKIRTS", "JACKETS", "VIEW ALL"],
    images: [collectionClothes, collectionBlouses, collectionSets],
  },
  {
    key: "textiles",
    label: "DECORATIVE TEXTILES",
    sections: [
      { num: "01", name: "NEW IN" },
      { num: "02", name: "LIVING ROOM" },
      { num: "03", name: "DINING ROOM" },
    ],
    items: ["BEDDING", "CUSHIONS AND COVERS", "TABLECLOTHS AND RUNNERS", "TABLECLOTH SETS", "VIEW ALL"],
    images: [collectionHome, bestHome, product8],
  },
  {
    key: "about",
    label: "ABOUT US",
    sections: [
      { num: "01", name: "THE BRAND" },
      { num: "02", name: "EDITORIAL" },
    ],
    items: ["WE ARE KAPDA CASA", "JOURNAL", "LOOKBOOK", "CONTACT FORM"],
    images: [bestDresses, bestLinen],
  },
  {
    key: "contact",
    label: "CONTACT",
    sections: [{ num: "01", name: "GET IN TOUCH" }],
    items: ["CONTACT FORM", "STORES", "PRESS"],
    images: [bestLinen],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<CategoryKey>("women");
  const [mobileExpanded, setMobileExpanded] = useState<CategoryKey | null>("women");
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 50);
      setShowLogo(y > window.innerHeight - 80);
      const delta = y - lastY;
      if (y < 96) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const activeCat = categories.find((c) => c.key === active) ?? categories[0];

  const openMenu = () => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
    setTimeout(() => lastFocus.current?.focus?.(), 0);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          backgroundColor: scrolled && !open ? "#ffffff" : "transparent",
          borderBottom: scrolled && !open
            ? "1px solid rgba(0,0,0,0.1)"
            : "1px solid transparent",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease-out",
          transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <nav className="flex items-start justify-end px-6 md:px-10 pt-6 md:pt-7 pb-4">
          {/* Center logo on scroll */}
          <Link
            to="/"
            aria-hidden={!showLogo}
            tabIndex={showLogo ? 0 : -1}
            className="absolute left-1/2 top-1/2 font-display font-black tracking-tight text-[#111111] text-base md:text-lg leading-none transition-all duration-[400ms] ease-out"
            style={{
              letterSpacing: "-0.01em",
              opacity: showLogo ? 1 : 0,
              transform: `translate(-50%, -50%) translateX(${showLogo ? 0 : -10}px)`,
              pointerEvents: showLogo ? "auto" : "none",
            }}
          >
            KAPDA CASA
          </Link>

          {/* Right: icons */}
          <div className="flex items-center gap-5 md:gap-6">
            <button
              aria-label="Search"
              className={`cursor-pointer ${!scrolled && !open ? "text-white" : "text-[#111111]"}`}
              style={{ transition: "transform 0.25s ease, opacity 0.25s ease, color 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15) translateY(-1px)"; e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.opacity = "1"; }}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Shopping bag"
              className={`cursor-pointer ${!scrolled && !open ? "text-white" : "text-[#111111]"}`}
              style={{ transition: "transform 0.25s ease, opacity 0.25s ease, color 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15) translateY(-1px)"; e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.opacity = "1"; }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Fixed menu controls */}
      <div
        className="fixed z-[110]"
        style={{ top: 24, left: 40, width: 37, height: 28 }}
      >
        <button
          aria-label="Open menu"
          onClick={openMenu}
          className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer ${
            open ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ gap: 7, transition: "opacity 0.2s ease" }}
        >
          <span className={`block transition-colors duration-300 ${!scrolled && !open ? "bg-white" : "bg-[#111111]"}`} style={{ width: 37, height: 2 }} />
          <span className={`block transition-colors duration-300 ${!scrolled && !open ? "bg-white" : "bg-[#111111]"}`} style={{ width: 37, height: 2 }} />
        </button>

        <button
          aria-label="Close menu"
          onClick={closeMenu}
          className={`absolute inset-0 flex items-center justify-center text-[#111111] font-sans font-light leading-none cursor-pointer ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ fontSize: 28, transition: "opacity 0.2s ease" }}
        >
          ×
        </button>
      </div>

      {/* Overlay */}
      <div
        aria-hidden={!open}
        className="fixed inset-0 z-[100] bg-white overflow-hidden"
        style={{
          opacity: open ? 1 : 0,
          transition: open
            ? "opacity 0.5s ease"
            : "opacity 0.3s ease",
          pointerEvents: open ? "auto" : "none",
          backdropFilter: "none",
        }}
      >
        {/* Mirror right-side controls in overlay for parity */}
        <div className="hidden md:flex absolute top-6 right-10 items-center gap-6">
          <span className="text-[#111111]">
            <Search size={20} strokeWidth={1.5} />
          </span>
          <span className="text-[#111111]">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </span>
        </div>

        {/* Desktop 4-column layout */}
        <div className="hidden md:grid h-full w-full grid-cols-[1.2fr_0.8fr_0.9fr_1fr] gap-10 px-16 pt-28 pb-10">
          {/* Column 1: main categories */}
          <ul className="flex flex-col gap-5">
            {categories.map((c, idx) => {
              const isActive = c.key === active;
              const delay = open ? 0.1 + idx * 0.05 : 0;
              return (
                <li
                  key={c.key}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
                  }}
                >
                  <button
                    onMouseEnter={() => setActive(c.key)}
                    onFocus={() => setActive(c.key)}
                    onClick={() => setActive(c.key)}
                    className={`font-display text-left text-[#111111] leading-tight cursor-pointer transition-opacity ${
                      isActive ? "font-bold" : "font-normal hover:opacity-70"
                    }`}
                    style={{ fontSize: 36, letterSpacing: "-0.01em" }}
                  >
                    <span
                      className="inline-block mr-3"
                      style={{ opacity: isActive ? 1 : 0, width: "0.5em" }}
                    >
                      ·
                    </span>
                    {c.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Column 2: numbered sections */}
          <ul
            className="flex flex-col gap-4 pt-3"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: open
                ? "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s"
                : "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {activeCat.sections.map((s) => (
              <li
                key={s.num}
                className="uppercase text-[#888888]"
                style={{ fontSize: 11, letterSpacing: "0.2em" }}
              >
                <span className="mr-3">|{s.num}|</span>
                {s.name}
              </li>
            ))}
          </ul>

          {/* Column 3: sub-items */}
          <ul
            className="flex flex-col gap-4 pt-3"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: open
                ? "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s"
                : "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {activeCat.items.map((it) => (
              <li key={it}>
                <a
                  href="#"
                  className="nav-link uppercase text-[#111111]"
                  style={{ fontSize: 13, letterSpacing: "0.18em" }}
                >
                  {it}
                </a>
              </li>
            ))}
          </ul>

          {/* Column 4: preview images */}
          <div
            className="pt-2 overflow-hidden"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: 12,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: open
                ? "opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s"
                : "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {activeCat.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  height: 160,
                  flex: "0 0 auto",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile: single column accordion */}
        <div className="md:hidden h-full w-full overflow-y-auto px-6 pt-20 pb-12">
          <ul className="flex flex-col gap-6">
            {categories.map((c, idx) => {
              const expanded = mobileExpanded === c.key;
              const delay = open ? 0.1 + idx * 0.05 : 0;
              return (
                <li
                  key={c.key}
                  className="border-b border-black/5 pb-5"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
                  }}
                >
                  <button
                    onClick={() => setMobileExpanded(expanded ? null : c.key)}
                    className="font-display font-normal text-left text-[#111111] leading-tight cursor-pointer w-full"
                    style={{ fontSize: 32, letterSpacing: "-0.01em" }}
                  >
                    <span className="inline-block mr-2" style={{ opacity: expanded ? 1 : 0 }}>·</span>
                    {c.label}
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      gridTemplateRows: expanded ? "1fr" : "0fr",
                      opacity: expanded ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-col gap-4 mt-4 pl-6 pb-2">
                        {c.items.map((it) => (
                          <li key={it}>
                            <a
                              href="#"
                              className="uppercase text-[#111111]"
                              style={{ fontSize: 13, letterSpacing: "0.18em" }}
                            >
                              {it}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
