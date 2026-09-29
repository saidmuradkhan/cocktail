import { useEffect } from 'react';
import { BRAND_NAME } from '../constants';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND_NAME}` : `${BRAND_NAME} | Cocktail Discovery`;
  }, [title]);
}
