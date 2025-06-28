"use client"

import { db } from '@/firebase'
import { addDoc, collection, serverTimestamp, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const NewChat = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('Free') // Default is Free
  const [chatCount, setChatCount] = useState<number>(0) // Track number of chats created
  const [isCooldown, setIsCooldown] = useState<boolean>(false) // State to track cooldown
  const [cooldownTime, setCooldownTime] = useState<number>(5) // 5 seconds cooldown

  const userEmail = session?.user?.email || "unknown"

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserSubscriptionStatus(session.user.email)
      fetchChatCount(session.user.email)
    }
  }, [session])

  const fetchUserSubscriptionStatus = async (email: string) => {
    const userRef = doc(db, 'users', email)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      let status = userData?.subscription_status || 'Free'
      const subscriptionEnd = userData?.subscription_end ? userData.subscription_end.toDate().getTime() : null

      if (subscriptionEnd && subscriptionEnd < Date.now()) {
        // Reset expired subscription to 'Free'
        await updateDoc(userRef, { subscription_status: 'Free' })
        status = 'Free'
      }

      setSubscriptionStatus(status)
    }
  }

  const fetchChatCount = async (userEmail: string) => {
    const chatsRef = collection(db, "users", userEmail, "chats")
    const q = query(chatsRef, where("userId", "==", userEmail))
    const querySnapshot = await getDocs(q)
    setChatCount(querySnapshot.size)
  }

  const createNewChat = async () => {
    if (!session) {
      router.push('/signin')
      return
    }

    // Set limit of 5 chats for Free users
    if (chatCount >= 5 && subscriptionStatus !== 'pro') {
      alert('You have reached the limit of 5 chats. Please upgrade to Pro or Enterprise to create more.')
      return
    }

    if (isCooldown) {
      alert(`Please wait ${cooldownTime} seconds before creating a new chat.`)
      return
    }

    setIsCooldown(true)

    try {
      const docRef = await addDoc(collection(db, "users", userEmail, "chats"), {
        userId: userEmail,
        createdAt: serverTimestamp(),
      })
      setChatCount(chatCount + 1)

      router.push(`/chat/${docRef.id}`)

      // Start cooldown timer
      let timeLeft = cooldownTime
      const cooldownInterval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(cooldownInterval)
          setIsCooldown(false)
        } else {
          setCooldownTime(timeLeft)
          timeLeft -= 1
        }
      }, 1000)
    } catch (error) {
      console.error('Error creating new chat: ', error)
    }
  }

  return (
    <div className='flex flex-row'>
      <button 
        onClick={createNewChat}
        className={`flex items-center justify-center flex-row gap-2 border-[1px] rounded-xl p-1 px-2 border-littleLineBelowUser shadow-sm text-headerColor hover:duration-300 ${isCooldown ? "text-sm px-0" : ""}`}
        disabled={isCooldown}
      >
        {isCooldown ? `Cooldown: ${cooldownTime}s` : "New Chat"}
        <div className={`${isCooldown ? "hidden" : "flex"}`}>
          <FaPlus />
        </div>
      </button>
    </div>
  )
}

export default NewChat
