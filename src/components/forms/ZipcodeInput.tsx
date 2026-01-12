'use client';

import { useState, useEffect } from 'react';
import { MapPin, Loader2, CheckCircle, Mountain } from 'lucide-react';
import { getLocationFromZipcode } from '@/app/actions/zipcode';

interface ZipcodeInputProps {
  onLocationFound?: (data: {
    zipcode: string;
    city: string;
    state: string;
    stateAbbr: string;
    latitude: number;
    longitude: number;
    elevation_ft?: number;
  }) => void;
  showElevation?: boolean;
  className?: string;
  defaultZipcode?: string;
}

export function ZipcodeInput({
  onLocationFound,
  showElevation = false,
  className = '',
  defaultZipcode = '',
}: ZipcodeInputProps) {
  const [zipcode, setZipcode] = useState(defaultZipcode);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{
    city: string;
    state: string;
    elevation_ft?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-lookup when 5 digits entered
  useEffect(() => {
    const cleaned = zipcode.replace(/\D/g, '');
    if (cleaned.length === 5) {
      handleLookup(cleaned);
    } else {
      setLocation(null);
      setError(null);
    }
  }, [zipcode]);

  async function handleLookup(zip: string) {
    setLoading(true);
    setError(null);

    const result = await getLocationFromZipcode(zip);

    if (result.error) {
      setError(result.error);
      setLocation(null);
    } else if (result.data) {
      setLocation({
        city: result.data.city,
        state: result.data.stateAbbr,
        elevation_ft: result.data.elevation_ft,
      });
      onLocationFound?.(result.data);
    }

    setLoading(false);
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 block">
        Zipcode
      </label>
      <div className="relative">
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value.replace(/\D/g, '').slice(0, 5))}
          placeholder="Enter zipcode"
          className="w-full p-3 pl-10 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold"
          maxLength={5}
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
        )}
        {location && !loading && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {location && (
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-primary">
            {location.city}, {location.state}
          </span>
          {showElevation && location.elevation_ft && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Mountain className="h-3 w-3" />
              {location.elevation_ft.toLocaleString()} ft
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Compact inline version for calculators
export function ZipcodeQuickLookup({
  onElevationFound,
}: {
  onElevationFound: (elevation: number, city: string, state: string) => void;
}) {
  const [zipcode, setZipcode] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLookup() {
    if (zipcode.length !== 5) return;
    setLoading(true);

    const result = await getLocationFromZipcode(zipcode);

    if (result.data) {
      const elevation = result.data.elevation_ft || 1000;
      onElevationFound(elevation, result.data.city, result.data.stateAbbr);
    }

    setLoading(false);
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value.replace(/\D/g, '').slice(0, 5))}
        onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
        placeholder="Zipcode"
        className="w-24 p-2 rounded-lg bg-muted/50 border border-border text-sm font-bold text-center"
        maxLength={5}
      />
      <button
        onClick={handleLookup}
        disabled={zipcode.length !== 5 || loading}
        className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-bold disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
      </button>
    </div>
  );
}
