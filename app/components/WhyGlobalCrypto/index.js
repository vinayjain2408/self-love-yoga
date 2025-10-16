import React from 'react';

const WhyGlobalCrypto = () => {
  const cards = [
    {
      title: 'Empowering Smarter Crypto Investments',
      text: 'We help investors make informed decisions with expert insights, data-driven strategies, and real-time market analysis to maximize returns.',
      button: 'Get the apps',
      image: '/images/mobile.jpg', // replace with your image
    },
    {
      title: 'Expert Strategies for Every Investor',
      text: "Whether you're a beginner or a seasoned trader, we tailor our investment plans to match your goals and risk appetite.",
      button: 'Learn center',
    },
    {
      title: 'Building Financial Freedom Through Crypto',
      text: 'Our mission is to make crypto investing accessible, reliable, and rewarding — helping you achieve long-term financial independence.',
      button: 'CG support',
    },
  ];

  return (
    <section className="bg-emerald-900 py-16 px-6 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12">
        Why Global Crypto?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white text-gray-900 rounded-2xl shadow-md p-8 flex flex-col justify-between"
          >
            <div className="text-left">
              <h3 className="text-2xl text-[#06623B] font-semibold mb-3">
                {card.title}
              </h3>
              <p className="text-16 text-[#06623B] mb-6 leading-relaxed">
                {card.text}
              </p>
              <button className="bg-emerald-100 text-emerald-800 text-sm font-medium px-4 py-2 rounded-xl">
                {card.button}
              </button>
            </div>
            {card.image && (
              <img
                src={card.image}
                alt="crypto"
                className="mt-6 rounded-lg object-cover w-[239px]"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button className="bg-white text-emerald-900 px-6 py-3 rounded-md font-medium hover:bg-emerald-50 transition">
          Get started with Global Crypto
        </button>
      </div>
    </section>
  );
};

export default WhyGlobalCrypto;
