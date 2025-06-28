import { db } from '../../../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ImArrowUpRight2 } from 'react-icons/im';
import RichTextEditor from "@/app/components/notes/components/index"; // Import your editor

const Note_Input = ({ id }: { id: string }) => {
    const [data, setData] = useState(''); // Store content in state
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const userEmail = session?.user?.email || "unknown";
    const userName = session?.user?.name || "unknown";

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        const notes = {
            content: data, // Storing the raw content here
            createdAt: serverTimestamp(),
            user: {
                _id: userEmail,
                name: userName,
                avatar: session?.user?.image || "/default-avatar.png",
            }
        };

        try {
            setLoading(true);
            let notesDocumentId = id;

            if (!id) {
                const docRef = await addDoc(collection(db, "users", userEmail, "notes"), {
                    userId: userEmail,
                    createdAt: serverTimestamp(),
                });
                notesDocumentId = docRef.id;
                router.push(`/note/${notesDocumentId}`);
            }

            await addDoc(collection(db, "users", userEmail, "notes", notesDocumentId, "notes"), notes);
            setData(''); // Reset the editor content

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center h-fit mx-auto px-4">
            {/* Toolbar (can be added based on your needs) */}

            <form onSubmit={sendMessage} className=" rounded-md flex flex-col px-4 py-2 w-full">
                <div className="flex justify-center w-full h-full outline-none text-black font-medium tracking-wide p-2 border-b">
                    {/* Use RichTextEditor component here */}
                    <RichTextEditor
                        content={data}
                        onChange={(value: string) => setData(value)} // Explicitly type the value as a string
                    />
                </div>

                <div className="flex flex-row gap-4 mt-2">
                    <button type="submit" disabled={loading} className="p-2 md:px-3 rounded-md bg-proFill disabled:bg-proFillLight">
                        <ImArrowUpRight2 className="fill-iconColorsNonFunctional w-auto h-2 md:h-3 -rotate-45" />
                    </button>
                </div>
            </form>
            <div className='w-full' />
        </div>
    );
};

export default Note_Input;
