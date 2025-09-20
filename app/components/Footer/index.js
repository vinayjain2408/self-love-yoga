import React from 'react';
import { Phone, Mail } from 'lucide-react'; // optional icons (shadcn/lucide-react)

const Footer = () => {
  return (
    <footer className="bg-[#7b2d2d] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <img
            src="/images/logo.png"
            alt="Yoga Vaas Logo"
            className="w-28 mb-3"
          />
          <p className="text-sm text-gray-200">
            <strong>YogaVaas</strong>, yoga+vaas (at comfort of your own home)
            is a dream by yoga sadhak Lalit Rana to give you all the flexibility
            to choose from various tailor-made options that suit your needs and
            fit your schedule. We at YogaVaas strive to give you the best
            services and personalized trainers.
          </p>
          <button className="mt-4 bg-[#5c1f1f] hover:bg-[#4a1919] px-4 py-2 rounded-lg text-sm">
            Read More
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="/" className="hover:text-yellow-300">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-300">
                About Us
              </a>
            </li>
            {/* <li>
              <a href="/classes" className="hover:text-yellow-300">
                Classes & Fees
              </a>
            </li> */}
            <li>
              <a href="/contact" className="hover:text-yellow-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-3">
            <span className="font-semibold">Yoga Vaas</span>
          </p>
          <p className="flex items-center gap-2 mb-2">
            <Phone size={18} className="text-green-400" />
            <span>
              <strong>Call Us:</strong> +91 7617694452
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Mail size={18} className="text-green-400" />
            <span>
              <strong>Email:</strong> info@yogavaas.com
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm text-gray-300">
        © 2020-2025 yogavaas.com. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
