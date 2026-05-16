/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { AnalyzeResponse } from '@/lib/types'

interface UseAnalyzeReturn {
  data: AnalyzeResponse | null;
  isLoading: boolean;
  error: string | null;
  analyze: (url: string) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook to analyze documentation URLs
 * Handles API calls to the /api/analyze endpoint
 */
export function useAnalyze(): UseAnalyzeReturn {
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (url: string) => {
    if (!url) {
      setError('URL is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze documentation');
      }

      const result: AnalyzeResponse = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    analyze,
    reset,
  };
}

// Made with Bob