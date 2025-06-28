"use client";

import { db } from '@/firebase';
import { collection, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { CiChat2, CiEdit } from 'react-icons/ci';

const Chat_Row = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const chatDocRef = doc(db, 'users', session?.user?.email as string, 'chats', id);
  const [chatDocSnapshot] = useDocument(chatDocRef);

  const chatData = chatDocSnapshot?.data();
  const chatTitle = chatData?.title || 'New Chat';

  useEffect(() => {
    setNewTitle(chatTitle);
  }, [chatTitle]);

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname, id]);

  const [chatSnapshot] = useCollection(
    query(
      collection(db, 'users', session?.user?.email as string, 'chats'),
      orderBy('createdAt', 'desc')
    )
  );

  const handleRemoveChat = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteDoc(chatDocRef);
    if (active) {
      const nextChat = chatSnapshot?.docs?.find((chat) => chat.id !== id);
      if (nextChat) {
        router.push(`/chat/${nextChat.id}`);
      } else {
        router.push("/");
      }
    }
  };

  const handleTitleUpdate = async () => {
    if (!session?.user?.email || !newTitle.trim()) return;
    await updateDoc(chatDocRef, { title: newTitle });
    setEditingTitle(false);
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`flex gap-3 items-center justify-center px-2 py-2 hover:bg-buttonBackgroundColor mb-4 rounded-md duration-300 ease-in ${
        active ? 'bg-buttonBackgroundColor border border-chatButtonBorder' : 'bg-transparent'
      }`}
    >
      <CiChat2 />
      {editingTitle ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleTitleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleTitleUpdate()}
          className="flex ml-8 bg-transparent outline-none text-sm"
          autoFocus
        />
      ) : (
        <p className="inline-flex truncate text-sm font-medium flex-1 tracking-wide">
          {chatTitle}
        </p>
      )}
      <div className="flex items-center gap-1">
        <CiEdit
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setEditingTitle(true);
          }}
          className="hover:text-gray-400 transition-colors"
        />
        <BiSolidTrashAlt
          onClick={handleRemoveChat}
          className="hover:text-red-600 transition-colors"
        />
      </div>
    </Link>
  );
};

export default Chat_Row;
