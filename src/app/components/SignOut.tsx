import { signOut } from '@/auth'
import React from 'react'

const SignOut = () => {
  return (
    <div>
       <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className='text-headerColor border border-littleLineBelowUser rounded-lg px-3 py-2 text-sm whitespace-nowrap'>Sign Out</button>
    </form>
    </div>
  )
}

export default SignOut
