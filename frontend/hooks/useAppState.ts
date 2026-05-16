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
  handleGenerate: () => void;
}

/**
 * Custom hook to manage application state machine
 */
export function useAppState(): UseAppStateReturn {
  const [state, setState] = useState<AppState>('landing');
  const [url, setUrl] = useState('');

  const handleGenerate = () => {
    if (!url) return;
    setState('processing');
  };

  return {
    state,
    setState,
    url,
    setUrl,
    handleGenerate,
  };
}

// Made with Bob
