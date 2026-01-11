-- Tracking for daily invite limit
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS daily_invites_sent INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_invite_sent_at TIMESTAMPTZ DEFAULT NOW();

-- Logic to reset daily count automatically when a new day starts
CREATE OR REPLACE FUNCTION check_invite_refill() 
RETURNS trigger AS $$
BEGIN
  IF NEW.last_invite_sent_at < CURRENT_DATE THEN
    NEW.daily_invites_sent := 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_invite_refill
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION check_invite_refill();
