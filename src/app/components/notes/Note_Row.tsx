import { db } from '@/firebase';
import { collection, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { CiChat2, CiEdit } from 'react-icons/ci';

const Note_Row = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const noteDocRef = doc(db, 'users', session?.user?.email as string, 'notes', id);
  const [noteDocSnapshot] = useDocument(noteDocRef);


  const noteData = noteDocSnapshot?.data();
  const noteTitle = noteData?.title || 'New Note';

  useEffect(() => {
    setNewTitle(noteTitle);
  }, [noteTitle]);

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname, id]);

  const [noteSnapshot] = useCollection(
    query(
      collection(db, 'users', session?.user?.email as string, 'notes'),
      orderBy('createdAt', 'desc')
    )
  );

  const handleRemovenote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteDoc(doc(db, "users", session?.user?.email as string, "notes", id));
    if (active) {
      const nextnote = noteSnapshot?.docs?.find((note) => note.id !== id);
      if (nextnote) {
        router.push(`/note/${nextnote.id}`);
      } else {
        router.push("/");
      }
    }
  };

  const handleTitleUpdate = async () => {
    if (!session?.user?.email || !newTitle.trim()) return;
    await updateDoc(noteDocRef, { title: newTitle });
    setEditingTitle(false);
  };

  return (
    <Link
      href={`/note/${id}`}
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
          {noteTitle}
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
          onClick={handleRemovenote}
          className="hover:text-red-600 transition-colors"
        />
      </div>
    </Link>
  );
};

export default Note_Row;