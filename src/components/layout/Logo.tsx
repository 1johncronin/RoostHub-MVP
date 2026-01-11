import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      {/* Horizon Track Icon */}
      <svg width="45" height="30" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
        {/* Terrain Line / Jump */}
        <path 
          d="M0 80 H30 L50 40 L70 80 H120" 
          stroke="currentColor" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Play Button at Apex (The Ultraviolet Accent) */}
        <path d="M60 25 L85 42 L60 60 V25 Z" fill="#6B2CF5" />
      </svg>

      {!iconOnly && (
        <span className="font-space-grotesk tracking-tight uppercase flex items-baseline">
          <span className="font-bold text-2xl">ROOST</span>
          <span className="font-light text-2xl opacity-80">HUB</span>
        </span>
      )}
    </div>
  );
}
