import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top when the route path changes (search-param changes keep the position). */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
