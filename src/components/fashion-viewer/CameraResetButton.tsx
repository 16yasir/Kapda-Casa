import { Camera } from 'lucide-react';

interface CameraResetButtonProps {
  onClick: () => void;
}

export function CameraResetButton({ onClick }: CameraResetButtonProps) {
  return (
    <div className="flex flex-col items-end gap-1">
      <button 
        onClick={onClick}
        className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-all focus:outline-none"
        aria-label="Reset Camera View"
        title="Reset Camera View"
      >
        <Camera size={18} strokeWidth={1.5} className="text-ink" />
      </button>
      <span className="text-[9px] uppercase tracking-widest opacity-60 text-ink">Reset View</span>
    </div>
  );
}
