// Zipcode lookup utility - enter zip, get everything

export interface ZipcodeData {
  zipcode: string;
  city: string;
  state: string;
  stateAbbr: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation_ft?: number;
}

// Use Zippopotam.us (free, no API key needed)
export async function lookupZipcode(zipcode: string): Promise<ZipcodeData | null> {
  const cleaned = zipcode.replace(/\D/g, '').slice(0, 5);

  if (cleaned.length !== 5) {
    return null;
  }

  try {
    // Get city/state/coords from Zippopotam.us
    const response = await fetch(`https://api.zippopotam.us/us/${cleaned}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const place = data.places?.[0];

    if (!place) {
      return null;
    }

    const lat = parseFloat(place.latitude);
    const lng = parseFloat(place.longitude);

    // Get elevation from Open-Elevation API
    let elevation_ft: number | undefined;
    try {
      const elevResponse = await fetch(
        `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`
      );
      if (elevResponse.ok) {
        const elevData = await elevResponse.json();
        const elevMeters = elevData.results?.[0]?.elevation;
        if (elevMeters !== undefined) {
          elevation_ft = Math.round(elevMeters * 3.28084); // Convert to feet
        }
      }
    } catch {
      // Elevation lookup failed, continue without it
    }

    return {
      zipcode: cleaned,
      city: place['place name'],
      state: place.state,
      stateAbbr: place['state abbreviation'],
      country: 'US',
      latitude: lat,
      longitude: lng,
      elevation_ft,
    };
  } catch (error) {
    console.error('Zipcode lookup failed:', error);
    return null;
  }
}

// Quick elevation estimate based on state (fallback)
export function estimateElevation(stateAbbr: string): number {
  const stateElevations: Record<string, number> = {
    'CO': 6800, 'WY': 6700, 'NM': 5700, 'UT': 6100, 'NV': 5500,
    'AZ': 4100, 'ID': 5000, 'MT': 3400, 'OR': 3300, 'WA': 1700,
    'CA': 2900, 'SD': 2200, 'NE': 2600, 'KS': 2000, 'OK': 1300,
    'TX': 1700, 'MN': 1200, 'IA': 1100, 'MO': 800, 'AR': 650,
    'LA': 100, 'WI': 1050, 'IL': 600, 'MI': 900, 'IN': 700,
    'OH': 850, 'KY': 750, 'TN': 900, 'MS': 300, 'AL': 500,
    'GA': 600, 'FL': 100, 'SC': 350, 'NC': 700, 'VA': 950,
    'WV': 1500, 'PA': 1100, 'NY': 1000, 'VT': 1000, 'NH': 1000,
    'ME': 600, 'MA': 500, 'CT': 500, 'RI': 200, 'NJ': 250,
    'DE': 60, 'MD': 350, 'DC': 150, 'AK': 1900, 'HI': 3030,
  };
  return stateElevations[stateAbbr] || 1000;
}
