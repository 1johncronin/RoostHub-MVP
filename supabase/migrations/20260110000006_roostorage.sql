-- Add 'storage' to listing_type enum
ALTER TYPE listing_type ADD VALUE 'storage';

-- Storage Spaces Table (1:1 with listings)
CREATE TABLE storage_spaces (
  listing_id UUID REFERENCES listings(id) PRIMARY KEY,
  space_type TEXT NOT NULL, -- 'Garage', 'Shop', 'Trailer Spot', 'Covered'
  size_sqft FLOAT,
  has_security BOOLEAN DEFAULT FALSE,
  has_climate_control BOOLEAN DEFAULT FALSE,
  has_power BOOLEAN DEFAULT FALSE,
  access_type TEXT, -- '24/7', 'Appointment', 'Limited'
  is_verified_space BOOLEAN DEFAULT FALSE
);

-- RLS
ALTER TABLE storage_spaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Storage details are publicly viewable." ON storage_spaces FOR SELECT USING (true);
