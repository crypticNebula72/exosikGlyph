'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { db } from '@/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import CodeCompiler from './CodeEditor'
import ChatPage from '../chat/[id]/page'  // Import the ChatPage component
import Link from 'next/link'

const Page = () => {
  const { data: session } = useSession()
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('Free')
  const [isLoading, setIsLoading] = useState(true)
  const [params, setParams] = useState<{ id: string } | null>(null) // For storing the params

  useEffect(() => {
    const fetchUserSubscriptionStatus = async () => {
      if (session?.user?.email) {
        const userRef = doc(db, 'users', session.user.email)
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
      setIsLoading(false)
    }

    fetchUserSubscriptionStatus()

    // Fetch params for the chat
    setParams({ id: 'pragma' }) // Mocking param setting here for now
  }, [session])

  return (
    <div className='h-full w-full'>
      <div className='hidden md:flex md:flex-row'>
        <div className='w-1/2 h-[100vh] overflow-y-auto'>
          <CodeCompiler />
        </div>

        {/* Conditional rendering: Only show ChatPage if user is Pro */}
        {isLoading ? (
          <div className='w-1/2 h-auto flex items-center justify-center'>
            <p>Loading...</p>
          </div>
        ) : subscriptionStatus === 'pro' ? (
          <div className='w-1/2 h-auto'>
            {/* Pass the resolved params to ChatPage */}
            {params && <ChatPage params={Promise.resolve(params)} />}
          </div>
        ) : (
          <div className='w-1/2 min-h-full flex items-center justify-center'>
            <p className='text-center text-headerColor text-xl'>
              Pragma isn&apos;t available in the basic plan. Please upgrade to Pro to access Pragma.
            </p>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className='flex flex-col items-center justify-center h-screen mt-[-5rem] md:hidden text-chatText gap-5'>
        <p className='text-3xl font-bold'>Oops!</p>
        <p>We are sorry, but Pragma is not supported on mobile devices. Please try again on a bigger screen.</p>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc2BAyZniL9P5lnBYGT9DP1az1WzjsXxdam-XLHupHtggGrcA/viewform">
          <button className='p-2 bg-proFill text-proColor rounded-lg'>
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Page
