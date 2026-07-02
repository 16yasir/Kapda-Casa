import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ModelErrorBoundary } from './ModelErrorBoundary';

export function Avatar({ modelUrl }: { modelUrl: string }) {
  return (
    <ModelErrorBoundary fallback={<FallbackPrimitive />}>
      <RealAvatar url={modelUrl} />
    </ModelErrorBoundary>
  );
}

function RealAvatar({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) {
        material.envMapIntensity = 1.0;
      }
    }
  });

  return <primitive object={scene} />;
}

function FallbackPrimitive() {
  return (
    <group position={[0, 1, 0]}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.25, 1.2, 4, 16]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.8, 0.15]} castShadow receiveShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/avatar-base.glb');
useGLTF.preload('/models/avatar-outfit-1.glb');
useGLTF.preload('/models/avatar-outfit-2.glb');
useGLTF.preload('/models/avatar-outfit-3.glb');
