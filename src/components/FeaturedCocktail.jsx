import { Link } from 'react-router-dom';
import { FaArrowRight, FaRedo } from 'react-icons/fa';
import { useAsync } from '../hooks/useAsync';
import { getRandomCocktail } from '../services/api';
import FavoriteButton from './FavoriteButton';
import { ErrorState, Spinner } from './StatusMessage';

const FeaturedCocktail = () => {
  const { data: cocktail, loading, error, retry } = useAsync('random', (signal) => getRandomCocktail({ signal }));

  if (loading) return <Spinner label="Crafting your drink..." />;
  if (error || !cocktail) {
    return <ErrorState message="We could not mix a cocktail of the moment right now." onRetry={retry} />;
  }

  return (
    <article className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
      <div className="w-full md:w-2/5 h-72 md:h-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {cocktail.category && (
          <div className="absolute bottom-4 left-4 z-20 bg-neutral-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">{cocktail.category}</span>
          </div>
        )}
        <FavoriteButton drink={cocktail} className="absolute top-4 right-4 z-20" />
      </div>

      <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 flex flex-col justify-between relative">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-500/80 font-semibold mb-3">Cocktail of the moment</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-2 leading-tight">
            {cocktail.name}
          </h2>
          {cocktail.glass && <p className="text-neutral-400 mb-8 italic">Served in a {cocktail.glass}</p>}

          <h3 className="text-sm uppercase tracking-widest text-amber-500 mb-4 font-semibold">Ingredients</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-10">
            {cocktail.ingredients.map(({ name, measure }, index) => (
              <li key={`${name}-${index}`} className="flex items-center text-neutral-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3 opacity-50 shrink-0" aria-hidden="true" />
                <span className="font-medium mr-1">{name}</span>
                {measure && <span className="text-neutral-500 text-xs">({measure})</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={retry}
            className="flex items-center justify-center gap-3 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          >
            <FaRedo aria-hidden="true" />
            <span>Discover Another</span>
          </button>
          <Link
            to={`/cocktail/${cocktail.id}`}
            className="flex items-center justify-center gap-3 px-8 py-3.5 border border-white/15 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-xl transition-colors"
          >
            <span>Full recipe</span>
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedCocktail;
