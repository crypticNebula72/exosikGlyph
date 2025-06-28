"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

// Define types for the expected structure of the payment data
interface PaymentData {
  total_amount: number;
  transaction_uuid: string;
}

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const dataQuery = searchParams.get("data");
  const { data: session } = useSession();  // Use session to get current user's info
  const [data, setData] = useState<PaymentData | null>(null); // Set initial state to null
  const [loading, setLoading] = useState<boolean>(false); // Loading state as boolean
  const [subscriptionEndDateDisplay, setSubscriptionEndDateDisplay] = useState<string | null>(null); // Store subscription end date
  const db = getFirestore();

  useEffect(() => {
    if (dataQuery) {
      const resData = atob(dataQuery); // Decode the data query
      const resObject: PaymentData = JSON.parse(resData); // Parse the decoded data with type
      console.log(resObject);
      setData(resObject);
      if (session?.user?.email) {
        updateUserStatusToPro(session.user.email, resObject.transaction_uuid);  // Update user status when payment is successful
      }
    }
  }, [dataQuery, session]);

  // Function to update the user's status to 'pro' and store subscription end date
  const updateUserStatusToPro = async (userEmail: string, transactionId: string): Promise<void> => {
    setLoading(true);

    try {
      const userRef = doc(db, "users", userEmail); // Using email as the doc ID
      const currentDate = new Date();
      const subscriptionEndDate = new Date(currentDate.setDate(currentDate.getDate() + 30));  // Add 30 days to current date

      await updateDoc(userRef, {
        subscription_status: "pro", // Set the user's status to 'pro'
        transaction_id: transactionId, // Store the transaction ID for reference
        subscription_end: subscriptionEndDate, // Store the subscription end date
      });
      setSubscriptionEndDateDisplay(subscriptionEndDate.toDateString());
      console.log("User status updated to Pro with subscription end date.");
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="price">Rs. {data?.total_amount}</p>
          <p className="status">Payment Successful</p>
          <p className="status">Your account has been upgraded to Pro.</p>
          {data?.total_amount && (
            <p className="status">
              Your subscription is valid until: {subscriptionEndDateDisplay}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
