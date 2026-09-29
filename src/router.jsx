import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import CocktailDetail from './pages/CocktailDetail';
import Cocktails from './pages/Cocktails';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RouteError from './pages/RouteError';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cocktails', element: <Cocktails /> },
      { path: 'cocktail/:id', element: <CocktailDetail /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
