import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CameraResetButton } from './CameraResetButton';
import { LoadingFallback } from './LoadingFallback';
import { Avatar } from './Avatar';
import { motion, AnimatePresence } from 'motion/react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export default function FashionViewer({ modelUrl }: { modelUrl: string }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [showHint, setShowHint] = useState(true);

  const defaultCameraPosition = new THREE.Vector3(0, 1.2, 2.5);
  const defaultTarget = new THREE.Vector3(0, 0.9, 0);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleInteract = () => {
    if (showHint) setShowHint(false);
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.copy(defaultCameraPosition);
      controlsRef.current.target.copy(defaultTarget);
      controlsRef.current.update();
    }
  };

  return (
    <div 
      className="relative w-full h-full min-h-[600px] overflow-hidden" 
      style={{
        backgroundImage: "url('/models/3d-image.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onPointerDown={handleInteract}
      onWheel={handleInteract}
    >
      {/* Semi-transparent overlay for legibility */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(255,252,248,0.40)' }} />
      {/* Corner frame marks */}
      {/* Top-left */}
      <div className="absolute top-4 left-4 pointer-events-none" style={{ width: 28, height: 28 }}>
        <div className="absolute top-0 left-0 w-full" style={{ height: 1, background: 'rgba(0,0,0,0.18)' }} />
        <div className="absolute top-0 left-0 h-full" style={{ width: 1, background: 'rgba(0,0,0,0.18)' }} />
      </div>
      {/* Top-right */}
      <div className="absolute top-4 right-4 pointer-events-none" style={{ width: 28, height: 28 }}>
        <div className="absolute top-0 right-0 w-full" style={{ height: 1, background: 'rgba(0,0,0,0.18)' }} />
        <div className="absolute top-0 right-0 h-full" style={{ width: 1, background: 'rgba(0,0,0,0.18)' }} />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-4 left-4 pointer-events-none" style={{ width: 28, height: 28 }}>
        <div className="absolute bottom-0 left-0 w-full" style={{ height: 1, background: 'rgba(0,0,0,0.18)' }} />
        <div className="absolute bottom-0 left-0 h-full" style={{ width: 1, background: 'rgba(0,0,0,0.18)' }} />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-4 right-4 pointer-events-none" style={{ width: 28, height: 28 }}>
        <div className="absolute bottom-0 right-0 w-full" style={{ height: 1, background: 'rgba(0,0,0,0.18)' }} />
        <div className="absolute bottom-0 right-0 h-full" style={{ width: 1, background: 'rgba(0,0,0,0.18)' }} />
      </div>
      <Canvas
        camera={{ position: defaultCameraPosition, fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
        }}
        shadows
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[2, 3, 2]} 
            intensity={0.8} 
            color="#fff4e6" 
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <directionalLight 
            position={[-2, 1.5, 2]} 
            intensity={0.6} 
            color="#e6f0ff" 
          />
          <spotLight 
            position={[0, 3, -3]} 
            intensity={1} 
            color="#ffffff" 
            angle={Math.PI / 4}
            penumbra={0.8}
          />

          <group position={[0, 0, 0]}>
            <Avatar modelUrl={modelUrl} />
          </group>

          <mesh position={[0, -0.05, 0]} receiveShadow>
            <cylinderGeometry args={[1.2, 1.3, 0.1, 64]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0.05} />
          </mesh>

          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.85} 
            scale={4} 
            blur={2.5} 
            far={1} 
            resolution={1024} 
            color="#000000"
          />

          <Environment preset="studio" background={false} />

          <OrbitControls 
            ref={controlsRef}
            target={defaultTarget}
            enablePan={false}
            minDistance={1.2}
            maxDistance={4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute top-6 left-6 pointer-events-none"
          >
            <div className="px-4 py-2 border border-black/10 bg-white/50 backdrop-blur-sm rounded-full">
              <p className="text-[10px] tracking-widest font-medium text-ink/60">
                DRAG TO ROTATE &middot; SCROLL TO ZOOM
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-10 right-10 z-10">
        <CameraResetButton onClick={handleResetCamera} />
      </div>
    </div>
  );
}
