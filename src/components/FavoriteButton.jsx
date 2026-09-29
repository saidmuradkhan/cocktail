import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites';

const variants = {
  icon: 'w-10 h-10 rounded-full bg-neutral-950/70 backdrop-blur-md border border-white/10 hover:border-amber-500/50',
  pill: 'gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-amber-500/50 font-semibold',
};

const FavoriteButton = ({ drink, variant = 'icon', className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(drink.id);
  const label = active ? `Remove ${drink.name} from favorites` : `Add ${drink.name} to favorites`;

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(drink)}
      aria-pressed={active}
      aria-label={variant === 'icon' ? label : undefined}
      title={label}
      className={`inline-flex items-center justify-center transition-colors duration-300 ${
        active ? 'text-amber-500' : 'text-neutral-300 hover:text-amber-400'
      } ${variants[variant]} ${className}`}
    >
      {active ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
      {variant === 'pill' && <span>{active ? 'Saved to favorites' : 'Add to favorites'}</span>}
    </button>
  );
};

export default FavoriteButton;
