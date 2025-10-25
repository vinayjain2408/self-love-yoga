import React from 'react';

const CryptoResellerSection = () => {
  // Data for the feature cards
  const features = [
    {
      title: 'Unified Orderbook & Liquidity',
      description:
        'seamlessly aggregate buy and sell orders across multiple exchanges, ensuring deeper liquidity, better pricing, and faster trade execution for users.',
    },
    {
      title: 'Unified Orderbook & Liquidity',
      description:
        'seamlessly aggregate buy and sell orders across multiple exchanges, ensuring deeper liquidity, better pricing, and faster trade execution for users.',
    },
    {
      title: 'Unified Orderbook & Liquidity',
      description:
        'seamlessly aggregate buy and sell orders across multiple exchanges, ensuring deeper liquidity, better pricing, and faster trade execution for users.',
    },
  ];

  // A simple Cube Icon component
  const CubeIcon = () => (
    // The outer wrapper for the icon's background circle/square
    <div className="mb-20 p-6 rounded-full bg-[#FFFFFF] bg-opacity-100 ">
      {/* The actual cube structure */}
      <div className="w-6 h-6 relative">
        {/* Outer Box */}
        <div className="absolute inset-0 border-2 border-[#4965D2] rounded-sm"></div>

        {/* Inner Box (Offset to create a 3D effect) */}
        <div className="absolute inset-0 border-2 border-[#4965D2] rounded-sm translate-x-1 translate-y-1"></div>
      </div>
    </div>
  );

  return (
    // Added 'bg-white' to the section for an explicit white background
    <section className="py-12 px-4 sm:px-6 lg:px-8 mx-auto bg-[#FFFFFF]">
      {/* Header and Call-to-Action Area */}
      <div className="mb-12">
        {/* Explore Button */}
        <button className="text-s font-medium py-3 px-4 mb-6 rounded-lg bg-[#4965D233] hover:bg-[#4965D233] text-[#4965D2] transition duration-150 ease-in-out">
          Explore
        </button>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#585B60] mb-4 leading-snug">
          Grow with <span className="text-[#4965D2]">CRYPTO GLOBAL</span>
          <br />
          become a reseller
        </h1>

        {/* Subtext */}
        <p className="max-w-3xl text-s font-bold text-[#4965D2] mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="py-3 px-12 rounded-lg bg-[#4965D2] hover:bg-indigo-700 text-white font-medium shadow-md transition duration-150 ease-in-out w-full sm:w-auto">
            Get Started
          </button>
          <button className="py-3 px-12 rounded-lg border border-[#4965D2] bg-white hover:bg-gray-50 text-indigo-600 font-medium transition duration-150 ease-in-out w-full sm:w-auto">
            Learn more
          </button>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-lg shadow-xl text-white bg-gradient-to-t from-[#4965D2] to-[#B5C7EB] flex flex-col justify-end min-h-[400px] transition-all duration-300 ease-in-out "
          >
            {/* Icon Area cube */}
            <div className="mb-8 p-6 rounded-full ml-40 self-start">
              <CubeIcon />
            </div>

            {/* Title */}
            <h2 className=" text-center text-5xl font-bold p-3">
              {feature.title}
            </h2>
            <p className="text-center text-[#FFFFFF] text-s leading-relaxed ">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CryptoResellerSection;
