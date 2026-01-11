-- 1. Notifications Table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'dream_match', -- 'dream_match', 'message', 'system'
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Dream Match Logic (Postgres Trigger)
CREATE OR REPLACE FUNCTION check_garage_dreams()
RETURNS trigger AS $$
BEGIN
  -- Find users whose 'Dreams' match this new listing
  INSERT INTO notifications (user_id, title, content, type, link)
  SELECT 
    d.user_id,
    '🏁 Dream Match Found!',
    'A ' || NEW.title || ' was just listed near you!',
    'dream_match',
    '/listing/' || NEW.id
  FROM garage_dreams d
  JOIN listings l ON l.id = NEW.id
  JOIN machines m ON m.listing_id = l.id
  WHERE 
    -- Match Make
    (d.dream_make IS NULL OR d.dream_make = m.make) AND
    -- Match Model
    (d.dream_model IS NULL OR d.dream_model = m.model) AND
    -- Match Price
    (d.max_price IS NULL OR l.price <= d.max_price) AND
    -- Match Year
    (d.min_year IS NULL OR m.year >= d.min_year);
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_dream_notifications
AFTER INSERT ON listings
FOR EACH ROW
EXECUTE FUNCTION check_garage_dreams();

-- RLS for Notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notifications." ON notifications FOR ALL USING (auth.uid() = user_id);
