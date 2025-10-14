import React from 'react';

export default function Hero() {
  return (
    <section className="bg-[#008e64] text-white py-20 px-40 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
      {/* Left side */}
      <div className="max-w-xl space-y-5">
        <h1 className="text-4xl font-bold leading-tight">
          Invest Confidently. <br />
          Grow Fearlessly.
        </h1>
        <p className="text-sm inline-block rounded-md font-semibold">
          Millions of crypto investors trust Global Crypto, the best crypto
          platform.*
        </p>
        <button className="bg-white text-[#008e64] px-6 py-2 rounded-xl font-semibold hover:bg-yellow-300">
          Get Started
        </button>
        <p className="text-sm text-gray-200 !mt-14">
          *Based on the January 2025 Forbes Advisor review of crypto platforms.
        </p>
      </div>

      {/* Right side */}
      <div className="relative mt-10 md:mt-0">
        {/* <FaEthereum className="text-8xl text-white/80 drop-shadow-lg" />
        <FaBitcoin className="text-9xl text-white/60 absolute top-16 left-20 blur-sm" /> */}
        <img
          src="/images/bitcoin.png"
          alt="crypto"
          className="mt-6 rounded-lg object-cover w-[239px]"
        />
      </div>
    </section>
  );
}
