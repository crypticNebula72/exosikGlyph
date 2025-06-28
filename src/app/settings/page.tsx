"use client"
import React, { useState, useEffect } from 'react'
import Profile from './Profile'
import { useSession } from 'next-auth/react';

const Settings = () => {
  const { data: session } = useSession();
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  useEffect(() => {
    // Log the session to debug
    console.log('Session data:', session);

    // Check if the user's email is not "unknown"
    if (session?.user?.email && session.user.email !== "unknown") {
      setShowDeleteAccount(true);
    } else {
      setShowDeleteAccount(false);
    }
  }, [session]);

  return (
    <div className='flex justify-center items-center align-middle mt-10'>
      
        {showDeleteAccount && 
          <Profile />
        }
     
    </div>
  )
}

export default Settings
