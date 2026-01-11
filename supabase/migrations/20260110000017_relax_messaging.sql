-- Relax Messaging RLS for MVP
DROP POLICY IF EXISTS "Users can create threads if verified." ON message_threads;
CREATE POLICY "Users can create threads." ON message_threads FOR INSERT WITH CHECK (
    auth.uid() = buyer_id
);
