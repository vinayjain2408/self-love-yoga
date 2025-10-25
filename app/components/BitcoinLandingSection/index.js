import React from 'react';

const BitcoinLandingSection = () => {
  return (
    // Main container with dark background and minimum screen height
    <div className="relative min-h-half text-white flex items-center p-8 md:p-0 overflow-hidden ">
      <div className="mb-40 ">
        <div className="absolute inset-0 z-0 opacity-80">
          <div className="absolute inset-0 bg-blue-100/10">
            <img
              src="/images/gobal.jpg"
              alt="crypto"
              className=" w-full h-full bg-cover bg-center"
            />
          </div>

          {/* Scattered Glowing Cubes (Simplified representation) */}

          {/* Cube 1 (Large, top right) */}
          <div className="absolute top-[10%] right-[5%] w-16 h-16 bg-white/10 shadow-[0_0_40px_rgba(59,130,246,0.8)] transform rotate-45 border border-blue-500/50"></div>

          {/* Cube 2 (Medium, near center right) */}
          <div className="absolute top-1/3 right-[15%] w-10 h-10 bg-white/10 shadow-[0_0_25px_rgba(59,130,246,0.7)] transform rotate-45 border border-blue-500/50"></div>

          {/* Cube 3 (Small, bottom right) */}
          <div className="absolute bottom-1/4 right-[5%] w-8 h-8 bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.6)] transform rotate-45 border border-blue-500/50"></div>

          {/* Cube 4 (Top left) */}
          <div className="absolute top-[5%] left-[30%] w-6 h-6 bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform rotate-45 border border-blue-500/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl pt-20 md:pt-0 ">
          {/* Heading Text */}
          <h1 className="text-xl md:text-7xl lg:text-4xl ml-24 mt-40 font-bold leading-tight tracking-tight ">
            <span className="text-white">BITCOIN is an</span>
            <br />
            <span className="text-white">innovative payment</span>
            <br />
            <span className="text-white">network a new kind</span>
            <br />
            <span className="text-white">of money</span>
          </h1>

          {/* Buttons */}
          <div className="flex flex-col ml-20 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-16">
            {/* "Choose your wallet" Button (Outline style) */}
            <button className="px-7 py-3 border-2 border-white text-[#000B1D] bg-[#FFFFFF] font-medium text-lg rounded-md transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
              Choose your wallet
            </button>

            {/* "Buy Bitcoin" Button (Solid white style) */}
            <button className="px-7 py-0 border-2 border-transparent text-black bg-white font-medium text-lg rounded-md transition focus:outline-none focus:ring-4 focus:ring-opacity-50 ">
              Buy Bitcoin
            </button>
          </div>
        </div>
        {/* <img
        src="/images/gobal.jpg"
        alt="crypto"
        className="mt-6 rounded-lg ml-20 object-cover w-[700px]"
      /> */}
      </div>
    </div>
  );
};

export default BitcoinLandingSection;

// import React from 'react';

// function BitcoinBanner() {
//   return (
//     <div>
//       <img src="/images/gobal.jpg" alt="crypto" />
//     </div>
//   );
// }

// export default BitcoinBanner;
