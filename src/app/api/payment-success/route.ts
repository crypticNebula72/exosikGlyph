import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentIntentId = searchParams.get("payment_intent");

    console.log("API Request received for paymentIntent:", paymentIntentId);

    if (!paymentIntentId) {
      return NextResponse.json({ success: false, error: "Missing payment_intent" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    console.log("Retrieved paymentIntent:", paymentIntent);

    return NextResponse.json({
      success: true,
      amount: paymentIntent.amount / 100, // Convert cents to dollars
    });
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    return NextResponse.json({ success: false, error: "Failed to retrieve payment intent" }, { status: 500 });
  }
}
