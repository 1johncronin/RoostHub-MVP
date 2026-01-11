import Link from 'next/link';
import { MapPin, Tag } from 'lucide-react';

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
}

export function ListingCard({ id, title, price, currency, location, imageUrl, type, make, model, year }: ListingCardProps) {
  return (
    <Link href={`/listing/${id}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-xl bg-card border border-border transition-all hover:shadow-lg hover:border-primary/50 h-full flex flex-col">
        {/* Image / Placeholder */}
        <div className="aspect-[4/3] w-full bg-muted relative overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground bg-secondary">
              <span className="text-sm font-medium">No Photo</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            {type}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          
          <div className="text-xl font-roboto-condensed font-bold italic text-primary">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)}
          </div>

          {(make || model || year) && (
             <div className="text-sm text-muted-foreground font-medium">
                {year} {make} {model}
             </div>
          )}

          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-[120px]">{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
