import React from 'react';
import {
  CryptoPurchasePage,
  CryptoResellerSection,
  Footer,
  Navbar,
} from '@/components';

function index() {
  return (
    <div>
      <Navbar />
      <CryptoPurchasePage />
      <CryptoResellerSection />
      <Footer />
    </div>
  );
}

export default index;
