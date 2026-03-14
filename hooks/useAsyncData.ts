'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAsyncDataOptions {
  /** Skip fetching when false (e.g. when user is not logged in). Default: true */
  enabled?: boolean;
}

interface UseAsyncDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string;
  refresh: () => void;
}

/**
 * Generic async data-fetching hook.
 * Manages loading / error / data state and provides a refresh trigger.
 *
 * @param fetcher - Async function that returns T. Throw to signal an error.
 * @param deps    - Dependency array (same semantics as useEffect deps).
 * @param options - Optional config ({ enabled }).
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList,
  options: UseAsyncDataOptions = {},
): UseAsyncDataResult<T> {
  const { enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tick, setTick] = useState(0);

  // Keep a ref to the latest fetcher so we don't add it as a dep
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setData(null);
      return;
    }
    setLoading(true);
    setError('');
    fetcherRef.current()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick, enabled]);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  return { data, loading, error, refresh };
}
