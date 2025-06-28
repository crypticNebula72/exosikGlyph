import Link from 'next/link';
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen mt-[-5rem] text-chatText gap-5'>
      <p className='text-3xl font-bold'>Whoops! Looks like you&apos;re lost.</p>
      <p>The page you&apos;re looking for isn&apos;t available or might have been moved.</p>
      <p>Don&apos;t worry, we&apos;ve got you covered! Click the button below to go back home.</p>
      <Link href="/">
        <button className='p-2 bg-proFill text-proColor rounded-lg'>
          Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFoundPage;
