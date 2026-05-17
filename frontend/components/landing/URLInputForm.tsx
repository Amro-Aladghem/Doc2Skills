/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GitBranch as Github, ArrowRight } from 'lucide-react';

interface URLInputFormProps {
  url: string;
  onUrlChange: (url: string) => void;
  onGenerate: () => void;
}

/**
 * URL input form with GitHub icon and generate button
 */
export function URLInputForm({ url, onUrlChange, onGenerate }: URLInputFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onGenerate();
    }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl bg-surface/50 p-2 rounded-2xl border border-border shadow-2xl focus-within:border-brand/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col md:flex-row items-stretch gap-2">
        <div className="flex-1 relative">
          <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Paste GitHub repo or documentation URL" 
            className="w-full bg-transparent border-none py-4 px-12 outline-none text-white font-mono text-sm placeholder:text-zinc-600"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button 
          id="generate-skills-btn"
          onClick={onGenerate}
          disabled={!url}
          className="bg-brand hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          Generate Skills
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

// Made with Bob
