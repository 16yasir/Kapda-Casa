import { Html, useProgress } from '@react-three/drei';

export function LoadingFallback() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center min-w-[120px]">
        <div className="w-8 h-8 border border-black/20 border-t-black/80 rounded-full animate-spin mb-3"></div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-ink opacity-50">{progress.toFixed(0)}% LOADED</div>
      </div>
    </Html>
  );
}
