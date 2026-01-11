-- Maintenance Logs for Garage Machines
CREATE TABLE maintenance_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  machine_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  service_type TEXT NOT NULL, -- e.g., 'Oil Change', 'Top End', 'Suspension'
  hours FLOAT,
  mileage FLOAT,
  notes TEXT,
  parts_used JSONB, -- List of parts replaced
  performed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Part Fitment (Many-to-Many relationship)
CREATE TABLE part_fitment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  part_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year_start INT,
  year_end INT
);

-- RLS
ALTER TABLE maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE part_fitment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own maintenance logs." ON maintenance_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own maintenance logs." ON maintenance_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Part fitment is publicly viewable." ON part_fitment FOR SELECT USING (true);
