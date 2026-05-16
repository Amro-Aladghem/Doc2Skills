/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

/**
 * Hero section with animated title and description
 */
export function HeroSection() {
  return (
    <div className="space-y-4">
      <motion.h1 
        className="text-5xl md:text-7xl font-display font-medium tracking-tight text-white leading-[1.1]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Turn Any Repository <br /> Into <span className="text-brand">Agent Skills</span>
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Stop AI coding agents from hallucinating unfamiliar package APIs. 
        Generate grounded, documentation-aware skills from any repository or docs site.
      </motion.p>
    </div>
  );
}

// Made with Bob
