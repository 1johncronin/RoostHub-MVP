import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center select-none group", className)}>
      <div className="relative flex flex-col items-center">
        {/* Roost Swoosh (Elegant Double Arc) */}
        <svg 
          width="80" 
          height="12" 
          viewBox="0 0 100 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mb-[-4px] ml-4 transition-transform group-hover:translate-x-1"
        >
          <path 
            d="M5 15 Q40 5 95 2" 
            stroke="#6B2CF5" 
            strokeWidth="3" 
            strokeLinecap="round" 
            className="opacity-80"
          />
          <path 
            d="M15 10 Q50 0 100 5" 
            stroke="#6B2CF5" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>

        {/* Wordmark: Space Grotesk, Bold ROOST, Regular HUB */}
        <span className="font-space-grotesk tracking-tighter uppercase italic flex items-baseline">
          <span className="font-bold text-2xl text-foreground">ROOST</span>
          <span className="font-medium text-2xl text-primary/90 ml-0.5">HUB</span>
        </span>
      </div>
    </div>
  );
}
