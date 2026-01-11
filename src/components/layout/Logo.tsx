import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center select-none group", className)}>
      <div className="relative flex flex-col items-center">
        {/* Roost Swoosh (Vivid Ultraviolet) */}
        <svg 
          width="80" 
          height="14" 
          viewBox="0 0 100 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mb-[-6px] ml-6 transition-transform duration-500 group-hover:translate-x-2"
        >
          <path 
            d="M5 15 Q40 5 95 2" 
            stroke="#8B5CF6" 
            strokeWidth="4" 
            strokeLinecap="round" 
            className="opacity-40"
          />
          <path 
            d="M15 10 Q50 0 100 5" 
            stroke="#6B2CF5" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </svg>

        {/* Wordmark: Bold ROOST, Gradient HUB */}
        <span className="font-space-grotesk tracking-tighter uppercase italic flex items-baseline">
          <span className="font-bold text-2xl text-foreground">ROOST</span>
          <span className="font-black text-2xl bg-clip-text text-transparent bg-gradient-to-br from-[#6B2CF5] via-[#8B5CF6] to-[#D8B4FE] ml-1">
            HUB
          </span>
        </span>
      </div>
    </div>
  );
}
