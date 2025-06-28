"use client";
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Note_Message from './Note_Message';


const Note = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const userEmail = session?.user ? (session?.user?.email as string) : "unknown";
  const [notes] = useCollection(
    query(
      collection(db, "users", userEmail, "notes", id, "notes"),
      orderBy("createdAt", "asc")
    )
  );

  const noteContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the chat container when new messages arrive
  useEffect(() => {
    if (noteContainerRef.current) {
      noteContainerRef.current.scrollTop = noteContainerRef.current.scrollHeight;
    }
  }, [notes]);

  return (
    <div 
      ref={noteContainerRef} 
      className="md:min-w-full max-w-md mx-auto md:p-4 pb-8" 
      style={{
        maxHeight: '80vh', 
        overflowY: 'scroll', 
        scrollBehavior: 'smooth', 
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // Internet Explorer 10+
      }}
    >
        
      {notes?.empty && (
        <div className="text-center py-5">
          <p className="text-smallText">Please enter a Note below!</p>
        </div>
      )}
      {notes?.docs?.map((notes, index) => (
        <div key={index} className="mb-4">
          <Note_Message  notes={notes?.data()} />
        </div>
      ))}
    </div>

  );
};

export default Note;
