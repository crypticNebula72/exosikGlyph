// pages/index.js

import React from 'react';
import Footer from './Footer/Page';
import Link from 'next/link';
import { ShootingStars } from './components/ui/shooting-stars';
import { StarsBackground } from './components/ui/stars-background';
import { BackgroundBeamsWithCollision } from './components/ui/background-beams-with-collision';
import { FaBrain, FaChartLine, FaLaptopCode, FaPen } from 'react-icons/fa';

const HomePage = () => {
  const testimonials = [
    {
      quote: "Fly-Note made studying so much easier. The graph feature alone transformed my understanding of math!",
      name: "Jane Doe",
      title: "Math Student"
    },
    {
      quote: "I love how simple and intuitive the platform is. The chatbot helped me with everything from biology to coding.",
      name: "John Smith",
      title: "Computer Science Student"
    },
    {
      quote: "The AI-powered note organization has completely changed how I prepare for exams. Highly recommended!",
      name: "Sarah Johnson",
      title: "Medical Student"
    }
  ];

  return (
    <div className="bg-backgroundColor relative min-h-screen m-0 mr-2 p-0 flex flex-col justify-center items-center">
      {/* Hero Section with Shooting Stars */}
      <BackgroundBeamsWithCollision className='bg-backgroundColor h-screen '>
      <h2 className="text-2xl relative md:mt-[-10rem]  z-20 md:text-4xl lg:text-7xl font-bold text-center text-headerColor font-sans tracking-tight">
      Unlock the Future of Learning with {" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Fly-Note.</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">Fly-Note.</span>
          </div>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>

      <div className="h-[40rem] w-full dark:bg-backgroundColor bg-backgroundColor dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-backgroundColor bg-backgroundColor [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-b from-iconColorsFunctional to-headerColor bg-clip-text text-transparent">
              What is Fly-Note?
            </h2>
            <p className="text-lg text-chatText">
              Fly-Note is your ultimate platform for creating personalized, interactive learning notes. 
              With powerful AI-powered features like real-time graphs, note management, and an intelligent chatbot, 
              you're equipped to learn better and faster.
            </p>
          </div>
    </div>
    
      {/* Why Choose Us Section with Grid Background */}
    <div className="flex flex-col gap-8 mt-4 bg-backgroundColor">
      {/* Interactive Note-Taking */}
      <div className="h-fit p-4 rounded-lg shadow-glow_box bg-[#1A1A1A] flex flex-col items-center justify-center relative w-full">
        <div className="flex flex-col items-start w-full px-6">
          <div className="flex flex-row items-center gap-2">
            <FaPen className="text-white text-3xl" />
            <h2 className="text-xl md:text-3xl max-w-5xl mx-auto text-left tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
              Interactive Note-Taking
            </h2>
            
          </div>
          <p className="text-left text-white mt-2">
            Take detailed, rich notes that include text, code, and more. Organize your thoughts with ease, all in one place.
          </p>
          <ShootingStars />
          <StarsBackground />
        </div>
      </div>

      {/* Learn Coding by Coding */}
      <div className="h-fit p-4 rounded-lg shadow-glow_box bg-[#1A1A1A] flex flex-col items-center justify-center relative w-full">
        <div className="flex flex-col items-start w-full px-6">
          <div className="flex flex-row items-center gap-2">
            <FaLaptopCode className="text-white text-3xl" />
            <h2 className="text-xl md:text-3xl max-w-5xl mx-auto text-left tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
              Learn Coding by Coding
            </h2>
          </div>
          <p className="text-left text-white mt-2">
            Practice coding directly within the platform. Write, test, and debug code in real-time with interactive coding environments.
          </p>
          <ShootingStars />
          <StarsBackground />
        </div>
      </div>

      {/* Interactive Graphs */}
      <div className="h-fit p-4 rounded-lg shadow-glow_box bg-[#1A1A1A] flex flex-col items-center justify-center relative w-full">
        <div className="flex flex-col items-start w-full px-6">
          <div className="flex flex-row items-center gap-2">
            <FaChartLine className="text-white text-3xl" />
            <h2 className="text-xl md:text-3xl max-w-5xl mx-auto text-left tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
              Interactive Graphs
            </h2>
          </div>
          <p className="text-left text-white mt-2">
            Visualize complex data with interactive, real-time graphs. Ideal for subjects like math, science, and statistics.
          </p>
          <ShootingStars />
          <StarsBackground />
        </div>
      </div>

      {/* Learn Properly Instead of Parrot Learning */}
      <div className="h-fit p-4 rounded-lg shadow-glow_box bg-[#1A1A1A] flex flex-col items-center justify-center relative w-full">
        <div className="flex flex-col items-start w-full px-6">
          <div className="flex flex-row items-center gap-2">
            <FaBrain className="text-white text-3xl" />
            <h2 className="text-xl md:text-3xl max-w-5xl mx-auto text-left tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
              Learn Properly, Not Just by Repetition
            </h2>
          </div>
          <p className="text-left text-white mt-2">
            Fly-Note encourages deep learning. Understand the concepts behind what you are studying rather than memorizing them.
          </p>
          <ShootingStars />
          <StarsBackground />
        </div>
      </div>
    </div>
   
    <div className="flex flex-col items-center h-fit w-fit p-5 mt-10 gap-4">
      
<BackgroundBeamsWithCollision className='max-h-[15rem] bg-backgroundColor flex flex-col gap-4'>
  <p className="text-headerColor text-xl md:text-2xl text-center max-w-md mx-auto">
   
    Ready to take your learning to the next level? Sign up now to unlock your full potential with Fly-Note.
    
  </p>
  <Link href={"/signin"}>
    <button className='bg-gradientButton text-buttonText p-4 px-6 rounded-lg w-full md:w-auto  transition-all'>
      Sign Up
    </button>
  </Link>
  
</BackgroundBeamsWithCollision>
</div>

      <Footer />
    </div>
  );
};

export default HomePage;