import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27-preview' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const listingId = session.client_reference_id;
    const supabase = await createClient();

    if (listingId) {
      // 1. Update listing status to featured
      const featuredUntil = new Date();
      featuredUntil.setDate(featuredUntil.getDate() + 7); // 7 days boost

      const { error: updateError } = await supabase
        .from('listings')
        .update({
          is_featured: true,
          featured_until: featuredUntil.toISOString(),
        })
        .eq('id', listingId);

      if (updateError) {
        console.error('Failed to update listing boost:', updateError);
      }

      // 2. Log promotion
      await supabase.from('listing_promotions').insert({
        listing_id: listingId,
        stripe_checkout_session_id: session.id,
        amount_paid: session.amount_total ? session.amount_total / 100 : 0,
        promotion_type: 'boost',
        start_time: new Date().toISOString(),
        end_time: featuredUntil.toISOString(),
      });
    }
  }

  return NextResponse.json({ received: true });
}
