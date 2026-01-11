-- Enable PostGIS for radius searches
CREATE EXTENSION IF NOT EXISTS postgis;

-- Update Profiles with location info
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'USA',
ADD COLUMN IF NOT EXISTS lat FLOAT,
ADD COLUMN IF NOT EXISTS lng FLOAT;

-- Update Listings with postal code and spatial point
ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS postal_code TEXT;

-- Create a spatial column for better performance on radius searches
-- We use geography for accurate distance measurements in meters
ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS geo_location geography(POINT);

-- Function to update geo_location from lat/lng
CREATE OR REPLACE FUNCTION update_listing_geo_location()
RETURNS trigger AS $$
BEGIN
  IF NEW.location_lat IS NOT NULL AND NEW.location_lng IS NOT NULL THEN
    NEW.geo_location := ST_SetSRID(ST_Point(NEW.location_lng, NEW.location_lat), 4326)::geography;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to keep geo_location in sync
CREATE TRIGGER trigger_update_listing_geo_location
BEFORE INSERT OR UPDATE OF location_lat, location_lng ON listings
FOR EACH ROW EXECUTE FUNCTION update_listing_geo_location();

-- Index for spatial queries
CREATE INDEX IF NOT EXISTS listings_geo_location_idx ON listings USING GIST (geo_location);
