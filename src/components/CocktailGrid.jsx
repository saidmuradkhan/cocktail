import CocktailCard from './CocktailCard';

export const gridClassName = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6';

export const CocktailCardSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse" aria-hidden="true">
    <div className="aspect-square bg-white/5" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-white/10 rounded-full w-3/4" />
      <div className="h-3 bg-white/5 rounded-full w-1/2" />
    </div>
  </div>
);

export const CocktailGridSkeleton = ({ count = 8 }) => (
  <div className={gridClassName} role="status" aria-label="Loading cocktails">
    {Array.from({ length: count }, (_, i) => (
      <CocktailCardSkeleton key={i} />
    ))}
  </div>
);

const CocktailGrid = ({ drinks }) => (
  <ul className={gridClassName}>
    {drinks.map((drink) => (
      <li key={drink.id}>
        <CocktailCard drink={drink} />
      </li>
    ))}
  </ul>
);

export default CocktailGrid;
