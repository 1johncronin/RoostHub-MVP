PRD — RoostHub (Updated)
0) One-liner

RoostHub is the marketplace + social + media-creation engine for dirt & snow motorsports—buy/sell machines, parts, and gear, showcase builds, and generate share-ready clips in one tap.

1) Product Principles

All brands, all riders: RoostHub must never “feel like KTM” or “feel like Suzuki.”

Video-first: every listing and post should be optimized for video and sharing.

Trust is a feature: verification and moderation are part of the UX, not an afterthought.

Create once, share everywhere: RoostHub is a content factory with deep links and rich previews.

2) MVP Goals (Day-1)

Marketplace

Machines + Parts + Gear live with best-in-class listing UX.

Search + filters + saved searches + alerts.

In-app messaging + offers.

Payments

Stripe integration Day 1 for:

Boosts / featured listings

Optional checkout for parts/gear (and optionally deposits for machines)

Trust

Email + phone verification mandatory.

Optional ID verification later (badge).

Social

Profiles + Garage + Feed + likes/comments/follows + share.

DJ Booth

Upload clips → auto-generated reel templates → publish to RoostHub → share to socials.

Virality

Deep links + rich previews for every listing/post/clip.

3) Key Features (MVP Spec)
3.1 Auth & Verification (Required)

Supabase Auth

Email verification required

Phone verification required (OTP/SMS provider via Supabase or Twilio)

Enforce verified status before:

publishing a listing

sending messages (or at least starting new threads)

3.2 Marketplace (Machines / Parts / Gear)

Listing Types

Machines: dirt bikes, snowmobiles, timbersleds, ATVs/UTVs

Parts

Gear/Apparel

Media Requirements

Machines: min 6 photos + 1 video strongly encouraged (soft gate MVP, hard gate later)

Parts/Gear: min 3 photos; video optional

Machine fields

year/make/model, hours/miles, condition grade, title status (if relevant), mods, service notes

location + shipping/pickup options

Search

make/model/year/price/distance/condition/shipping available

saved searches + push/email alerts

Messaging

listing-based threads

offer workflow (“Make Offer”, “Accept/Counter/Decline”)

3.3 Stripe Payments (Day 1)

Day-1 Payment Use Cases

Featured/Boosted Listings

Parts/Gear Checkout (optional but recommended MVP)

Machine Deposits (optional “reserve” flow; full escrow later)

Stripe components

Stripe Checkout (fastest)

Stripe Payment Links (option) for simplicity

Stripe Connect (Phase 2) if you want marketplace payouts to sellers; MVP can start with platform-processed payments or “pay seller” model.

Apple/App Store note: Stripe is always allowed for physical goods/services; your marketplace is physical goods heavy, which is favorable under App Store rules. Still follow Apple’s general guidelines and don’t treat RoostHub as a “digital goods subscription store” inside the wrapper unless you handle eligibility properly.

3.4 DJ Booth (AI Clip Creator) + Music

DJ Booth v1

Upload: multiple clips + photos

Templates: Ride Reel / Build Progress / For Sale Highlight

Auto edits:

highlight detection (motion peaks)

trims (7/15/30s)

format outputs: 9:16 + 1:1 + 16:9

auto captions (where speech exists)

Music

MVP default: user chooses “No music” or “Upload audio” or “Use RoostHub library”

Optional: Suno integration for AI-generated tracks only if licensing/terms allow for your use case. Suno’s Terms and policy updates can affect ownership/monetization rules—treat as a vendor risk and build behind a feature flag.

3.5 Sharing, Virality & Metadata (MVP Must)

Share UX

Native share sheet in iOS/Android wrapper

“Copy link” everywhere

“Share to…” for listings, posts, and clips

Deep links

If app installed → open exact content

Else → web fallback + install CTA

Rich previews

OpenGraph/Twitter cards for:

listing image + price + key specs

clip thumbnail + creator handle

Direct publishing to socials

MVP: guaranteed native sharing + downloadable output

Phase 2: direct publish APIs (TikTok/Instagram) require approvals/scopes and account types.

TikTok direct post requires approved scopes and specific UX implementation.

Instagram publishing requires container workflow and is typically limited to business accounts.

4) Branding + Logo Requirements (New)
4.1 Name meaning

Roost = rooster tail (dirt/snow spray). This is your “moto” meaning, not birds.

4.2 Logo system requirements

Deliver 3 distinct logo concepts for RoostHub:

Icon-only mark (app icon)

Horizontal lockup (icon + wordmark)

Stacked lockup (square-friendly)

Each concept must include:

Black on white

White on black (reversed-out)

1 accent-color variant (optional)

4.3 Color system constraints (brand-safe)

You’re right: moto brands own colors (KTM orange, Kawi green, Suzuki yellow, Yamaha blue, etc.). RoostHub should avoid feeling like any OEM.

Recommendation

Base palette: charcoal + off-white + grayscale

Single accent color: choose a hue uncommon as “primary” among OEMs:

Ultraviolet / electric purple is a good candidate (distinct, modern, doesn’t scream a major OEM)

Avoid: bright orange, primary red, Kawasaki green, Yamaha blue, Suzuki yellow as main brand accents.

(You can still display OEM colors inside listings/photos; the UI chrome should stay neutral.)

5) MVP Acceptance Criteria (What “Done” Means)

Verified email + phone required to list and message.

Machines/Parts/Gear listing flow supports photo + video.

Search supports all core filters + saved searches + alerts.

Stripe payments live for featured listings; refunds supported.

DJ Booth produces 9:16 reels and publishes to RoostHub feed + generates share output.

Every listing/post has working OG metadata + deep link routing.

Admin tools: moderation queue + user banning + listing removal.