"use client";
import { useState } from "react";
import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use useRouter for redirection

export default function DeleteAccount() {
  const { data: session } = useSession();
  const router = useRouter(); // Router for redirecting after deletion
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [loading, setLoading] = useState(false);

  const userEmail = session?.user?.email;

  const handleDelete = async () => {
    if (confirmationText !== "delete") {
      alert("Please type 'delete' to confirm.");
      return;
    }

    setLoading(true);

    try {
      // Delete user data from Firestore
      const userDocRef = doc(db, "users", userEmail as string);
      await deleteDoc(userDocRef);  // Delete the user document from Firestore

      // Sign out the user
      await signOut({ redirect: false }); // Sign out without redirecting

      // Show success alert
      alert("Your account has been deleted.");

      // Redirect to the home page after account deletion
      router.push("/"); // Redirect to home page or landing page

    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Delete Account Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Delete Account
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-red-600">Are you absolutely sure?</h2>
            <p className="mt-2 text-sm text-gray-600">
              This action cannot be undone in any way. This will permanently delete your account and all associated data.
              This encompasses all spaces, settings, integrations, your email, name, and any other information that we have that can be traced back to you.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Please note that if you are a premium user, deleting your account means you will lose access to your premium plan and will not be refunded.
            </p>

            {/* Confirmation Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Type <span className="font-bold">&quot;delete&quot;</span> to confirm:
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                placeholder="delete"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Back to Safety
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={loading || confirmationText !== "delete"}
              >
                {loading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
