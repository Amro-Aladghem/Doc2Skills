/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

/**
 * Animated pipeline connector component
 */
export function PipelineConnector() {
  return (
    <div className="w-px h-12 bg-gradient-to-b from-brand/20 to-brand/5 relative">
      <div className="absolute inset-0 bg-brand/10 blur-[4px]" />
      <motion.div 
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand rounded-full shadow-[0_0_8px_rgba(0,98,255,0.8)]"
      />
    </div>
  );
}

// Made with Bob
