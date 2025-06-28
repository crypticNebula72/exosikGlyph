"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Pricing = () => {
  


  return (
    <section className="py-12 px-6 text-center bg-backgroundColor text-chatText">
      <h2 className="text-4xl font-bold text-headerColor">Pricing That Fits Your Ambition</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg">
        At our core, we believe in student success. That’s why we’ve crafted plans that suit your needs — whether you’re starting your journey or aiming to unlock your full potential.
      </p>

      <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
        {/* Free Plan */}
        <div className="border rounded-xl p-8 shadow-lg w-full md:w-1/3 bg-white dark:bg-chatBackgroundColor text-center">
          <h3 className="text-2xl font-semibold text-headerColor dark:text-gray-200">Free</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Perfect for casual learners.</p>
          <p className="text-4xl font-bold mt-4 text-indigo-600 dark:text-indigo-400">NPR 0.00</p>
          <p className="text-gray-600 dark:text-gray-400">/ month</p>
          <hr className="my-4 border-littleLineBelowUser dark:border-gray-600" />
          <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
            <li>Up to 5 Chat Tickets</li>
            <li>Up to 5 Notes</li>
            <li>Limited Access to Premium Features</li>
          </ul>
        </div>

        {/* Premium Plan (Most Popular) */}
        <div className="border rounded-xl p-8 scale-105 shadow-glow_box w-full md:w-1/3 bg-indigo-700 dark:bg-indigo-800 text-center text-white relative">
          <span className="absolute top-0 left-0 transform translate-y-3 -translate-x-5 md:-translate-x-6 -rotate-45 bg-yellow-400 text-black p-2 md:px-3 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
          <h3 className="text-2xl font-semibold">Premium</h3>
          <p className="text-gray-300 dark:text-gray-200 text-sm mt-1">Elevate your learning experience.</p>
          <p className="text-4xl font-bold mt-4">NPR 199.99</p>
          <p className="text-gray-300 dark:text-gray-200">/ month</p>
          <hr className="my-4 border-gray-200 dark:border-gray-600" />
          <ul className="text-left text-gray-200 dark:text-gray-300 space-y-2">
            <li>Unlimited Chats Per Day</li>
            <li>Unlimited Notes Storage</li>
            <li>Exclusive Access to All Features</li>
            <li>Priority Support</li>
          </ul>
          <Link href={"/checkout"} target="_blank">
          <button
            className="mt-6 px-6 py-2 rounded-full bg-gradientButton text-buttonText font-semibold hover:bg-proFillLight dark:hover:bg-proFill"
          >
            Upgrade Now
          </button>
          </Link>
        </div>

        {/* Enterprise Plan */}
        <div className="border rounded-xl p-8 shadow-lg w-full md:w-1/3 bg-white dark:bg-chatBackgroundColor text-center">
          <h3 className="text-2xl font-semibold text-headerColor dark:text-gray-200">Enterprise</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">For Organizations & Institutions</p>
          <p className="text-4xl font-bold mt-4">Custom</p>
          <hr className="my-4 border-littleLineBelowUser dark:border-gray-600" />
          <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
            <li>Everything in Premium + More</li>
            <li>24/7 Dedicated Support</li>
            <li>Custom Features on Request</li>
            <li>Bulk Licensing & Pricing</li>
          </ul>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc2BAyZniL9P5lnBYGT9DP1az1WzjsXxdam-XLHupHtggGrcA/viewform">
            <button className="mt-6 px-6 py-2 rounded-full bg-proColor text-proFill font-semibold hover:text-black hover:bg-proFillLight dark:hover:bg-proFill">
              Contact Sales
            </button>
          </Link>
        </div>
      </div>

     
    </section>
  );
};

export default Pricing;
