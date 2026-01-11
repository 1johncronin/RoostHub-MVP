import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center select-none group", className)}>
      {/* Twin Arc Roost Swoosh */}
      <svg 
        width="100" 
        height="16" 
        viewBox="0 0 120 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mb-[-6px] ml-10 transition-transform duration-500 group-hover:translate-x-2"
      >
        <path 
          d="M10 18 Q50 5 110 2" 
          stroke="#7C3AED" 
          strokeWidth="3" 
          strokeLinecap="round" 
          className="opacity-60"
        />
        <path 
          d="M25 14 Q60 2 115 6" 
          stroke="#7C3AED" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark: Space Grotesk, Boldest possible, italic */}
      <span className="font-space-grotesk italic tracking-tighter uppercase flex items-baseline">
        <span className="font-[900] text-3xl text-foreground">ROOST</span>
        <span className="font-[900] text-3xl text-primary ml-0.5">HUB</span>
      </span>
    </div>
  );
}
