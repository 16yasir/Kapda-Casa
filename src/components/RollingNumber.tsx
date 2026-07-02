import { useEffect, useRef, useState } from "react";

interface RollingNumberProps {
  target: number;
  suffix?: string;
  isHovered?: boolean;
}

export function RollingNumber({ target, suffix = "", isHovered = false }: RollingNumberProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) {
      setIsSnapping(true);
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsSnapping(false);
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const digits = target.toString().split("");

  return (
    <div
      ref={ref}
      className="inline-flex overflow-hidden"
      style={{ height: "1.3em", lineHeight: "1.3", margin: "-0.15em 0" }}
    >
      {digits.map((digitStr, i) => {
        const digit = parseInt(digitStr, 10);
        
        // Stagger logic: 
        // 1st digit just goes 0->target (fastest).
        // 2nd digit spins 0->target+10 to ensure a full rotation and trailing zeros still roll.
        const spinCount = i > 0 ? digit + 10 : digit;
        
        const columnDigits = [];
        for (let n = 0; n <= spinCount; n++) {
          columnDigits.push(n % 10);
        }

        return (
          <div
            key={i}
            className="flex flex-col transition-transform"
            style={{
              gap: "0.2em", // Provides space for descenders so they don't bleed into the next digit's box
              transform: isVisible ? `translateY(-${(columnDigits.length - 1) * 1.5}em)` : "translateY(0em)",
              transitionDuration: isSnapping ? "0s" : "1.5s",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isSnapping ? "0s" : `${i * 0.08}s`,
            }}
          >
            {columnDigits.map((n, idx) => (
              <span key={idx} className="flex items-center justify-center" style={{ height: "1.3em", lineHeight: "1.3" }}>
                {n}
              </span>
            ))}
          </div>
        );
      })}
      
      {suffix && (
        <span className="flex items-center justify-center" style={{ height: "1.3em", lineHeight: "1.3" }}>
          {suffix}
        </span>
      )}
    </div>
  );
}
