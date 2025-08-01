
import React from 'react'
import { Metadata } from 'next'
import { auth, signIn } from '@/auth'
import { FcGoogle } from 'react-icons/fc'
import { redirect } from 'next/navigation'
import { db } from '@/firebase' // Import Firestore DB
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const metadata: Metadata = {
    title: "Sign-In | Fly-Note",
}

const SignInPage = async () => {
    const session = await auth()

    if (session?.user) {
        const userEmail = session?.user?.email
        const userRef = doc(db, 'users', userEmail as string)
        const docSnap = await getDoc(userRef)

        if (!docSnap.exists()) {
            // If the user document doesn't exist, create it with a subscription_status of 'Free'
            await setDoc(userRef, {
                subscription_status: 'Free',
            })
        } else {
            const userData = docSnap.data()

            // If the subscription_status field doesn't exist, set it to 'Free'
            if (!userData?.subscription_status) {
                await setDoc(userRef, {
                    subscription_status: 'Free',
                }, { merge: true })
            }
        }

        // Redirect the user to the homepage if they are logged in
        redirect('/')
    }

    return (
        <div className='fixed w-full h-full bg-black left-0 top-0 flex flex-col items-center justify-center dark z-20'>
            <div className='border-[1px] bg-backgroundColor shadow-glow_box w-96 py-10 rounded-lg flex flex-col gap-5 items-center justify-center text-white'>
                <div className='text-center'>
                    <p className='text-3xl tracking-wide font-bold'>Welcome Back</p>
                    <p className='text-md tracking-wide font-normal'>Log In or Sign Up to use Fly-Note</p>
                </div>
                <div>
                    <div className='flex flex-col gap-4 mt-3'>
                        <form
                            action={async () => {
                                "use server"
                                await signIn("google")
                            }}
                        >
                            <button type="submit"
                                className='border-[1px] p-2 px-4 rounded-md flex items-center gap-2'>
                                <FcGoogle />
                                Sign in with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
