import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-backgroundColor text-headerColor w-full p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:gap-8 justify-between">
        {/* Left Section */}
        <div className="mr-20  whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Fly-Note Logo" className="w-6 h-6" />
            <span className="text-lg font-medium">Fly-Note</span>
          </div>
          <p className="text-smallText text-sm mt-1">© 2025 Fly-Note, Nepal.</p>
          <p className="text-smallText text-sm mt-4">Partnered with</p>
          <p className="text-green-600 text-xl font-semibold">desmos</p>
        </div>

        {/* Right Section - Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 md:mt-0 whitespace-nowrap text-smallText ">
        <div className="flex flex-col gap-4">

          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc2BAyZniL9P5lnBYGT9DP1az1WzjsXxdam-XLHupHtggGrcA/viewform?usp=sharing" className="hover:underline">Contact Us</Link>
          <Link href="/signin" className="hover:underline">Sign Up</Link>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScsBaQSrAHGOa3HH8le_iASYX28TgosYesFhAStGtwGVajTlw/viewform?usp=preview" className="hover:underline">Careers</Link>
        </div>
        <div className="flex flex-col gap-4">
          
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfkZE1CcjBO4TJe_u0q6lKVcz2JmZX__p_TooEU5kebGcGkGg/viewform?usp=sharing" className="hover:underline">Report Bugs</Link>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
