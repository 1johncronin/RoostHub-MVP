-- Invite System for RoostHub
CREATE TABLE invite_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE viral_invites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invite_code_id UUID REFERENCES invite_codes(id) ON DELETE CASCADE,
  inviter_id UUID REFERENCES profiles(id) NOT NULL,
  invitee_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, accepted
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own invite codes." ON invite_codes FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Users can view own sent invites." ON viral_invites FOR SELECT USING (auth.uid() = inviter_id);

-- Add 'boost_credits' to profiles for viral reward
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS boost_credits INT DEFAULT 0;
