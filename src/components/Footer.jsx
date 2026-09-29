import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BRAND_NAME, COCKTAIL_DB_URL, GITHUB_URL, NAV_LINKS } from '../constants';

const YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  { href: GITHUB_URL, label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.instagram.com/', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://twitter.com/', label: 'Twitter', Icon: FaTwitter },
  { href: 'https://www.facebook.com/', label: 'Facebook', Icon: FaFacebookF },
];

const Footer = () => (
  <footer className="bg-neutral-950 border-t border-white/10 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
      <Link to="/" className="text-3xl font-serif font-bold text-amber-500 mb-6 rounded">
        {BRAND_NAME}
      </Link>
      <p className="text-neutral-400 max-w-md mb-8">
        Elevating the art of mixology. Discover handcrafted cocktail recipes, save your favorites and plan your next
        evening with us.
      </p>

      <nav aria-label="Footer" className="mb-8">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="text-sm text-neutral-400 hover:text-amber-500 transition-colors rounded">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="flex gap-4 mb-12">
        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BRAND_NAME} on ${label}`}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300"
            >
              <Icon aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <p className="text-neutral-600 text-sm">
        &copy; {YEAR} {BRAND_NAME}. All rights reserved.
      </p>
      <p className="text-neutral-600 text-xs mt-2">
        Cocktail data and images provided by{' '}
        <a
          href={COCKTAIL_DB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-amber-500 underline underline-offset-2"
        >
          TheCocktailDB
        </a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
