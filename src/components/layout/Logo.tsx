import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {/* Goggle Icon */}
      <svg width="45" height="25" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
        {/* Frame */}
        <path 
          d="M10 40 C10 20 30 15 50 15 C70 15 85 25 90 40 C95 25 110 15 130 15 C150 15 170 20 170 40 C170 65 150 85 130 85 C110 85 95 75 90 60 C85 75 70 85 50 85 C30 85 10 65 10 40 Z" 
          stroke="currentColor" 
          strokeWidth="12" 
          fill="none" 
          strokeLinejoin="round"
        />
        {/* Strap mounts */}
        <rect x="0" y="30" width="12" height="20" rx="2" fill="currentColor" />
        <rect x="168" y="30" width="12" height="20" rx="2" fill="currentColor" />
        {/* Lens Play Button (The Ultraviolet Accent) */}
        <path d="M115 50 L135 62 L135 38 Z" fill="#6B2CF5" />
      </svg>

      {!iconOnly && (
        <span className="font-roboto-condensed font-black italic text-2xl tracking-tighter uppercase">
          Roost<span className="text-primary">Hub</span>
        </span>
      )}
    </div>
  );
}
