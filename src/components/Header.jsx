import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaGlassMartiniAlt, FaTimes } from 'react-icons/fa';
import { BRAND_NAME, NAV_LINKS } from '../constants';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesBadge = ({ count }) =>
  count > 0 ? (
    <span className="ml-2 inline-flex min-w-5 h-5 px-1.5 items-center justify-center rounded-full bg-amber-500 text-neutral-950 text-[11px] font-bold tracking-normal">
      {count}
      <span className="sr-only"> saved</span>
    </span>
  ) : null;

const linkClass = ({ isActive }) =>
  `inline-flex items-center text-sm uppercase tracking-widest font-medium transition-colors rounded ${
    isActive ? 'text-amber-500' : 'text-neutral-400 hover:text-white'
  }`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(null);
  const { pathname } = useLocation();
  const { count } = useFavorites();

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const renderLinks = (mobile) =>
    NAV_LINKS.map(({ to, label, end }) => (
      <li key={to}>
        <NavLink
          to={to}
          end={end}
          onClick={() => setMenuOpen(false)}
          className={(state) => `${linkClass(state)} ${mobile ? 'w-full py-3 text-base' : ''}`}
        >
          {label}
          {to === '/favorites' && <FavoritesBadge count={count} />}
        </NavLink>
      </li>
    ));

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-neutral-950 focus:rounded-lg focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-amber-500 hover:text-amber-400 transition-colors rounded"
          aria-label={`${BRAND_NAME} home`}
        >
          <FaGlassMartiniAlt className="text-3xl" aria-hidden="true" />
          <span className="text-2xl font-serif font-bold tracking-wider">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8">{renderLinks(false)}</ul>
        </nav>

        <button
          type="button"
          className="md:hidden relative w-11 h-11 inline-flex items-center justify-center rounded-xl border border-white/10 text-neutral-200 hover:text-amber-500 hover:border-amber-500/40 transition-colors"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          {!menuOpen && count > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-md"
      >
        <ul className="px-6 py-4 flex flex-col divide-y divide-white/5">{renderLinks(true)}</ul>
      </nav>
    </header>
  );
};

export default Header;
