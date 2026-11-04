import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
  duration = 0.7,
  y = 30,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  // Track whether the animation has fully finished so we can drop will-change
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
            setDone(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        transition: `opacity ${duration}s ease, transform ${duration}s ease`,
        transitionDelay: `${delay}s`,
        // Apply will-change only while animating, remove it once done
        willChange: done ? "auto" : "opacity, transform",
      }}
      onTransitionEnd={() => {
        if (visible) setDone(true);
      }}
    >
      {children}
    </Tag>
  );
}
