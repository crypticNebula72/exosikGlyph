import React from 'react';
import Link from 'next/link';

const PaymentFailurePage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-red-400 to-pink-500">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md w-full">
        <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-700 mb-6">Unfortunately, your payment could not be processed.<br/>Please try again or contact support if the issue persists.</p>
        <Link
          href="/checkout"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition mb-2 text-center w-full"
        >
          Try Again
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-500 hover:underline text-center w-full"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default PaymentFailurePage;
