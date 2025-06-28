"use client"

import { db } from '@/firebase'
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const New_Note = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('Free') // Default is Free
  const [noteCount, setNoteCount] = useState<number>(0) // Track number of notes created
  const [isCooldown, setIsCooldown] = useState<boolean>(false) // State to track cooldown
  const [cooldownTime, setCooldownTime] = useState<number>(5) // 5 seconds cooldown

  const userEmail = session?.user ? (session?.user?.email as string) : "unknown"

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserSubscriptionStatus(session?.user?.email)
      fetchNoteCount(session?.user?.email)
    }
  }, [session])

  // Fetch user subscription status and reset to Free if expired
  const fetchUserSubscriptionStatus = async (email: string) => {
    const userRef = doc(db, 'users', email)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      let status = userData?.subscription_status || 'Free' // Default to Free if no status exists
      const subscriptionEnd = userData?.subscription_end ? userData.subscription_end.toDate().getTime() : null

      if (subscriptionEnd && subscriptionEnd < Date.now()) {
        // If the subscription has expired, reset status to 'Free'
        await updateDoc(userRef, { subscription_status: 'Free' })
        status = 'Free'
      }

      setSubscriptionStatus(status)
    }
  }

  // Fetch count of notes created by the user
  const fetchNoteCount = async (userEmail: string) => {
    const notesRef = collection(db, "users", userEmail, "notes")
    const q = query(notesRef, where("userId", "==", userEmail))
    const querySnapshot = await getDocs(q)
    setNoteCount(querySnapshot.size)
  }

  // Create a new note with cooldown and subscription check
  const createNewNote = async () => {
    if (!session) {
      router.push('/signin')
      return
    }

    // Set limit of 5 notes for Free users (Pro & Enterprise can bypass)
    if (noteCount >= 5 && subscriptionStatus !== 'pro') {
      alert('You have reached the limit of 5 notes. Please upgrade to Pro or Enterprise to create more.')
      return
    }

    if (isCooldown) {
      alert(`Please wait ${cooldownTime} seconds before creating a new note.`)
      return
    }

    setIsCooldown(true)

    try {
      // Proceed with creating a new note
      const docRef = await addDoc(collection(db, "users", userEmail, "notes"), {
        userId: userEmail,
        createdAt: serverTimestamp(),
      })
      setNoteCount(noteCount + 1)

      router.push(`/note/${docRef.id}`)

      // Start cooldown timer
      let timeLeft = cooldownTime
      const cooldownInterval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(cooldownInterval)
          setIsCooldown(false)
        } else {
          timeLeft -= 1
        }
      }, 1000) // Update cooldown every second
    } catch (error) {
      console.error('Error creating new note: ', error)
    }
  }

  return (
    <div className='flex flex-row'>
      <button onClick={createNewNote}
        className={`flex items-center justify-center flex-row gap-2 border-[1px] rounded-xl p-1 px-2 border-littleLineBelowUser shadow-sm text-headerColor hover:duration-300 ${isCooldown ? "text-sm px-0" : ""}`}
        disabled={isCooldown} // Disable the button during cooldown
      >
        {isCooldown ? `Cooldown: ${cooldownTime}s` : "New Note"}
        <div className={`${isCooldown ? "hidden" : "flex"}`}>
          <FaPlus />
        </div>
      </button>
    </div>
  )
}

export default New_Note
