import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import Theme from './Theme'
import Image from 'next/image'
import SignOut from './SignOut'
const Head = async() => {
  const session  = await auth()
   
    
  
  return (

<div className='flex flex-row m-2.5 items-center justify-between h-8 w-full '>
    <div>

        <button className='text-headerColor md:text-2xl text-xl rounded-md p-1 ml-10 md:m-auto'><Link href="/#">Fly-Note</Link></button>
    </div>
    <div className='flex flex-row justify-center items-center rounded-lg gap-2 md:pr-6 scale-75 md:scale-100 '>
   
      {session?.user? (
        <div className='flex w-full flex-row justify-center h-full items-center gap-2'>

       <div className=' h-full w-full rounded-full'>
        <Image src={session?.user?.image as string} alt='User Image' width={200} height={200} className='h-10 w-10 rounded-full object-cover'/>
       </div>
       <Theme />
       <SignOut />
        </div>
      )
      : (
        <div className='flex w-full flex-row justify-center h-full items-center gap-2'>
          <Theme />
          <Link href={"/signin"} className='text-headerColor '>Sign In</Link>
        </div>
      )}
    </div>
    
    
</div>
  )
}

export default Head
