// components/ProfileForm.js
"use client"
import { db } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [work, setWork] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchData = async () => {
      const userEmail = session?.user?.email;
      const docRef = doc(db, "users", userEmail as string);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWork(data.work || '');
        setSchool(data.school || '');
        setMajor(data.major || '');
      }
    };
    fetchData();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;
    
    setLoading(true);
    const userEmail = session.user.email;
    const userName = session.user.name;

    const data = {
      work: work.trim(),
      school: school.trim(),
      major: major.trim(),
      updatedAt: serverTimestamp(),
      user: {
        _id: userEmail,
        name: userName,
      }
    };

    try {
      await setDoc(doc(db, "users", userEmail), data, { merge: true });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    
    setLoading(false);
  };

  return (
    <div className='flex flex-row justify-center w-full'>

    
    <div className="flex flex-col justify-center align-middle gap-4">
      <div className='text-headerColor text-3xl'>
        <p>Hello, {session?.user?.name}!</p>
      </div>
      <div className='h-1 bg-littleLineBelowUser'>

      </div>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium  text-headerColor">What best describes your work?</label>
            <input
              type="text"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Engineering"
            />
          </div>

          <div>
            <label className="block text-sm font-medium  text-headerColor">Where do you attend school?</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="School Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-headerColor">What&apos;s your major? (If in college/university)</label>
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Major"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2 text-chatText text-sm">
          <div className=''><strong>Work:</strong> <p className='text-lg text-proFill ml-4 bg-iconColorsFunctional py-2 p-4 rounded-lg'> {work || "Not provided"}</p></div>
          <div><strong>School:</strong><p className='text-lg text-proFill ml-4 bg-iconColorsFunctional p-4 py-2 rounded-lg'> {school || "Not provided"}</p></div>
          <div><strong>Major:</strong><p className='text-lg text-proFill ml-4 bg-iconColorsFunctional p-4 py-2 rounded-lg'> {major || "Not provided"}</p></div>
          <div className='flex w-full justify-center'>

     
          <button
            onClick={() => setEditing(true)}
            className="mt-2 px-2 py-2 bg-proColor text-proFill text-sm self-center rounded-md"
          >
            Edit Profile
          </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
