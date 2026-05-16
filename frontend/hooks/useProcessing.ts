/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { StatusLine } from '@/lib/types';
import { INITIAL_STATUS_LINES, PROCESSING_CONFIG } from '@/lib/constants';

interface UseProcessingReturn {
  statusLines: StatusLine[];
  progress: number;
  isComplete: boolean;
}

/**
 * Custom hook to manage processing state and animations
 */
export function useProcessing(isActive: boolean): UseProcessingReturn {
  const [statusLines, setStatusLines] = useState<StatusLine[]>(INITIAL_STATUS_LINES);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      // Reset state when not active
      setStatusLines(INITIAL_STATUS_LINES);
      setProgress(0);
      setIsComplete(false);
      return;
    }

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < statusLines.length) {
        setStatusLines(prev => 
          prev.map((line, idx) => 
            idx === currentLine ? { ...line, completed: true } : line
          )
        );
        currentLine++;
        setProgress((currentLine / statusLines.length) * 100);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
        }, PROCESSING_CONFIG.completionDelay);
      }
    }, PROCESSING_CONFIG.stepDuration);

    return () => clearInterval(interval);
  }, [isActive, statusLines.length]);

  return {
    statusLines,
    progress,
    isComplete,
  };
}

// Made with Bob
