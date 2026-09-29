import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const PILLARS = [
  {
    title: 'Finest Spirits',
    text: 'We source rare and vintage spirits from artisanal distillers around the globe, ensuring every drop tells a unique story of origin and craftsmanship.',
  },
  {
    title: 'Master Mixologists',
    text: 'Our team comprises award-winning bartenders who blend classic techniques with avant-garde culinary science to push the boundaries of flavor.',
  },
  {
    title: 'Immersive Ambiance',
    text: 'Step into a world of shadowed elegance and luminous accents. Every element of our lounge is designed to engage your senses and elevate your evening.',
  },
];

const About = () => {
  useDocumentTitle('About');

  return (
    <div className="flex-grow pt-32 pb-20 px-6 flex flex-col items-center relative overflow-hidden bg-neutral-950">
      <div className="absolute top-0 right-0 w-[800px] max-w-full h-[800px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 text-center mb-20">
        <p className="text-amber-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">Our Story</p>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          The Art of <br /> Liquid <span className="italic text-amber-500">Alchemy</span>
        </h1>
        <div className="w-24 h-1 bg-amber-500/30 mx-auto rounded-full mb-10" />
        <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          Founded in 2026, {BRAND_NAME} represents the pinnacle of modern mixology. We believe that a cocktail is more
          than just a drink—it is an experience, a memory, and a carefully crafted work of art.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {PILLARS.map(({ title, text }, index) => (
          <li
            key={title}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-sm hover:border-amber-500/30 transition-colors duration-300 hover:bg-white/[0.07]"
          >
            <div
              className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 text-2xl font-serif mb-8 border border-amber-500/20"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <h2 className="text-2xl font-serif text-white mb-4">{title}</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-20 text-center">
        <p className="text-neutral-400 mb-6">Ready for your next drink?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/cocktails"
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
          >
            Explore the menu
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 border border-white/15 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-xl transition-colors"
          >
            Reserve a table
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
