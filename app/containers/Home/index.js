import {
  CryptoPortfolio,
  CryptoInvestmentSection,
  BitcoinLandingSection,
  FaqSection,
  Footer,
  Hero,
  Navbar,
  Stats,
  // WhyGlobalCrypto,
} from '@/components';
import React from 'react';

function index() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <CryptoPortfolio />
      <CryptoInvestmentSection />
      <BitcoinLandingSection />
      {/* <WhyGlobalCrypto /> */}
      <FaqSection />
      <Footer />
    </div>
  );
}

export default index;
