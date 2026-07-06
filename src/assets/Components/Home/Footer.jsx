import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-3xl font-serif font-bold text-amber-500 mb-6"></h2>
        <p className="text-neutral-400 max-w-md text-center mb-8">
          Elevating the art of mixology. Experience handcrafted cocktails in an atmosphere of unparalleled elegance.
        </p>
        <div className="flex gap-6 mb-12">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300">
            <FaFacebookF />
          </a>
        </div>
        <p className="text-neutral-600 text-sm">
          &copy; {new Date().getFullYear()}  Cocktail Lounge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer;
