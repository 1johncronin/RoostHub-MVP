-- SEED DATA FOR ROOSTHUB MVP

-- 1. Create a demo user if not exists (Note: usually done via auth.users, but we seed profiles)
-- We'll use a specific UUID for the demo user
-- INSERT INTO profiles (id, username, full_name, role, verification_level, email_verified_at, phone_verified_at)
-- VALUES ('00000000-0000-0000-0000-000000000000', 'demo_rider', 'Demo Rider', 'user', 'verified', NOW(), NOW())
-- ON CONFLICT DO NOTHING;

-- 2. Seed Listings (Machines)
INSERT INTO listings (id, seller_id, title, description, price, type, status, location_name, location_lat, location_lng, is_featured)
VALUES 
('e1b1a1a1-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', '2024 KTM 300 XC-W', 'Mint condition 2024 KTM 300 XC-W. 12 hours total. FMF pipe, Renthal bars.', 9800, 'machine', 'active', 'Hood River, OR', 45.7082, -121.5175, true),
('e2b2a2a2-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', '2023 Yamaha YZ450F', 'Race ready YZ450F. Suspension done by Factory Connection. Yoshimura exhaust.', 8500, 'machine', 'active', 'Portland, OR', 45.5152, -122.6784, false),
('e3b3a3a3-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'Secure Shop Space', 'Heated shop space with 24/7 access and security cameras.', 200, 'storage', 'active', 'Bend, OR', 44.0582, -121.3153, true);

-- 3. Seed Machines Details
INSERT INTO machines (listing_id, year, make, model, category, hours, mileage, condition)
VALUES 
('e1b1a1a1-1111-1111-1111-111111111111', 2024, 'KTM', '300 XC-W', 'Enduro', 12, 0, 'excellent'),
('e2b2a2a2-2222-2222-2222-222222222222', 2023, 'Yamaha', 'YZ450F', 'Motocross', 25, 0, 'excellent');

-- 4. Seed Storage Details
INSERT INTO storage_spaces (listing_id, space_type, size_sqft, has_security, has_climate_control, access_type)
VALUES 
('e3b3a3a3-3333-3333-3333-333333333333', 'Shop', 400, true, true, '24/7');

-- 5. Seed Media (Unsplash placeholders)
INSERT INTO listing_media (listing_id, url, media_type, sort_order)
VALUES 
('e1b1a1a1-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1200&auto=format&fit=crop', 'image', 0),
('e2b2a2a2-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1200&auto=format&fit=crop', 'image', 0),
('e3b3a3a3-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop', 'image', 0);

-- 6. Seed Maintenance Logs
INSERT INTO maintenance_logs (machine_id, user_id, service_type, hours, notes)
VALUES 
('e1b1a1a1-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'Oil Change', 5, 'First service completed.'),
('e1b1a1a1-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'Air Filter', 10, 'Cleaned after dusty ride.');
