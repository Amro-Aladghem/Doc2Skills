/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { StatusLine as StatusLineType } from '@/lib/types';

interface StatusLineProps {
  line: StatusLineType;
  index: number;
}

/**
 * Individual animated status line component
 */
export function StatusLine({ line, index }: StatusLineProps) {
  return (
    <motion.div 
      key={line.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: line.completed ? 1 : 0.4, 
        x: 0,
        color: line.completed ? '#0062ff' : '#a3a3a3' 
      }}
      className="flex items-start gap-4"
    >
      <span className="text-zinc-600 shrink-0">[{index + 1}]</span>
      <div className="flex items-center gap-3">
        {line.completed ? (
          <CheckCircle2 size={14} className="text-brand shrink-0" />
        ) : (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-3.5 h-3.5 border-2 border-brand/30 border-t-brand rounded-full shrink-0"
          />
        )}
        <span>{line.text}</span>
      </div>
    </motion.div>
  );
}

// Made with Bob
