import React, { useState } from 'react';

const categories = ['Popular', 'Rewards', 'Stablecoins', 'Newly listed'];

const cryptos = [
  { name: 'Polkadot', symbol: 'DOT', price: '$3.27', change: '+5.37%' },
  { name: 'Dogecoin', symbol: 'DOGE', price: '$0.21', change: '+8.98%' },
  { name: 'XRP', symbol: 'XRP', price: '$2.58', change: '+6.88%' },
  { name: 'Uniswap', symbol: 'UNI', price: '$6.68', change: '+9.22%' },
  { name: 'Shiba Inu', symbol: 'SHIB', price: '$0.0011', change: '+7.45%' },
  { name: 'Bitcoin', symbol: 'BTC', price: '$139.00', change: '+4.25%' },
  { name: 'TRON', symbol: 'TRX', price: '$0.32', change: '+1.56%' },
  { name: 'Stellar', symbol: 'XLM', price: '$0.34', change: '+5.81%' },
  { name: 'Chainlink', symbol: 'LINK', price: '$19.34', change: '+10.15%' },
  { name: 'Litecoin', symbol: 'LTC', price: '$96.94', change: '+1.02%' },
  { name: 'Pepe', symbol: 'PEPE', price: '$0.00076', change: '+11.56%' },
  { name: 'Bitcoin Cash', symbol: 'BCH', price: '$540.29', change: '+3.03%' },
  { name: 'The Graph', symbol: 'GRT', price: '$0.070', change: '+8.21%' },
  { name: 'Axie Infinity', symbol: 'AXS', price: '$1.74', change: '+9.31%' },
  { name: 'Kusama', symbol: 'KSM', price: '$11.93', change: '+9.89%' },
  { name: 'Polygon', symbol: 'MATIC', price: '$0.20', change: '+2.71%' },
  { name: 'Waves', symbol: 'WAVES', price: '$0.88', change: '+10.23%' },
  { name: 'Cosmos', symbol: 'ATOM', price: '$13.52', change: '+7.94%' },
];

const CryptoPortfolio = () => {
  const [activeCategory, setActiveCategory] = useState('Popular');

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center text-white px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Build your crypto portfolio
      </h1>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-4 rounded-sm px-2 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-white text-green-800'
                : 'text-white hover:bg-green-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Crypto Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mt-10">
        {cryptos.map((coin) => (
          <div
            key={coin.symbol}
            className="rounded-xl px-4 py-2 shadow-md transition-all border border-white flex items-center space-x-3"
          >
            <img
              src="/images/coins1.png"
              alt={coin.name}
              className="w-10 h-10 object-contain"
            />

            <div className="flex flex-col">
              <div className="font-semibold text-sm text-white">
                {coin.name}{' '}
                <span className="text-gray-200 text-xs">({coin.symbol})</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-white opacity-80">
                  {coin.price}
                </span>
                <span className="text-sm text-white">{coin.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sign Up Button */}
      <button className="mt-10 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition-all">
        Sign up
      </button>
    </div>
  );
};

export default CryptoPortfolio;

// import React, { useState } from "react";

// const categories = ["Popular", "Rewards", "Stablecoins", "Newly listed"];

// const cryptos = [
//   { name: "Polkadot", symbol: "DOT", price: "$3.27", change: "+5.37%" },
//   { name: "Dogecoin", symbol: "DOGE", price: "$0.21", change: "+8.98%" },
//   { name: "XRP", symbol: "XRP", price: "$2.58", change: "+6.88%" },
//   { name: "Uniswap", symbol: "UNI", price: "$6.68", change: "+9.22%" },
//   { name: "Shiba Inu", symbol: "SHIB", price: "$0.000011", change: "+7.45%" },
//   { name: "Bitcoin", symbol: "BTC", price: "$114,539.00", change: "+3.03%" },
//   { name: "Ethereum", symbol: "ETH", price: "$4,139.00", change: "+2.51%" },
//   { name: "TRON", symbol: "TRX", price: "$0.32", change: "+1.56%" },
//   { name: "Stellar", symbol: "XLM", price: "$0.34", change: "+5.81%" },
//   { name: "Chainlink", symbol: "LINK", price: "$19.34", change: "+10.15%" },
//   { name: "Litecoin", symbol: "LTC", price: "$96.94", change: "+1.02%" },
//   { name: "Pepe", symbol: "PEPE", price: "$0.000076", change: "+11.56%" },
//   { name: "Bitcoin Cash", symbol: "BCH", price: "$540.29", change: "+3.03%" },
//   { name: "The Graph", symbol: "GRT", price: "$0.070", change: "+8.21%" },
//   { name: "Axie Infinity", symbol: "AXS", price: "$1.74", change: "+9.31%" },
//   { name: "Kusama", symbol: "KSM", price: "$11.93", change: "+9.89%" },
//   { name: "Polygon", symbol: "MATIC", price: "$0.20", change: "+2.71%" },
//   { name: "Waves", symbol: "WAVES", price: "$0.88", change: "+10.23%" },
//   { name: "Cosmos", symbol: "ATOM", price: "$3.52", change: "+7.94%" },
// ];

// export default function CryptoPortfolio() {
//   const [activeCategory, setActiveCategory] = useState("Popular");

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#eef3ff] to-[#ffffff] flex flex-col items-center justify-center text-[#1a1a1a] px-4 py-10">
//       {/* Heading */}
//       <h1 className="text-3xl font-semibold mb-8 text-center text-[#304ffe]">
//         Build your crypto portfolio
//       </h1>

//       {/* Category Tabs */}
//       <div className="flex gap-3 mb-8 bg-gray-100 rounded-2xl px-3 py-2 shadow-sm">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
//               activeCategory === cat
//                 ? "bg-[#304ffe] text-white shadow"
//                 : "text-[#304ffe] hover:bg-[#dce0ff]"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Crypto Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
//         {cryptos.map((coin) => (
//           <div
//             key={coin.symbol}
//             className="rounded-xl px-4 py-3 bg-white hover:bg-[#f5f7ff] shadow-sm border border-gray-200 transition-all flex flex-col items-start justify-center"
//           >
//             {/* Icon placeholder */}
//             <div className="w-8 h-8 bg-gradient-to-tr from-[#4f5dff] to-[#8a9bff] rounded-lg mb-2"></div>

//             <div className="text-sm font-medium text-[#1a1a1a]">
//               {coin.name}{" "}
//               <span className="text-gray-500 text-xs ml-1">
//                 {coin.symbol}
//               </span>
//             </div>
//             <div className="text-sm text-gray-600">{coin.price}</div>
//             <div className="text-xs text-green-500 font-medium">
//               {coin.change}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Sign Up Button */}
//       <button className="mt-12 bg-[#304ffe] hover:bg-[#465aff] text-white px-8 py-2 rounded-lg font-medium transition-all">
//         Sign up
//       </button>
//     </div>
//   );
// }
