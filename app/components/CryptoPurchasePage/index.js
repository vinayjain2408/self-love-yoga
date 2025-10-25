import React, { useState } from 'react';

const CryptoPurchasePage = () => {
  // State for the tabs (optional but good practice for interactive components)
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ">
        {/* -------------------- Left Section: Promotional Content -------------------- */}
        <div className="space-y-6 order-2 lg:order-1">
          {/* Tagline */}
          <span
            className="inline-block px-4 py-2 text-sm font-semibold text-[#FFFFFF] bg-gradient-to-l 
             from-[#4965D2]
             to-[#B5C7EB] rounded-lg shadow-lg "
          >
            Start investing to get big returns
          </span>

          {/* Main Headings */}
          <h1 className="text-1xl sm:text-1xl lg:text-3xl font-bold text-[#000000] leading-tight mr-14">
            Instant Crypto <br />
            Purchase Available <br />
            Now on Global Crypto
          </h1>

          {/* Subtext */}
          <p className="text-base text-[#4965D2] max-w-lg ">
            Buy Bitcoin and 70+ cryptocurrencies on Global crypto with your
            credit - card
          </p>
          <p>fast , secure and easy.</p>

          {/* Accepted Payment Methods */}
          <div className="pt-0 ">
            <p className="text-sm font-medium text-[#858391] mb-4">
              Accepted Payment method
            </p>
            <div className="flex items-center space-x-4">
              {/* These would ideally be SVGs or actual image components */}
              <div
                className="w-12 h-24 bg-[#FFFFFF] rounded-lg mt-0 "
                title="Mastercard"
              >
                <img src="/images/Mastercard.png" alt="crypto" />
              </div>
              <div
                className="w-12 h-24 rounded-full bg-[#FFFFFF] mt-0 "
                title="Visa"
              >
                <img src="/images/Visa.png" alt="crypto" />
              </div>
              <div className="w-12 h-24 bg-[#FFFFFF]" title="Phone Pay">
                <img src="\images\Phonepay.png" alt="crypto" />
              </div>
              <div
                className="w-12 h-24 bg-[#FFFFFF] rounded-lg "
                title="Google Pay"
              >
                <img src="\images\G-pay.png" alt="crypto" />
              </div>
            </div>
          </div>
        </div>

        {/* -------------------- Right Section: Purchase Form -------------------- */}
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-100 order-1 lg:order-2">
          {/* Buy/Sell Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              className={`flex-1 py-3 text-lg font-semibold transition-colors ${
                activeTab === 'buy'
                  ? 'text-[white] bg-[#4965D2] rounded-lg'
                  : 'text-[#4965D2] border border-[#4965D2] hover:bg-gray-100 rounded-lg'
              }`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-3 text-lg font-semibold transition-colors ${
                activeTab === 'sell'
                  ? 'text-white bg-[#4965D2] rounded-lg'
                  : 'text-[#4965D2] border border-[#4965D2] hover:bg-gray-100 rounded-lg'
              }`}
              onClick={() => setActiveTab('sell')}
            >
              Sell
            </button>
          </div>

          <form className="space-y-5">
            {/* The amount to be paid */}
            <div>
              <label className="block text-sm font-medium text-[#858391] mb-1">
                The amount to be paid
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="The limit is 10 - 5000"
                  className="w-full p-3 pr-16 border border-gray-300 rounded-lg bg-[#D9D9D9] text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  readOnly // Set to readOnly as per image style
                />
                <span className="absolute inset-y-0 right-0 flex items-center w-26 h-8 rounded-lg mr-2 mt-2 bg-[#FFFFFF3B] rounded-lg pr-4  text-gray-500 font-semibold">
                  <span className="text-yellow-500 mr-1">💰</span> USD
                </span>
              </div>
            </div>

            {/* Currency Purchased */}
            <div>
              <label className="block text-sm font-medium text-[#858391] mb-1">
                Currency Purchased
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="limit 9.52 - 4760"
                  className="w-full p-3 pr-16 border border-gray-300 rounded-lg bg-[#D9D9D9] text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  readOnly // Set to readOnly as per image style
                />
                <span className="absolute inset-y-0 right-0 flex items-center w-26 h-8 rounded-lg mr-2 mt-2 bg-[#FFFFFF3B] pr-4 text-[#696262] font-semibold">
                  <span className="text-yellow-500  mr-1">💰</span>
                  USD
                </span>
              </div>
            </div>

            {/* Pay with */}
            <div>
              <label className="block text-sm font-medium text-[#858391] mb-1">
                Pay with
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full p-3 border border-gray-300 rounded-lg bg-[#D9D9D9] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Reference Price */}
            {/* <div className="pt-2">
              <p className="text-sm flex flex-wrap gap-4 text-[#858391] font-bold">
                Reference Price <p>1 USDT** = 1.05 USDT</p>
              </p>
            </div> */}
            <div className="flex flex-1 gap-52 justify-center md:justify-start text-[#4965D2]">
              <span className="text-sm flex flex-wrap gap-4 text-[#858391] font-bold">
                Reference Price
              </span>
              <span className="text-s font-semibold text-[#403480]">
                USDT = 1.05 USDT
              </span>
            </div>

            {/* Buy USDT Button */}
            <button
              type="submit"
              className="w-full py-3 mt-2 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/50"
            >
              Buy USDT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CryptoPurchasePage;
