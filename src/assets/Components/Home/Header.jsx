import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaGlassMartiniAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-amber-500 hover:text-amber-400 transition-colors">
          <FaGlassMartiniAlt className="text-3xl" />
          <span className="text-2xl font-serif font-bold tracking-wider">Cocktail</span>
        </Link>
        <nav className="flex gap-8">
          <NavLink to="/" className={({isActive}) => `text-sm uppercase tracking-widest font-medium transition-colors ${isActive ? 'text-amber-500' : 'text-neutral-400 hover:text-white'}`}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => `text-sm uppercase tracking-widest font-medium transition-colors ${isActive ? 'text-amber-500' : 'text-neutral-400 hover:text-white'}`}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => `text-sm uppercase tracking-widest font-medium transition-colors ${isActive ? 'text-amber-500' : 'text-neutral-400 hover:text-white'}`}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header;
