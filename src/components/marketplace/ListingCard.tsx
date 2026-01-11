import Link from 'next/link';
import { MapPin, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  currency: string;
  location?: string;
  imageUrl?: string;
  type: string;
  make?: string;
  model?: string;
  year?: number;
  isFeatured?: boolean;
}

export function ListingCard({ id, title, price, currency, location, imageUrl, type, make, model, year, isFeatured }: ListingCardProps) {
  return (
    <Link href={`/listing/${id}`} className="group block h-full">
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-card border transition-all h-full flex flex-col hover:shadow-2xl hover:-translate-y-1",
        isFeatured 
          ? "border-primary/50 shadow-[0_0_20px_-10px_rgba(107,44,245,0.3)] ring-1 ring-primary/20" 
          : "border-border hover:border-primary/30"
      )}>
        {/* Image / Placeholder */}
        <div className="aspect-[4/3] w-full bg-muted relative overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground bg-secondary/50">
              <span className="text-sm font-bold uppercase italic opacity-50">No Photo</span>
            </div>
          )}
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-tighter italic border border-white/10">
                {type}
            </div>
            {isFeatured && (
                <div className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-tighter italic flex items-center gap-1 border border-primary-foreground/20 animate-pulse">
                    <Zap className="h-3 w-3 fill-current" />
                    Featured
                </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors uppercase italic font-space-grotesk tracking-tight">
              {title}
            </h3>
          </div>
          
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black italic text-primary font-space-grotesk tracking-tighter">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)}
            </span>
          </div>

          {(make || model || year) && (
             <div className="text-xs text-muted-foreground font-bold uppercase tracking-tight flex items-center gap-2">
                {year} {make} {model}
             </div>
          )}

          <div className="mt-auto flex items-center justify-between text-[10px] text-muted-foreground/80 font-black uppercase italic pt-3 border-t border-border/50 tracking-widest">
            {location ? (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="truncate max-w-[140px]">{location}</span>
              </div>
            ) : (
                <span>Worldwide Shipping</span>
            )}
            <div className="flex items-center gap-1 text-primary">
                <ShieldCheck className="h-3 w-3" />
                VERIFIED
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
