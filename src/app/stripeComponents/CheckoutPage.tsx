/* eslint-disable */

"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession(); // Get user session
  const db = getFirestore();

  useEffect(() => {
    if (!session) return; // Only proceed if user is logged in
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, session]);

  // Function to update user to Pro after payment success
  const updateUserStatusToPro = async (userEmail: string, transactionId: string): Promise<void> => {
    try {
      const userRef = doc(db, "users", userEmail);
      const currentDate = new Date();
      const subscriptionEndDate = new Date(currentDate.setDate(currentDate.getDate() + 30)); // +30 days subscription

      await updateDoc(userRef, {
        subscription_status: "pro",
        transaction_id: transactionId,
        subscription_end: subscriptionEndDate,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    // @ts-ignore
    const { paymentIntent, error } = await stripe.confirmPayment({

      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded" && session?.user?.email) {
      await updateUserStatusToPro(session.user.email, paymentIntent.id);
    }

    setLoading(false);
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[350px]">
        <div
          className="bg-backgroundColor rounded-xl px-8 py-10 flex flex-col items-center max-w-md w-full border"
          style={{ boxShadow: 'var(--box-shadow, 0 0px 20px rgba(27, 37, 89, 0.35), 0 0px 65px rgba(27, 37, 89, 0.25))' }}
        >
          <svg className="w-14 h-14 text-iconColorsFunctional mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M4 20c0-2.5 3.5-4.5 8-4.5s8 2 8 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <h2 className="text-2xl font-bold text-headerColor mb-2">Sign In Required</h2>
          <p className="text-smallText mb-6 text-center">Please sign in to proceed to checkout and complete your purchase.</p>
          <Link href="/signin" className="px-6 py-2 bg-gradient-to-r from-proColor to-proFill text-buttonText rounded-lg font-semibold shadow transition text-lg">Sign In</Link>
        </div>
      </div>
    );
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-surface dark:text-white"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && (
        <PaymentElement options={{ layout: 'tabs', paymentMethodOrder: ['card'] }} />
      )}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
