import axios from 'axios';
import { extractDrinks, normalizeDrink, normalizeDrinks } from '../utils/normalizeDrink';

const DEFAULT_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Tolerate values like ".../v1/1/" or ".../v1/1/random.php" in the env file.
const baseURL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/[\w-]+\.php$/, '').replace(/\/+$/, '');

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Small in-memory cache so revisiting a page or filter does not refetch.
const cache = new Map();

async function get(path, params, { signal, cacheable = true } = {}) {
  const key = `${path}?${new URLSearchParams(params).toString()}`;
  if (cacheable && cache.has(key)) return cache.get(key);

  const { data } = await api.get(path, { params, signal });
  if (cacheable) cache.set(key, data);
  return data;
}

export async function searchByName(name, options) {
  return normalizeDrinks(await get('/search.php', { s: name }, options));
}

export async function searchByFirstLetter(letter, options) {
  return normalizeDrinks(await get('/search.php', { f: letter.toLowerCase() }, options));
}

/** filter.php only returns id, name and thumbnail for each drink. */
export async function filterByIngredient(ingredient, options) {
  return normalizeDrinks(await get('/filter.php', { i: ingredient }, options));
}

/** filter.php only returns id, name and thumbnail for each drink. */
export async function filterByCategory(category, options) {
  return normalizeDrinks(await get('/filter.php', { c: category }, options));
}

export async function listCategories(options) {
  const data = await get('/list.php', { c: 'list' }, options);
  return extractDrinks(data)
    .map((item) => item.strCategory)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

export async function lookupCocktail(id, options) {
  const [drink] = normalizeDrinks(await get('/lookup.php', { i: id }, options));
  return drink ?? null;
}

export async function getRandomCocktail(options) {
  const data = await get('/random.php', {}, { ...options, cacheable: false });
  return normalizeDrink(extractDrinks(data)[0]);
}
