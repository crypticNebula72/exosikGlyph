import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Head from "./components/Head";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fly-Note",
  description: "Enhance your learning with our AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light"  >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-backgroundColor`}
      >
        <SessionProvider>
          <div className="flex h-full gap-5">
            <div>
              <div className="h-full relative">
                <Sidebar />
              </div>
            </div>
            <div className="ml-8 flex-1 h-full overflow-hidden relative">
            <Head />
            {children}

            </div>
          </div>
        </SessionProvider>
        <Toaster position="top-right" toastOptions={{
          style:{
            background: "#1A1A1A", color: "#FFFFFF",
          }}
        } />
      </body>
    </html>
  );
}
