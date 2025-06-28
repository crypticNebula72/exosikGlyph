// components/SubscriptionStatus.tsx
"use client"

import React, { useEffect, useState } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth } from '@/auth'

const SubscriptionStatus = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('')

  const fetchSubscriptionStatus = async (email: string) => {
    const db = getFirestore()
    const userRef = doc(db, 'users', email)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      const subscriptionEnd = data?.subscription_end?.toDate() // Convert Firestore timestamp to JavaScript Date

      if (subscriptionEnd && new Date() > subscriptionEnd) {
        setSubscriptionStatus('Free') // If expired
      } else {
        setSubscriptionStatus('Pro') // If still active
      }
    }
  }

  useEffect(() => {
    const getSession = async () => {
      const sessionData = await auth()
      if (sessionData?.user?.email) {
        fetchSubscriptionStatus(sessionData.user.email)
      }
    }

    getSession()
  }, [])

  return <p>{subscriptionStatus}</p> // Display subscription status
}

export default SubscriptionStatus
