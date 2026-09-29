import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import CocktailGrid, { CocktailGridSkeleton } from '../components/CocktailGrid';
import FavoriteButton from '../components/FavoriteButton';
import { EmptyState, ErrorState, Spinner } from '../components/StatusMessage';
import { useAsync } from '../hooks/useAsync';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { filterByCategory, lookupCocktail } from '../services/api';
import { ingredientImage } from '../utils/normalizeDrink';

const RELATED_LIMIT = 8;

const Badge = ({ label, value }) => (
  <li className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
    <span className="sr-only">{label}: </span>
    <span className="text-amber-500 font-medium">{value}</span>
  </li>
);

const hideBrokenImage = (event) => {
  event.currentTarget.style.visibility = 'hidden';
};

const RelatedCocktails = ({ category, currentId }) => {
  const { data, loading, error, retry } = useAsync(`related:${category}`, (signal) =>
    filterByCategory(category, { signal }),
  );
  const related = (data ?? []).filter((drink) => drink.id !== currentId).slice(0, RELATED_LIMIT);

  if (!loading && !error && related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="related-heading" className="text-3xl md:text-4xl font-serif font-bold text-white">
          More in <span className="italic text-amber-500">{category}</span>
        </h2>
        <Link
          to={`/cocktails?c=${encodeURIComponent(category)}`}
          className="text-sm text-amber-500 hover:text-amber-400 font-semibold rounded"
        >
          View all
        </Link>
      </div>
      {loading ? (
        <CocktailGridSkeleton count={4} />
      ) : error ? (
        <ErrorState message="We could not load similar cocktails." onRetry={retry} />
      ) : (
        <CocktailGrid drinks={related} />
      )}
    </section>
  );
};

const CocktailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: cocktail, loading, error, retry } = useAsync(`cocktail:${id}`, (signal) =>
    lookupCocktail(id, { signal }),
  );

  useDocumentTitle(cocktail?.name ?? (loading ? 'Loading cocktail' : 'Cocktail not found'));

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/cocktails');
  };

  let content;
  if (loading) {
    content = <Spinner label="Pouring the details..." />;
  } else if (error) {
    content = <ErrorState onRetry={retry} />;
  } else if (!cocktail) {
    content = (
      <EmptyState title="Cocktail not found" message="This recipe seems to have left the menu.">
        <Link
          to="/cocktails"
          className="mt-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
        >
          Browse cocktails
        </Link>
      </EmptyState>
    );
  } else {
    const badges = [
      ['Category', cocktail.category],
      ['Type', cocktail.alcoholic],
      ['Glass', cocktail.glass],
    ].filter(([, value]) => value);

    content = (
      <>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl lg:sticky lg:top-28">
            <img
              src={cocktail.image}
              alt={cocktail.name}
              width="700"
              height="700"
              className="w-full aspect-square object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {cocktail.name}
            </h1>
            {badges.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-8" aria-label="Cocktail details">
                {badges.map(([label, value]) => (
                  <Badge key={label} label={label} value={value} />
                ))}
              </ul>
            )}
            <FavoriteButton drink={cocktail} variant="pill" className="mb-10" />

            <section aria-labelledby="ingredients-heading" className="mb-10">
              <h2
                id="ingredients-heading"
                className="text-sm uppercase tracking-widest text-amber-500 mb-5 font-semibold"
              >
                Ingredients
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cocktail.ingredients.map(({ name, measure }, index) => (
                  <li
                    key={`${name}-${index}`}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3"
                  >
                    <img
                      src={ingredientImage(name)}
                      alt=""
                      loading="lazy"
                      width="56"
                      height="56"
                      onError={hideBrokenImage}
                      className="w-14 h-14 object-contain shrink-0 bg-black/20 rounded-xl p-1"
                    />
                    <div className="min-w-0">
                      <Link
                        to={`/cocktails?by=ingredient&q=${encodeURIComponent(name)}`}
                        className="block text-white font-medium hover:text-amber-400 transition-colors truncate rounded"
                        title={`More cocktails with ${name}`}
                      >
                        {name}
                      </Link>
                      {measure && <p className="text-neutral-500 text-sm">{measure}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {cocktail.instructions && (
              <section aria-labelledby="instructions-heading">
                <h2
                  id="instructions-heading"
                  className="text-sm uppercase tracking-widest text-amber-500 mb-5 font-semibold"
                >
                  Instructions
                </h2>
                <p className="text-neutral-300 leading-relaxed text-lg whitespace-pre-line">{cocktail.instructions}</p>
              </section>
            )}
          </div>
        </article>

        {cocktail.category && <RelatedCocktails category={cocktail.category} currentId={cocktail.id} />}
      </>
    );
  }

  return (
    <div className="flex-grow pt-28 pb-20 px-6 relative overflow-hidden bg-neutral-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[700px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-500 transition-colors mb-8 rounded"
        >
          <FaArrowLeft aria-hidden="true" /> Back
        </button>
        {content}
      </div>
    </div>
  );
};

export default CocktailDetail;
