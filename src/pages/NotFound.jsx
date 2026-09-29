import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle('Page not found');

  return (
    <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-full h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="text-center relative z-10">
        <p className="text-8xl md:text-9xl font-serif font-bold text-amber-500 mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">This glass is empty</h1>
        <p className="text-neutral-400 max-w-md mx-auto mb-10">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
          >
            Back to home
          </Link>
          <Link
            to="/cocktails"
            className="px-8 py-3.5 border border-white/15 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-xl transition-colors"
          >
            Browse cocktails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
