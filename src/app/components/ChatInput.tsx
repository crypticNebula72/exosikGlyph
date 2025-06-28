"use client" 

import { db } from '@/firebase';
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiCalculator2 } from 'react-icons/ci';
import { ImArrowUpRight2 } from 'react-icons/im';

const ChatInput = ({ id }: { id: string }) => {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [isCooldown, setIsCooldown] = useState<boolean>(false); // State for cooldown
    const [cooldownTime, setCooldownTime] = useState<number>(2); // 5 seconds cooldown
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>('Free'); // Subscription state
    const [messageCount, setMessageCount] = useState<number>(0); // Message count
    const model = "llama-3.1-8b-instant";
    const router = useRouter();

    const userEmail = session?.user?.email || "unknown";
    const userName = session?.user?.name || "unknown";

    useEffect(() => {
        if (session?.user?.email) {
            fetchUserSubscriptionStatus(session?.user?.email);
            fetchMessageCount(session?.user?.email);
        }
    }, [session]);

    const fetchUserSubscriptionStatus = async (userEmail: string) => {
        const userRef = doc(db, 'users', userEmail);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const status = userData?.subscription_status || 'Free'; // Default to 'Free' if no status exists
            setSubscriptionStatus(status);
        }
    };

    const fetchMessageCount = async (userEmail: string) => {
        const chatsRef = collection(db, "users", userEmail, "chats");
        const q = query(chatsRef, where("userId", "==", userEmail));
        const querySnapshot = await getDocs(q);
        setMessageCount(querySnapshot.size); // Assuming each chat contains one message, adjust accordingly
    };

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt.trim() || loading || isCooldown) return;

        // Handle message limits based on subscription status
        if (subscriptionStatus !== 'pro' && messageCount >= 25) {
            alert('You have reached the message limit. Please upgrade to Pro for more messages.');
            return;
        }

        const input = prompt.trim();
        const message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: userEmail,
                name: userName,
                avatar: session?.user?.image || "/default-avatar.png",
            }
        };

        try {
            setLoading(true);
            let chatDocumentId = id;

            if (!id) {
                const docRef = await addDoc(collection(db, "users", userEmail, "chats"), {
                    userId: userEmail,
                    createdAt: serverTimestamp(),
                });
                chatDocumentId = docRef.id;
                router.push(`/chat/${chatDocumentId}`);
            }

            await addDoc(collection(db, "users", userEmail, "chats", chatDocumentId, "messages"), message);

            setPrompt("");
            setMessageCount(messageCount + 1)
           

            const notification = toast.loading("AI is thinking...");
            const response = await fetch("/api/askchat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input, id: chatDocumentId, model, session: userEmail }),
            });

            const data = await response.json();
            if (data?.success) {
                toast.success(data?.message, { id: notification });
            } else {
                toast.error(data?.message, { id: notification });
            }

            // Trigger cooldown after message is sent
            setIsCooldown(true);
            let timeLeft = cooldownTime;
            const cooldownInterval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(cooldownInterval);
                    setIsCooldown(false);
                } else {
                    timeLeft -= 1;
                }
            }, 1000); // Update cooldown every second

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:max-w-4xl flex flex-col items-center justify-center h-fit mx-auto px-4">
            <form onSubmit={sendMessage} className="border-[1px] border-inputBorder rounded-full flex items-center px-4 py-2 w-full">
                <input
                    type="text"
                    className="bg-transparent w-full outline-none text-smallText font-medium tracking-wide"
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    placeholder={id === 'pragma' ? "Let's code..." : "Teach me about..."}
                    disabled={loading || isCooldown} // Disable when in cooldown or loading
                />
                <div className="flex flex-row gap-4 mr-2.5">
                    <button type="button" className={`p-1 rounded-full bg-proFill  ${id == "pragma" ? 'hidden' : ''}`}>
                        <Link rel="stylesheet" href="/desmos">
                            <CiCalculator2 className="fill-iconColorsNonFunctional w-auto h-4 md:h-6" />
                        </Link>
                    </button>
                    <button type="submit" disabled={!prompt.trim() || loading || isCooldown} className="p-2 md:px-3 rounded-full bg-proFill disabled:bg-proFillLight">
                        <ImArrowUpRight2 className="fill-iconColorsNonFunctional w-auto h-2 md:h-3 -rotate-45" />
                    </button>
                </div>
            </form>
            <p className="text-xs text-smallText font-medium tracking-wide text-center mt-2">
                {id === 'pragma' ? "Pragma" : "Tutor-AI"} can make mistakes.Please check important info.
            </p>
            <div className="w-full">
            <Link href="/terms" className="hover:underline">
                <p className="text-xs text-smallText font-medium tracking-wide text-end mt-2">Terms & Conditions</p>
            </Link>
            </div>
        </div>
    );
};

export default ChatInput;