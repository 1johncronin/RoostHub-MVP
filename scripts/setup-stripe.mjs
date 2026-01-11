import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function setup() {
  try {
    console.log('🚀 Creating RoostHub Listing Boost product...');
    
    const product = await stripe.products.create({
      name: 'RoostHub Listing Boost',
      description: 'Featured placement in marketplace search results for 7 days.',
      images: ['https://roosthub.vercel.app/window.svg'],
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 1900, // $19.00
      currency: 'usd',
    });

    console.log('✅ Product Created:', product.id);
    console.log('✅ Price Created:', price.id);
    console.log('\n--- ACTION REQUIRED ---');
    console.log('Add this to your .env.local:');
    console.log(`NEXT_PUBLIC_STRIPE_BOOST_PRICE_ID=${price.id}`);
    console.log('------------------------');

  } catch (error) {
    console.error('❌ Error creating product:', error.message);
  }
}

setup();
