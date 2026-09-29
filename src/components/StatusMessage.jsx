import { FaExclamationTriangle, FaGlassWhiskey, FaRedo } from 'react-icons/fa';

const Wrapper = ({ children, role }) => (
  <div
    role={role}
    className="flex flex-col items-center text-center gap-4 py-16 px-6 bg-white/5 border border-white/10 rounded-3xl"
  >
    {children}
  </div>
);

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We could not reach the cocktail bar. Check your connection and try again.',
  onRetry,
}) => (
  <Wrapper role="alert">
    <FaExclamationTriangle className="text-3xl text-amber-500" aria-hidden="true" />
    <h2 className="text-2xl font-serif text-white">{title}</h2>
    <p className="text-neutral-400 max-w-md">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-colors"
      >
        <FaRedo aria-hidden="true" /> Try again
      </button>
    )}
  </Wrapper>
);

export const EmptyState = ({ title = 'No cocktails found', message, children }) => (
  <Wrapper role="status">
    <FaGlassWhiskey className="text-3xl text-amber-500/70" aria-hidden="true" />
    <h2 className="text-2xl font-serif text-white">{title}</h2>
    {message && <p className="text-neutral-400 max-w-md">{message}</p>}
    {children}
  </Wrapper>
);

export const Spinner = ({ label = 'Loading...' }) => (
  <div role="status" className="flex flex-col items-center justify-center py-24 space-y-4">
    <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" aria-hidden="true" />
    <p className="text-amber-500/80 uppercase tracking-widest text-sm animate-pulse">{label}</p>
  </div>
);
