import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { BRAND_NAME } from '../constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/** Rendered by the router's errorElement when something throws while rendering a route. */
const RouteError = () => {
  const error = useRouteError();
  useDocumentTitle('Something went wrong');

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'An unexpected error occurred while loading this page.';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-neutral-950 text-center">
      <div role="alert" className="max-w-md">
        <p className="text-2xl font-serif font-bold text-amber-500 mb-8">{BRAND_NAME}</p>
        <h1 className="text-4xl font-serif text-white mb-4">Something spilled</h1>
        <p className="text-neutral-400 mb-10">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
          >
            Reload page
          </button>
          {/* A plain anchor forces a full reload, recovering from a broken app state. */}
          <a
            href="/"
            className="px-8 py-3.5 border border-white/15 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-xl transition-colors"
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default RouteError;
