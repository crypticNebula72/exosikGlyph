"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [redirectStatus, setRedirectStatus] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionEndDateDisplay, setSubscriptionEndDateDisplay] = useState<string | null>(null);
  const db = getFirestore();

  // Update state when URL params change
  useEffect(() => {
    setPaymentIntent(searchParams.get("payment_intent"));
    setRedirectStatus(searchParams.get("redirect_status"));
  }, [searchParams]);

  // Fetch payment details
  useEffect(() => {
    console.log("useEffect triggered with:", { paymentIntent, redirectStatus });

    if (paymentIntent && redirectStatus === "succeeded") {
      fetchPaymentDetails(paymentIntent);
    }
  }, [paymentIntent, redirectStatus]);

  const fetchPaymentDetails = async (paymentIntentId: string) => {
    setLoading(true);
    try {
      console.log("Fetching payment details for:", paymentIntentId);
      const response = await fetch(`/api/payment-success?payment_intent=${paymentIntentId}`);

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Received data:", data);

      if (data.success) {
        setAmount(data.amount);
        if (session?.user?.email) {
          console.log("Calling updateUserStatusToPro for:", session.user.email);
          updateUserStatusToPro(session.user.email);
        } else {
          console.error("Session user email is null. User not logged in?");
        }
      } else {
        console.error("Error fetching payment details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatusToPro = async (userEmail: string): Promise<void> => {
    console.log("updateUserStatusToPro function triggered for:", userEmail);

    try {
      const userRef = doc(db, "users", userEmail);
      console.log("Firestore document reference:", userRef.path);

      const subscriptionEndDate = new Date();
      subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);

      await updateDoc(userRef, {
        subscription_status: "pro",
        subscription_end: subscriptionEndDate,
      });

      setSubscriptionEndDateDisplay(subscriptionEndDate.toDateString());
      console.log("User status successfully updated to Pro.");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

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
          <p className="text-lg mt-4">Your subscription is valid until: {subscriptionEndDateDisplay}</p>
        )}
      </div>
    </main>
  );
};

export default PaymentSuccess;
