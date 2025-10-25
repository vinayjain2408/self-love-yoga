import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is crypto investment and how does it work',
    answer:
      'Crypto investment involves buying, holding, or trading digital assets like Bitcoin, Ethereum, and other cryptocurrencies to earn profits as their value grows. We help investors identify the best opportunities through expert research and portfolio management.',
  },
  {
    question: 'Is crypto investment safe?',
    answer:
      'Crypto investments carry a certain level of risk due to market volatility, just like stocks or mutual funds. However, by choosing reputed platforms, diversifying your portfolio, and investing based on research, you can minimize risk and ensure safer growth over time.',
  },
  {
    question: 'How do I get started with investing in crypto?',
    answer:
      'You can start by creating an account on a trusted exchange, completing KYC verification, and funding your wallet. Once set up, you can buy popular cryptocurrencies and gradually build a diversified portfolio with the guidance of our investment experts.',
  },
  {
    question: 'What kind of returns can I expect?',
    answer:
      'Returns in crypto investments can vary depending on market trends, project fundamentals, and your investment strategy. While short-term fluctuations are common, well-researched, long-term investments have historically provided significant returns compared to traditional assets.',
  },
  {
    question: 'How does PMS work?',
    answer:
      'Portfolio Management Services (PMS) are designed for investors seeking professional management of their crypto or traditional assets. Our experts build a personalized investment portfolio based on your financial goals, risk tolerance, and time horizon, continuously optimizing it for better performance.',
  },
  {
    question: 'How can to withdraw',
    answer:
      'You can withdraw your funds anytime by initiating a withdrawal request from your account dashboard. Depending on the payment method or wallet, it may take 1–3 business days for funds to reflect in your bank account or crypto wallet.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center items-center px-4 py-10 text-[#4965D2]">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <h2 className="text-3xl md:text-3xl font-semibold text-center mb-2">
          Frequently asked questions
        </h2>
        <p className="text-center text-20 text-[#4965D2] mb-8">
          Everything you need to know about the product and billing.
        </p>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-400/30 pb-3">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left py-3 focus:outline-none"
              >
                <span className="font-medium text-[17px]">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-100" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-100" />
                )}
              </button>
              {openIndex === index && faq.answer && (
                <p className="text-[#4965D2] text-sm leading-relaxed pl-1">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-[#FFFFFF] text-center mt-10 rounded-xl px-8 py-5 border border-[#4965D2] border bg-[#4965D2] ">
          <div className="flex justify-center mb-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="user1"
              className="w-10 h-10 rounded-full border-2 border-white -mr-2"
            />
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="user2"
              className="w-10 h-10 rounded-full border-2 border-white -mr-2"
            />
            <img
              src="https://randomuser.me/api/portraits/men/55.jpg"
              alt="user3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>

          <h3 className=" font-semibold text-lg">Still have questions?</h3>
          <p className="text-[#FFFFFF] text-sm mb-5">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>

          <button className="bg-[#FFFFFF] transition-all px-5 py-2 rounded-xl text-[#4965D2] font-medium">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
}
