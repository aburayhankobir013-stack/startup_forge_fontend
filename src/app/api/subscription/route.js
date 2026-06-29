import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const PRICE_ID = "price_1TnbeNQ5F7UhvsPwNWvjkgyF";
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    )
  }
};