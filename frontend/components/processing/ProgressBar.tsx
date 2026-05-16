/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
}

/**
 * Animated progress bar component
 */
export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="p-1">
      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-brand"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Made with Bob
