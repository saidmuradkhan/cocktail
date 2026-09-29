import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { thumbnail } from '../utils/normalizeDrink';

const CocktailCard = ({ drink }) => {
  const meta = [drink.category, drink.alcoholic].filter(Boolean).join(' · ');

  return (
    <article className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] focus-within:border-amber-500/40">
      <Link to={`/cocktail/${drink.id}`} className="block rounded-3xl focus-visible:outline-offset-[-2px]">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={thumbnail(drink.image)}
            alt={drink.name}
            loading="lazy"
            width="350"
            height="350"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950/70 via-transparent to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-serif font-semibold text-white leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
            {drink.name}
          </h3>
          {meta ? (
            <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">{meta}</p>
          ) : (
            <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">View recipe</p>
          )}
        </div>
      </Link>
      <FavoriteButton drink={drink} className="absolute top-3 right-3 z-10" />
    </article>
  );
};

export default CocktailCard;
