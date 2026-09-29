const MAX_INGREDIENTS = 15;

/**
 * Converts a raw TheCocktailDB drink object into a clean, predictable shape.
 * Works for full records (search/lookup/random) as well as the partial
 * records returned by filter.php, which only contain id, name and thumbnail.
 */
export function normalizeDrink(raw) {
  if (!raw || typeof raw !== 'object' || !raw.idDrink) return null;

  const ingredients = [];
  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    const name = raw[`strIngredient${i}`]?.trim();
    if (!name) continue;
    const measure = raw[`strMeasure${i}`]?.trim() ?? '';
    ingredients.push({ name, measure });
  }

  return {
    id: raw.idDrink,
    name: raw.strDrink ?? 'Unknown cocktail',
    image: raw.strDrinkThumb ?? '',
    category: raw.strCategory ?? null,
    alcoholic: raw.strAlcoholic ?? null,
    glass: raw.strGlass ?? null,
    instructions: raw.strInstructions?.trim() ?? '',
    ingredients,
  };
}

/** TheCocktailDB returns `drinks: null` or `drinks: "no data found"` when there are no results. */
export function extractDrinks(data) {
  return Array.isArray(data?.drinks) ? data.drinks : [];
}

export function normalizeDrinks(data) {
  return extractDrinks(data).map(normalizeDrink).filter(Boolean);
}

/** TheCocktailDB serves resized thumbnails via /preview, /small, /medium and /large suffixes. */
export function thumbnail(image, size = 'medium') {
  return image ? `${image}/${size}` : '';
}

export function ingredientImage(name, size = 'Small') {
  return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(name)}-${size}.png`;
}
