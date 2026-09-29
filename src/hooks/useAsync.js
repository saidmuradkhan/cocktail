import { useCallback, useEffect, useEffectEvent, useState } from 'react';

/**
 * Runs `fetcher(signal)` whenever `key` changes (pass `null` to skip).
 * Returns { data, error, loading, retry }. Stale responses are ignored and
 * in-flight requests are aborted when the key changes or the component unmounts.
 */
export function useAsync(key, fetcher) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ id: null, data: null, error: null });
  const runFetcher = useEffectEvent((signal) => fetcher(signal));

  const requestId = key == null ? null : `${key}::${attempt}`;

  useEffect(() => {
    if (requestId == null) return undefined;
    const controller = new AbortController();
    let active = true;

    runFetcher(controller.signal).then(
      (data) => {
        if (active) setResult({ id: requestId, data, error: null });
      },
      (error) => {
        if (active) setResult({ id: requestId, data: null, error });
      },
    );

    return () => {
      active = false;
      controller.abort();
    };
  }, [requestId]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const settled = requestId != null && result.id === requestId;

  return {
    data: settled ? result.data : null,
    error: settled ? result.error : null,
    loading: requestId != null && !settled,
    retry,
  };
}
