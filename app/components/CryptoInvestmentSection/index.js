import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'; // Using lucide-react for icons

// eslint-disable-next-line react/prop-types
const UserAvatar = ({ className }) => (
  <div
    className={`w-10 h-10 rounded-full bg-cover bg-[#C7B9DA] ${className}`}
    style={{
      backgroundImage: 'url(/images/maya.png)',
    }}
  >
    {/* Placeholder for the user's face, you'd replace 'url(...)' with the actual image source */}
  </div>
);

// --- Main Component ---
const CryptoInvestmentSection = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col text-center items-center text-white ">
      <h1 className="text-4xl text-[#4965d2] font-bold mb-6 text-center ">
        <u>Happy Clients</u> Around the world
      </h1>
      <p className="text-[#4965d2]">
        We help investors make informed decisions with expert insights,
        data-driven strategies, and real-
        <p className="text-center">time market analysis to maximize returns.</p>
      </p>
      <div className="flex flex-col lg:flex-row items-center justify-center p-2 md:p-11 bg-white min-h-screen mr-60 ">
        {/* 1. Testimonial Card (Left Side) */}
        <div className="w-full lg:w-4/12 max-w-lg p-3 md:p-10 rounded-xl  bg-[#4965D2] text-white mr-20 mb-40">
          {/* Stars and User Info */}
          <div className="mb-6">
            {/* Stars */}
            <div className="flex space-x-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* User Profile */}
            <div className="flex items-center">
              <UserAvatar className="w-12 h-12 mr-3 border-2 border-[#4965D2]" />
              <div>
                <p className="text-lg font-semibold">Maya Jaiswal</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-semi-bold mb-4 leading-snug">
            Empowering Smarter Crypto Investments
          </h2>
          <p className="text-indigo-100 mb-4">
            We help investors make informed decisions with expert insights,
            data-driven strategies, and real-time market analysis to maximize
            returns.
          </p>
          <p className="text-indigo-100 mb-8">
            We help investors make informed decisions with expert insights,
            data-driven strategies, and real-time market analysis to maximize
            returns.
            <hr className="mt-2" />
          </p>

          {/* Pagination/Navigation */}
          <div className="flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 cursor-pointer opacity-75 hover:opacity-100" />
            <span className="mx-4 text-sm font-light">
              <span className="font-medium">1</span>
              <span className="mx-1">........</span>
              <span>3</span>
            </span>
            <ChevronRight className="w-5 h-5 cursor-pointer opacity-75 hover:opacity-100" />
          </div>
        </div>

        {/* 2. User Count/Trust Circle (Right Side) */}
        <div className="w-full lg:w-4/12 max-w-sm flex flex-col items-center ml-60 mb-40">
          {/* Arc/Circle Graphic */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* The main arc is simulated using a combination of a full circle and a background to mask the bottom part. */}
            <svg
              className="absolute w-full h-full transform -rotate-90 p-0"
              viewBox="13 0 100 100 "
            >
              {/* Background/Track (Lighter part of the arc) */}
              <circle
                className="w-24 h-24 rounded-full border-4 border-[#FFD700]"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E0D607"
                strokeWidth="9"
                // strokeDasharray="282.74" // Circumference of r=45 circle (2*pi*45)
                // strokeDashoffset="70.685"
                strokeLinecap="round"
              />
              <circle
                className="w-24 h-24 brounded-full border-4 p-10 w-full h-64 flex justify-center items-center border-[#FFD700] "
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#0631bdff"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>

            {/* Text Overlay */}
            <div className="absolute flex flex-col items-center justify-center pt-8 ">
              <p className="text-s text-[#4965D2] font-medium mt-20">
                Start Investing Instantly
              </p>
              <p className="text-s text-[#4965D2] mb-4">
                Trust by 250 + Clients
              </p>
              <p className="text-3xl font-bold text-[#6B6B6B]">250+</p>
              <p className="text-sm text-[#6B6B6B] font-medium">
                Verified User
              </p>
            </div>
          </div>

          {/* Trusted By Avatars */}
          <div className="flex -space-x-3 mt-4">
            <UserAvatar className="ring-2 ring-[#4965D2] " />
            <UserAvatar className="ring-2 ring-[#4965D2]" />
            <UserAvatar className="ring-2 ring-[#4965D2]" />
            <UserAvatar className="ring-2 ring-[#4965D2]" />
            <UserAvatar className="ring-2 ring-[#4965D2]" />
          </div>
          <p className="text-sm text-gray-600 mt-2">Trusted by</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoInvestmentSection;
