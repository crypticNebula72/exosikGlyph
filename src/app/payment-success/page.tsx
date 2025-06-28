"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [redirectStatus, setRedirectStatus] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionEndDateDisplay, setSubscriptionEndDateDisplay] = useState<string | null>(null);

  const db = getFirestore();

  // Update state from URL search params
  useEffect(() => {
    setPaymentIntent(searchParams.get("payment_intent"));
    setRedirectStatus(searchParams.get("redirect_status"));
  }, [searchParams]);

  // Fetch payment details only after session is ready and payment succeeded
  useEffect(() => {
    if (status !== "authenticated") return; // Wait until session is authenticated
    if (paymentIntent && redirectStatus === "succeeded") {
      fetchPaymentDetails(paymentIntent);
    }
  }, [paymentIntent, redirectStatus, status]);

  const fetchPaymentDetails = async (paymentIntentId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payment-success?payment_intent=${paymentIntentId}`);
      const data = await response.json();

      if (data.success) {
        setAmount(data.amount);
        if (session?.user?.email) {
          await updateUserStatusToPro(session.user.email);
        } else {
          console.error("User email missing from session");
        }
      } else {
        console.error("Failed to fetch payment details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update Firestore user document to Pro status
  const updateUserStatusToPro = async (userEmail: string): Promise<void> => {
    try {
      const userRef = doc(db, "users", userEmail);
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30); // 30-day subscription

      await updateDoc(userRef, {
        subscription_status: "pro",
        subscription_end: subscriptionEndDate,
      });

      setSubscriptionEndDateDisplay(subscriptionEndDate.toDateString());
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading session info...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">Your payment was successful!</h2>

        {loading ? (
          <p>Loading payment details...</p>
        ) : (
          amount && (
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
              ${amount}
            </div>
          )
        )}

        {subscriptionEndDateDisplay && (
          <p className="text-lg mt-4">
            Your subscription is valid until: {subscriptionEndDateDisplay}
          </p>
        )}
      </div>
    </main>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading payment details...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
