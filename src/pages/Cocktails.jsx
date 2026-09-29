import { useEffect, useEffectEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import CocktailGrid, { CocktailGridSkeleton } from '../components/CocktailGrid';
import { EmptyState, ErrorState } from '../components/StatusMessage';
import { ALPHABET } from '../constants';
import { useAsync } from '../hooks/useAsync';
import { useDebounce } from '../hooks/useDebounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  filterByCategory,
  filterByIngredient,
  listCategories,
  searchByFirstLetter,
  searchByName,
} from '../services/api';

const DEFAULT_LETTER = 'a';

/**
 * Resolves the current filters to a list of drinks.
 * search.php returns full records (category is known, so we filter locally);
 * filter.php only returns id/name/thumb, so combining an ingredient with a
 * category is done by intersecting two filter.php responses by id.
 */
async function fetchCocktails({ q, by, category, letter }, signal) {
  const options = { signal };
  const byCategory = (drinks) => (category ? drinks.filter((d) => d.category === category) : drinks);

  if (q) {
    if (by === 'ingredient') {
      // The free API key caps filter.php?i= at very few results, so we also include
      // name-search results (full records) that really contain the ingredient.
      const pattern = new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      const [filtered, named] = await Promise.all([
        filterByIngredient(q, options),
        searchByName(q, options),
      ]);
      const seen = new Set(filtered.map((d) => d.id));
      const extra = named.filter(
        (d) => !seen.has(d.id) && d.ingredients.some((ingredient) => pattern.test(ingredient.name)),
      );
      if (!category) return [...filtered, ...extra];
      // filter.php records have no category, so intersect them with the category list by id.
      const inCategory = filtered.length
        ? new Set((await filterByCategory(category, options)).map((d) => d.id))
        : new Set();
      return [...filtered.filter((d) => inCategory.has(d.id)), ...byCategory(extra)];
    }
    return byCategory(await searchByName(q, options));
  }
  if (letter) return byCategory(await searchByFirstLetter(letter, options));
  if (category) return filterByCategory(category, options);
  return searchByFirstLetter(DEFAULT_LETTER, options);
}

function describeResults({ q, by, category, letter }, count) {
  const noun = count === 1 ? 'cocktail' : 'cocktails';
  const parts = [`${count} ${noun}`];
  if (q) parts.push(by === 'ingredient' ? `made with “${q}”` : `matching “${q}”`);
  else if (letter || !category) parts.push(`starting with “${(letter || DEFAULT_LETTER).toUpperCase()}”`);
  if (category) parts.push(`in ${category}`);
  return parts.join(' ');
}

const pillClass = (active) =>
  `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
    active ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
  }`;

