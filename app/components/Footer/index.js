import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Send,
  MessageCircle,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-[#006b4f] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <h3 className="text-2xl font-semibold mb-3 leading-tight">
            Take your crypto <br /> trading to the next level.
          </h3>
          <h2 className="text-lg font-bold mb-6">
            GLOBAL <span className="text-[#006b4f]">CRYPTO</span>
          </h2>

          <div className="flex space-x-3">
            <button className="bg-[#008e64] hover:bg-[#00a879] transition-all text-white px-5 py-2 rounded-md font-medium">
              Create account
            </button>
            <button className="border border-[#008e64] text-[#008e64] px-5 py-2 rounded-md font-medium hover:bg-[#008e64] hover:text-white transition-all">
              Sign in
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-1 gap-8">
          {/* Top Row - 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Features */}
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-1 text-sm">
                <li>Margin Trading</li>
                <li>Futures Trading</li>
                <li>OTC Trading</li>
                <li>Institutions</li>
                <li>API Trading</li>
                <li>Staking Rewards</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-1 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Press Room</li>
                <li>Affiliate Program</li>
                <li>Support Center</li>
              </ul>
            </div>

            {/* Browse Prices */}
            <div>
              <h4 className="font-semibold mb-3">Browse Prices</h4>
              <ul className="space-y-1 text-sm">
                <li>Bitcoin Price</li>
                <li>Ethereum Price</li>
                <li>Dogecoin Price</li>
                <li>XRP Price</li>
                <li>All Crypto Prices</li>
              </ul>
            </div>
          </div>

          {/* Middle Row - 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Popular Markets */}
            <div>
              <h4 className="font-semibold mb-3">Popular Markets</h4>
              <ul className="space-y-1 text-sm">
                <li>BTC to USD</li>
                <li>ETH to USD</li>
                <li>DOGE to USD</li>
                <li>XRP to USD</li>
                <li>All Markets</li>
              </ul>
            </div>

            {/* Buying Guides */}
            <div>
              <h4 className="font-semibold mb-3">Buying Guides</h4>
              <ul className="space-y-1 text-sm">
                <li>Buy Bitcoin</li>
                <li>Buy Ethereum</li>
                <li>Buy Dogecoin</li>
                <li>Buy Cardano</li>
                <li>Buy Solana</li>
              </ul>
            </div>

            {/* Crypto Education */}
            <div>
              <h4 className="font-semibold mb-3">Crypto Education</h4>
              <ul className="space-y-1 text-sm">
                <li>What is cryptocurrency?</li>
                <li>What is Bitcoin?</li>
                <li>Best Exchanges</li>
                <li>Crypto Safety Tips</li>
                <li>Learn Crypto</li>
              </ul>
            </div>
          </div>

          {/* Bottom Row - 1 Column */}
          <div>
            <h4 className="font-semibold mb-3">Wallet</h4>
            <ul className="space-y-1 text-sm">
              <li>Crypto Wallet</li>
              <li>Bitcoin Wallet</li>
              <li>Ethereum Wallet</li>
              <li>Solana Wallet</li>
              <li>USDT Wallet</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 pt-6 pb-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 space-y-4 md:space-y-0">
          {/* Links */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <span>Privacy Notice</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
            <span>Disclosures</span>
            <span>Compliance Hub</span>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-[#008e64]">
            <Instagram className="w-5 h-5 hover:text-[#00a879] cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-[#00a879] cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-[#00a879] cursor-pointer" />
            <Youtube className="w-5 h-5 hover:text-[#00a879] cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-[#00a879] cursor-pointer" />
            <Send className="w-5 h-5 hover:text-[#00a879] cursor-pointer" />
            <MessageCircle className="w-5 h-5 hover:text-[#00a879] cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4">
        © 2025 Global Crypto
      </div>
    </footer>
  );
}
