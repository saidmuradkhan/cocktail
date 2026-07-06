import React, { useState, useEffect } from 'react';
import { FaRedo } from 'react-icons/fa';
import { fetchRandomCocktailService } from '../../services/Service';

const Body = () => {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomCocktail = async () => {
    setLoading(true);
    try {
      const data = await fetchRandomCocktailService();
      setCocktail(data.drinks[0]);
    } catch (error) { 
      console.error("Error fetching cocktail:", error);  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  return (
    <div className="flex-grow flex items-center justify-center pt-20 px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950">
      <div className="w-full max-w-4xl relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="text-amber-500/80 uppercase tracking-widest text-sm animate-pulse">Crafting your drink...</p>
          </div>
        ) : cocktail ? (
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
            <div className="w-full md:w-2/5 h-72 md:h-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <img 
                src={cocktail.strDrinkThumb} 
                alt={cocktail.strDrink} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-neutral-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">{cocktail.strCategory}</span>
              </div>
            </div>
            
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between relative">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 leading-tight">
                  {cocktail.strDrink}
                </h1>
                <p className="text-neutral-400 mb-8 italic">Served in a {cocktail.strGlass}</p>
                
                <h3 className="text-sm uppercase tracking-widest text-amber-500 mb-4 font-semibold">Ingredients</h3>

{/* Aİ */}

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 mb-10">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const ingredient = cocktail[`strIngredient${i + 1}`];
                    const measure = cocktail[`strMeasure${i + 1}`];
                    if (ingredient) {
                      return (
                        <li key={i} className="flex items-center text-neutral-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3 opacity-50 shrink-0"></span>
                          <span className="font-medium mr-1">{ingredient}</span>
                          {measure && <span className="text-neutral-500 text-xs">({measure.trim()})</span>}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>

{/* Aİ */}                

              </div>
              
              <div className="mt-auto pt-4 border-t border-white/10">
                <button 
                  onClick={fetchRandomCocktail}
                  className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                >
                  <FaRedo className={`${loading ? 'animate-spin' : ''}`} />
                  <span>Discover Another</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Body;