const Cocktails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q')?.trim() ?? '';
  const by = searchParams.get('by') === 'ingredient' ? 'ingredient' : 'name';
  const category = searchParams.get('c') ?? '';
  const rawLetter = searchParams.get('letter')?.toLowerCase() ?? '';
  const letter = !q && /^[a-z]$/.test(rawLetter) ? rawLetter : '';
  const filters = { q, by, category, letter };
  const activeLetter = q ? '' : letter || (category ? '' : DEFAULT_LETTER);

  useDocumentTitle(q ? `“${q}” cocktails` : 'Browse cocktails');

  // Keep the text input in sync with the URL (e.g. back/forward, clearing filters).
  const [input, setInput] = useState(q);
  const [syncedQuery, setSyncedQuery] = useState(q);
  if (q !== syncedQuery) {
    setSyncedQuery(q);
    if (input.trim() !== q) setInput(q);
  }

  const updateParams = (changes, options) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next, options);
  };

  const debouncedInput = useDebounce(input, 450);
  const commitDebouncedQuery = useEffectEvent((value) => {
    const trimmed = value.trim();
    if (trimmed !== q) updateParams({ q: trimmed, letter: trimmed ? '' : letter }, { replace: true });
  });
  useEffect(() => {
    commitDebouncedQuery(debouncedInput);
  }, [debouncedInput]);

  const categoriesRequest = useAsync('categories', (signal) => listCategories({ signal }));
  const { data: drinks, loading, error, retry } = useAsync(JSON.stringify(filters), (signal) =>
    fetchCocktails(filters, signal),
  );

  const hasFilters = Boolean(q || category || letter || by === 'ingredient');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    updateParams({ q: trimmed, letter: trimmed ? '' : letter });
  };

  const selectLetter = (value) => {
    setInput('');
    updateParams({ letter: value, q: '' });
  };

  const clearAll = () => {
    setInput('');
    setSearchParams({});
  };

  return (
    <div className="flex-grow pt-32 pb-20 px-6 relative overflow-hidden bg-neutral-950">
      <div className="absolute top-0 right-0 w-[700px] max-w-full h-[700px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <p className="text-amber-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">The Library</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">
            Browse <span className="italic text-amber-500">Cocktails</span>
          </h1>
        </header>

        {/* Controls */}
        <section
          aria-label="Search and filters"
          className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 mb-10 space-y-5 backdrop-blur-sm"
        >
          <form role="search" onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <label htmlFor="cocktail-search" className="sr-only">
                {by === 'ingredient' ? 'Search cocktails by ingredient' : 'Search cocktails by name'}
              </label>
              <FaSearch
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="cocktail-search"
                type="search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={by === 'ingredient' ? 'Ingredient, e.g. Gin or Lime' : 'Cocktail name, e.g. Margarita'}
                autoComplete="off"
                className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-5 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus-visible:border-amber-500/60 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div
                role="group"
                aria-label="Search by"
                className="inline-flex p-1 rounded-xl bg-black/20 border border-white/10 self-start sm:self-auto"
              >
                <button
                  type="button"
                  aria-pressed={by === 'name'}
                  className={pillClass(by === 'name')}
                  onClick={() => updateParams({ by: '' })}
                >
                  Name
                </button>
                <button
                  type="button"
                  aria-pressed={by === 'ingredient'}
                  className={pillClass(by === 'ingredient')}
                  onClick={() => updateParams({ by: 'ingredient' })}
                >
                  Ingredient
                </button>
              </div>

              <div className="flex-grow sm:min-w-56">
                <label htmlFor="category-filter" className="sr-only">
                  Filter by category
                </label>
                <select
                  id="category-filter"
                  value={category}
                  onChange={(event) => updateParams({ c: event.target.value })}
                  disabled={categoriesRequest.loading && !category}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus-visible:border-amber-500/60 transition-colors [color-scheme:dark]"
                >
                  <option value="">All categories</option>
                  {category && !categoriesRequest.data?.includes(category) && (
                    <option value={category}>{category}</option>
                  )}
                  {(categoriesRequest.data ?? []).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <p id="letter-label" className="text-xs uppercase tracking-wider text-neutral-500 font-medium shrink-0">
              Browse A–Z
            </p>
            <div role="group" aria-labelledby="letter-label" className="flex flex-wrap gap-1.5">
              {ALPHABET.map((char) => {
                const value = char.toLowerCase();
                const active = activeLetter === value;
                return (
                  <button
                    key={char}
                    type="button"
                    aria-pressed={active}
                    aria-label={`Cocktails starting with ${char}`}
                    onClick={() => selectLetter(value)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-amber-500 text-neutral-950'
                        : 'border border-white/10 text-neutral-400 hover:text-amber-400 hover:border-amber-500/50'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 min-h-8">
          <p className="text-neutral-400" aria-live="polite">
            {loading ? 'Searching the bar…' : drinks ? describeResults(filters, drinks.length) : ''}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 font-semibold rounded"
            >
              <FaTimes aria-hidden="true" /> Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <CocktailGridSkeleton count={12} />
        ) : error ? (
          <ErrorState onRetry={retry} />
        ) : drinks && drinks.length > 0 ? (
          <CocktailGrid drinks={drinks} />
        ) : (
          <EmptyState
            message={
              q
                ? `We couldn't find any cocktails ${by === 'ingredient' ? 'made with' : 'matching'} “${q}”${category ? ` in ${category}` : ''}. Try another ${by === 'ingredient' ? 'ingredient' : 'name'}.`
                : 'Nothing on the menu for this selection. Try another letter or category.'
            }
          >
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="mt-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
              >
                Clear filters
              </button>
            )}
          </EmptyState>
        )}
      </div>
    </div>
  );
};

export default Cocktails;
