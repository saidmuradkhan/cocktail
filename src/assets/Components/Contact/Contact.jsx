import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="flex-grow pt-32 pb-20 px-6 flex justify-center items-center relative bg-neutral-950">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div className="flex flex-col justify-center">
          <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">Reservations</h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">Join Us for <br />an Evening</h1>
          <p className="text-neutral-400 mb-12 text-lg leading-relaxed max-w-md">
            Whether you're celebrating a special occasion or simply savoring the night, we look forward to hosting you at .
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-500 shrink-0 border border-white/10">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 text-lg">Location</h4>
                <p className="text-neutral-400">123 Cocktail Avenue, Mixology District<br />New York, NY 10012</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-500 shrink-0 border border-white/10">
                <FaPhoneAlt className="text-lg" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 text-lg">Phone</h4>
                <p className="text-neutral-400">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-500 shrink-0 border border-white/10">
                <FaEnvelope className="text-lg" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 text-lg">Email</h4>
                <p className="text-neutral-400">reservations@lounge.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none"></div>

          <h3 className="text-3xl font-serif text-white mb-8">Request a Table</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Name</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Email</label>
                <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 transition-colors" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Date</label>
                <input type="date" className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]" style={{ colorScheme: 'dark' }} />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Guests</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none">
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1">Special Requests</label>
              <textarea rows="3" className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none" placeholder="Any dietary requirements or special occasions?"></textarea>
            </div>

            <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-lg rounded-xl transition-all duration-300 mt-2 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;