import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaSearch } from 'react-icons/fa';
import FeaturedCocktail from '../components/FeaturedCocktail';
import { ALPHABET, BRAND_NAME, FEATURED_SPIRITS } from '../constants';
import { useAsync } from '../hooks/useAsync';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { listCategories } from '../services/api';
import { ingredientImage } from '../utils/normalizeDrink';

const chipClass =
  'inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors';

const Home = () => {
  useDocumentTitle(null);
  const { data: categories } = useAsync('categories', (signal) => listCategories({ signal }));

  return (
    <div className="flex-grow bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] max-w-full h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-amber-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">Welcome to</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {BRAND_NAME.split(' ')[0]} <span className="italic text-amber-500">{BRAND_NAME.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Your guide to the world of mixology. Search hundreds of cocktail recipes by name or ingredient, explore
            new classics and keep a shelf of your favorites.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/cocktails"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
              <FaSearch aria-hidden="true" /> Browse cocktails
            </Link>
            <Link
              to="/favorites"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-white/15 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-xl transition-colors"
            >
              <FaHeart aria-hidden="true" /> Your favorites
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 relative z-10">
          <FeaturedCocktail />
        </div>
      </section>

      {/* Browse */}
      <section className="px-6 pb-24" aria-labelledby="browse-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">Explore</h2>
            <p id="browse-heading" className="text-4xl md:text-5xl font-serif font-bold text-white">
              Find your next pour
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl font-serif text-white mb-6">By spirit</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {FEATURED_SPIRITS.map((spirit) => (
                  <li key={spirit}>
                    <Link
                      to={`/cocktails?by=ingredient&q=${encodeURIComponent(spirit)}`}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/5 bg-black/20 hover:border-amber-500/40 transition-colors group"
                    >
                      <img
                        src={ingredientImage(spirit)}
                        alt=""
                        loading="lazy"
                        width="64"
                        height="64"
                        className="w-16 h-16 object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="text-sm text-neutral-300 group-hover:text-amber-400">{spirit}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
                <h3 className="text-2xl font-serif text-white mb-6">By category</h3>
                <ul className="flex flex-wrap gap-2">
                  {(categories ?? []).map((category) => (
                    <li key={category}>
                      <Link to={`/cocktails?c=${encodeURIComponent(category)}`} className={chipClass}>
                        {category}
                      </Link>
                    </li>
                  ))}
                  {!categories &&
                    Array.from({ length: 8 }, (_, i) => (
                      <li key={i} className="h-9 w-28 rounded-full bg-white/5 animate-pulse" aria-hidden="true" />
                    ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
                <h3 className="text-2xl font-serif text-white mb-6">From A to Z</h3>
                <ul className="flex flex-wrap gap-2">
                  {ALPHABET.map((letter) => (
                    <li key={letter}>
                      <Link
                        to={`/cocktails?letter=${letter.toLowerCase()}`}
                        aria-label={`Cocktails starting with ${letter}`}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-white/10 text-sm text-neutral-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                      >
                        {letter}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/cocktails"
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold rounded"
            >
              See all cocktails <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
