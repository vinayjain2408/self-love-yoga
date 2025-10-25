import React from 'react';

export default function Hero() {
  return (
    <section className="bg-[#FFFFFF] text-white py-20 px-40 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
      {/* Left side */}
      <div className="max-w-xl space-y-5 text-[#4965D2]">
        <h1 className="text-4xl font-bold leading-tight">
          Invest Confidently. <br />
          Grow Fearlessly.
        </h1>
        <p className="text-sm inline-block rounded-md font-semibold">
          Millions of crypto investors trust Global Crypto, the best crypto
          platform.*
        </p>
        <button className="border border-[#4965D2] text-[#4965D2] px-6 py-2 rounded-xl font-semibold ">
          Invest Now
        </button>
        <div>
          <h3 className="text-sm !mt-14 text-[#4965D2]">
            “Shaping the future of secure and smart crypto trading”
          </h3>
          <p className="text-[#4965D2]">Invest in stocks commission-free</p>
        </div>
      </div>

      {/* Right side */}
      <div className="relative mt-10 md:mt-0">
        {/* <FaEthereum className="text-8xl text-white/80 drop-shadow-lg" />
        <FaBitcoin className="text-9xl text-white/60 absolute top-16 left-20 blur-sm" /> */}
        <img
          src="/images/heroImage.png"
          alt="crypto"
          className="mt-6 rounded-lg object-cover w-[600px]"
        />
      </div>
    </section>
  );
}
