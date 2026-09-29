# Amber Lounge

A cocktail discovery app with a dark, amber-lit lounge aesthetic. Search hundreds of cocktail recipes by name or ingredient, browse by category or letter, open detailed recipes and keep a personal list of favorites, all powered by [TheCocktailDB](https://www.thecocktaildb.com/).

## Features

- **Cocktail of the moment**: a random cocktail on the home page, with a "Discover another" button.
- **Search and browse** (`/cocktails`)
  - Debounced search by cocktail name, or switch to search by ingredient
  - Category filter loaded from the API
  - A–Z letter browsing
  - Filters live in the URL (`?q=gin&by=ingredient&c=Cocktail`), so results can be shared and bookmarked
  - Loading skeletons, an error state with retry, and an empty state
- **Cocktail details** (`/cocktail/:id`): large image, category, type and glass badges, ingredients with measures and thumbnails, instructions, and "More in this category".
- **Favorites** (`/favorites`): heart any cocktail. Favorites are stored in `localStorage` and the count shows in the navigation.
- **Reservations** (`/contact`): a validated table-request form (required name, valid email, no past dates, guest count) with a confirmation message. It is a demo, so nothing is sent to a server.
- Responsive layout with a mobile menu, per-page document titles, scroll-to-top on navigation, a 404 page and a router error boundary.
- Accessibility: labelled form controls, visible focus styles, a skip link, and aria-labels on icon buttons.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [React Router 7](https://reactrouter.com/) (`createBrowserRouter`)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

**Prerequisites:** Node.js 20.19+ (or 22.12+) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env

# 3. Start the dev server
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

### Environment variables

| Variable            | Description                        | Default                                        |
| ------------------- | ---------------------------------- | ---------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the TheCocktailDB API  | `https://www.thecocktaildb.com/api/json/v1/1`  |

If the variable is missing, the app falls back to the public API URL.

### Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the development server       |
| `npm run build`   | Build for production into `dist/`  |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

## Project Structure

```
src/
├── components/     Reusable UI (Header, Footer, CocktailCard, CocktailGrid, FavoriteButton, ...)
├── context/        FavoritesContext and FavoritesProvider (localStorage-backed)
├── hooks/          useAsync, useDebounce, useDocumentTitle, useFavorites
├── pages/          Home, Cocktails, CocktailDetail, Favorites, About, Contact, NotFound, RouteError
├── services/       api.js: Axios instance and TheCocktailDB endpoints
├── utils/          normalizeDrink.js: converts raw API drinks into a clean shape
├── constants.js    Brand name, navigation links and other constants
├── router.jsx      Route definitions
├── App.jsx         Layout (header, main outlet, footer)
├── main.jsx        Entry point
└── index.css       Tailwind import and theme
```

## Notes on the API

- The free API key (`1`) limits some endpoints. For example, `search.php?f=` returns at most 25 drinks and `filter.php?i=` returns very few. Ingredient search therefore also includes name matches that really contain the ingredient.
- `filter.php` responses only include an id, name and thumbnail, so full details are loaded on the cocktail page.
- Empty results (`drinks: null` or `"no data found"`) are shown as an empty state.

## Credits

Cocktail data and images come from [TheCocktailDB](https://www.thecocktaildb.com/), a free, crowd-sourced cocktail database. Please support the project if you use it.

Built by [saidmuradkhan](https://github.com/saidmuradkhan).
