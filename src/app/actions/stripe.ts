'use server';

import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27-preview' as any,
  });
}

export async function createBoostCheckout(listingId: string) {
  const stripe = getStripe();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', listingId)
    .single();

  if (!listing) throw new Error('Listing not found');

  const origin = (await headers()).get('origin');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Boost Listing: ${listing.title}`,
            description: 'Featured placement in marketplace search results for 7 days.',
          },
          unit_amount: 1900, // $19.00
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/garage?success=true`,
    cancel_url: `${origin}/garage?canceled=true`,
    customer_email: user.email,
    client_reference_id: listingId,
    metadata: {
      listingId: listingId,
      userId: user.id,
      type: 'boost',
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}
