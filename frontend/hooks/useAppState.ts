/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppState } from '@/lib/types';

interface UseAppStateReturn {
  state: AppState;
  setState: (state: AppState) => void;
  url: string;
  setUrl: (url: string) => void;
}

/**
 * Custom hook to manage application state machine
 */
export function useAppState(): UseAppStateReturn {
  const [state, setState] = useState<AppState>('landing');
  const [url, setUrl] = useState('https://www.i18next.com');
  return {
    state,
    setState,
    url,
    setUrl,
  };
}

// Made with Bob
