# RoostHub MVP System Design

## 1. System Overview

**Architecture:** Monorepo-style or clean separation using Next.js App Router as the full-stack framework.
**Frontend:** Next.js (React), Tailwind CSS, Lucide Icons. Mobile-first PWA approach.
**Backend/DB:** Supabase (PostgreSQL, GoTrue Auth, Storage, Realtime).
**Payments:** Stripe (Checkout & Webhooks).
**Media Processing:** Supabase Edge Functions + FFmpeg (or specialized media API for MVP) for DJ Booth.

### Core Flows
1.  **User Entry:** Landing -> Auth (Email/Phone) -> Profile Creation -> Dashboard.
2.  **Marketplace:** Search/Filter (Client-side or DB query) -> Listing Detail -> Message/Buy.
3.  **Social:** Feed (Subscription based) -> Create Post/DJ Reel -> Interaction (Like/Comment).
4.  **DJ Booth:** Select Media -> Client-side trim/preview -> Server-side stitch/render -> Publish.

## 2. Database Schema (PostgreSQL)

```sql
-- ENUMS
CREATE TYPE user_role AS ENUM ('user', 'dealer', 'admin');
CREATE TYPE verification_level AS ENUM ('basic', 'verified', 'dealer');
CREATE TYPE listing_type AS ENUM ('machine', 'part', 'gear');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'sold', 'archived');
CREATE TYPE condition_grade AS ENUM ('new', 'excellent', 'good', 'fair', 'salvage');

-- TABLES

-- Profiles (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  verification_level verification_level DEFAULT 'basic',
  email_verified_at TIMESTAMPTZ,
  phone_verified_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listings (Base table for all items)
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  type listing_type NOT NULL,
  status listing_status DEFAULT 'draft',
  location_lat FLOAT,
  location_lng FLOAT,
  location_name TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  featured_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Machines (Specific specs, 1:1 with listings)
CREATE TABLE machines (
  listing_id UUID REFERENCES listings(id) PRIMARY KEY,
  year INT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT, -- e.g., 'Motocross', 'Enduro'
  hours FLOAT,
  mileage FLOAT,
  vin TEXT,
  title_status TEXT,
  condition condition_grade
);

-- Parts (Specific specs, 1:1 with listings)
CREATE TABLE parts (
  listing_id UUID REFERENCES listings(id) PRIMARY KEY,
  part_number TEXT,
  condition condition_grade,
  fitment_notes TEXT
);

-- Media (Photos/Videos for listings)
CREATE TABLE listing_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT NOT NULL, -- 'image' or 'video'
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social: Posts (Standard feed items & DJ Booth outputs)
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  post_type TEXT DEFAULT 'standard', -- 'standard', 'dj_reel', 'listing_share'
  linked_listing_id UUID REFERENCES listings(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interactions
CREATE TABLE likes (
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES posts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES posts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE follows (
  follower_id UUID REFERENCES profiles(id),
  following_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- Payments
CREATE TABLE listing_promotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id),
  stripe_checkout_session_id TEXT,
  amount_paid NUMERIC,
  promotion_type TEXT, -- 'featured', 'bump'
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 3. RLS Policies Outline

*   **Profiles:**
    *   `SELECT`: Public.
    *   `UPDATE`: Users can update their own.
    *   `INSERT`: Triggered by Auth Hook (System only).

*   **Listings:**
    *   `SELECT`: Public (filter by status='active').
    *   `INSERT`: Authenticated users only. **Constraint:** `auth.uid() -> profiles.verification_level >= 'verified'`.
    *   `UPDATE`: Owners only.

*   **Posts:**
    *   `SELECT`: Public.
    *   `INSERT`: Authenticated users.
    *   `DELETE`: Owners or Admins.

*   **Interactions (Likes/Comments):**
    *   `INSERT`: Authenticated users.
    *   `DELETE`: Owners.

## 4. Stripe Flow

1.  **Trigger:** User clicks "Boost Listing" on their listing dashboard.
2.  **Server Action:** Call `stripe.checkout.sessions.create` with `client_reference_id = listing_id` and `metadata = { type: 'featured' }`.
3.  **Redirect:** User goes to Stripe Hosted Checkout.
4.  **Success:**
    *   User redirected to `/dashboard?success=true`.
    *   **Webhook (`checkout.session.completed`):**
        *   Verify signature.
        *   Extract `listing_id` and duration.
        *   Insert into `listing_promotions`.
        *   Update `listings.is_featured = true` and `featured_until`.

## 5. DJ Booth v1 Processing Plan

**MVP approach: Hybrid Client/Server**

1.  **Input:** User selects 3-5 video clips/photos on client.
2.  **Client Processing (Step 1):**
    *   Trim start/end times locally (HTML5 Video API).
    *   Upload raw segments to Supabase Storage bucket `dj-booth-raw/{user_id}/{session_id}/`.
3.  **Processing (Step 2 - Background):**
    *   Trigger Supabase Edge Function via Storage Webhook.
    *   Function uses `ffmpeg.wasm` (if lightweight) or calls external media API (e.g., Cloudinary/Mux or a custom Python worker on Fly.io/Render) to stitch clips + overlay music + add "RoostHub" watermark.
    *   **Fallback MVP:** Client-side stitching using `ffmpeg.wasm` directly in browser if clips are short (< 1 min total). This saves server cost/complexity Day 1.
4.  **Output:**
    *   Save final MP4 to `posts/{user_id}/{post_id}.mp4`.
    *   Create entry in `posts` table.
5.  **Distribution:**
    *   Show in User Feed.
    *   Provide "Download" button.
    *   Share Link (OG Tags point to the video).

