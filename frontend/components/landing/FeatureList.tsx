/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { EXAMPLE_URL, SUPPORTED_FEATURES } from '@/lib/constants';

/**
 * Feature list component showing supported sources
 */
export function FeatureList() {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Example</span>
      <span className="text-sm font-mono text-text-muted">{EXAMPLE_URL}</span>
      <div className="mt-4 flex items-center gap-6 text-xs text-text-muted">
        {SUPPORTED_FEATURES.map((feature) => (
          <span key={feature} className="flex items-center gap-1.5">
            <CheckCircle2 size={12} /> {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// Made with Bob
