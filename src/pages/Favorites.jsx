import { Link } from 'react-router-dom';
import CocktailGrid from '../components/CocktailGrid';
import { EmptyState } from '../components/StatusMessage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFavorites } from '../hooks/useFavorites';

const Favorites = () => {
  useDocumentTitle('Favorites');
  const { favorites, count, clearFavorites } = useFavorites();

  return (
    <div className="flex-grow pt-32 pb-20 px-6 relative overflow-hidden bg-neutral-950">
      <div className="absolute top-0 left-0 w-[600px] max-w-full h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <p className="text-amber-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">Your Shelf</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
            Favorite <span className="italic text-amber-500">Cocktails</span>
          </h1>
        </header>

        {count === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Tap the heart on any cocktail to save it here. Your favorites are stored on this device."
          >
            <Link
              to="/cocktails"
              className="mt-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
            >
              Browse cocktails
            </Link>
          </EmptyState>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-neutral-400">
                {count} saved {count === 1 ? 'cocktail' : 'cocktails'}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Remove all cocktails from your favorites?')) clearFavorites();
                }}
                className="text-sm text-amber-500 hover:text-amber-400 font-semibold rounded"
              >
                Clear all
              </button>
            </div>
            <CocktailGrid drinks={favorites} />
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
