import { Suspense, lazy, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const FashionViewer = lazy(() => import('./FashionViewer'));

export default function TryOnSection() {
  const [activeOutfit, setActiveOutfit] = useState('/models/avatar-base.glb');

  const outfits = [
    { id: 1, glb: '/models/avatar-outfit-1.glb', thumb: '/models/avatar-outfit-1.webp' },
    { id: 2, glb: '/models/avatar-outfit-2.glb', thumb: '/models/avatar-outfit-2.webp' },
    { id: 3, glb: '/models/avatar-outfit-3.glb', thumb: '/models/avatar-outfit-3.webp' },
  ];

  return (
    <section className="w-full bg-white py-16 px-12">
      <div className="mb-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-mute font-medium">
          Try It On
        </span>
        <h2 className="section-heading mt-3">
          See It On You.
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full md:h-[620px] overflow-hidden">
        {/* Left column: Outfit thumbnails — ~20% on desktop, horizontal row on mobile */}
        <div className="w-full md:w-1/5 h-[120px] md:h-full flex flex-col shrink-0">
          <span className="text-[11px] uppercase tracking-[0.3em] text-mute font-medium mb-3 shrink-0">
            Choose a Look
          </span>
          <div className="flex flex-row md:flex-col gap-3 flex-1 min-h-0">
            {outfits.map((outfit) => (
              <OutfitThumbnail
                key={outfit.id}
                outfit={outfit}
                isActive={activeOutfit === outfit.glb}
                onClick={() => setActiveOutfit(outfit.glb)}
              />
            ))}
          </div>
        </div>

        {/* Right column: 3D Viewer — ~80% on desktop, full width on mobile */}
        <div className="relative w-full md:w-4/5 h-[480px] md:h-full border border-black/10 overflow-hidden">
          <Suspense 
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-8 h-8 border border-black/20 border-t-black/80 rounded-full animate-spin mb-3"></div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">
                  Initializing Viewer...
                </p>
              </div>
            }
          >
            <FashionViewer modelUrl={activeOutfit} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function OutfitThumbnail({ 
  outfit, 
  isActive, 
  onClick 
}: { 
  outfit: { id: number; glb: string; thumb: string }; 
  isActive: boolean; 
  onClick: () => void 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 120, mass: 1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * 4;
    const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * 4;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex-1 min-h-0 min-w-0 overflow-hidden cursor-pointer transition-all ${
        isActive
          ? 'border-2 border-black'
          : 'border border-black/10 hover:border-black/30'
      }`}
    >
      <motion.img
        src={outfit.thumb}
        alt={`Outfit ${outfit.id}`}
        className="w-full h-full object-cover object-top block"
        draggable={false}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        style={{
          x: smoothX,
          y: smoothY,
        }}
        transition={{
          scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
      />
    </div>
  );
}
