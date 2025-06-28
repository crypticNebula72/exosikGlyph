"use client";
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

const Chat = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const userEmail = session?.user ? (session?.user?.email as string) : "unknown";
  const [messages] = useCollection(
    query(
      collection(db, "users", userEmail, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the chat container when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef} 
      className="max-w-4xl mx-auto p-4 bg-backgroundColor " 
      style={{
        maxHeight: '70vh', 
        overflowY: 'scroll', 
        scrollBehavior: 'smooth', 
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // Internet Explorer 10+
      }}
    >
      {messages?.empty && (
        <div className="text-center py-5">
          <p className="text-headerColor">Please enter a prompt below to get started!</p>
        </div>
      )}
      {messages?.docs?.map((message, index) => (
        <div key={index} className="mb-4">
          <Message message={message?.data()} />
        </div>
      ))}
    </div>
  );
};

export default Chat;
