import query from "@/app/lib/queryApi";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDB } from "@/firebaseAdmin";

export const POST = async (req: NextRequest) => {
    const reqBody = await req.json();
    const { prompt, id, model, session } = reqBody;

    try {
        if (!prompt) {
            return NextResponse.json({ message: "Please provide a prompt!" }, { status: 400 });
        }
        if (!id) {
            return NextResponse.json({ message: "Please provide a valid chat ID!" }, { status: 400 });
        }

        // Fetch last 5 messages for context
        const chatMessagesRef = adminDB
            .collection("users")
            .doc(session)
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("createdAt", "desc")
            .limit(5);

        const chatHistory = await chatMessagesRef.get();
        const formattedHistory = chatHistory.docs.reverse().map(doc => ({
            role: doc.data().user._id === "Fly-note" ? "assistant" : "user",
            content: doc.data().text,
        }));

        // Get AI response with context
        const response = await query(prompt, id, model, formattedHistory);

        // Check if the id is 'pragma' and modify the message accordingly
        const message = {
            text: response || (id === 'pragma' ? "Pragma was unable to find an answer." : "Tutor-AI was unable to find an answer."),
            createdAt: admin.firestore.Timestamp.now(),
            user: {
                _id: "Fly-note",
                name: id === 'pragma' ? "Pragma" : "Tutor-AI",
                avatar: id === 'pragma' ? "/profile.png" : "/logo.png",
            },
        };

        await adminDB
            .collection("users")
            .doc(session)
            .collection("chats")
            .doc(id)
            .collection("messages")
            .add(message);

        return NextResponse.json({ answer: message.text, success: true}, { status: 200 });
    } catch (error) {
        // Ensure error is of type Error
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
};
