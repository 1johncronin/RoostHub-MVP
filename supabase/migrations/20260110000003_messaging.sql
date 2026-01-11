-- Messaging: Threads
CREATE TABLE message_threads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES profiles(id) NOT NULL,
  seller_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, buyer_id, seller_id)
);

-- Messaging: Messages
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own threads." ON message_threads FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Users can create threads if verified." ON message_threads FOR INSERT WITH CHECK (
    (auth.uid() = buyer_id) AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND verification_level IN ('verified', 'dealer'))
);

CREATE POLICY "Users can view messages in own threads." ON messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM message_threads WHERE id = thread_id AND (buyer_id = auth.uid() OR seller_id = auth.uid()))
);
CREATE POLICY "Users can send messages in own threads." ON messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (SELECT 1 FROM message_threads WHERE id = thread_id AND (buyer_id = auth.uid() OR seller_id = auth.uid()))
);

-- Realtime enablement
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
