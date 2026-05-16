/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';
import { StatusLine as StatusLineType } from '@/lib/types';
import { StatusLine } from './StatusLine';
import { ProgressBar } from './ProgressBar';

interface TerminalWindowProps {
  statusLines: StatusLineType[];
  progress: number;
}

/**
 * Terminal window component with chrome and content
 */
export function TerminalWindow({ statusLines, progress }: TerminalWindowProps) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden terminal-shadow relative">
      <div className="scan-line" />
      
      {/* Terminal Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="text-xs font-mono text-text-muted">bash — doc2skills — 80x24</span>
        </div>
        <Terminal size={14} className="text-text-muted" />
      </div>
      
      {/* Terminal Content */}
      <div className="p-8 space-y-4 min-h-[400px] font-mono text-sm relative">
        <AnimatePresence>
          {statusLines.map((line, idx) => (
            <StatusLine key={line.id} line={line} index={idx} />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Progress Bar */}
      <ProgressBar progress={progress} />
    </div>
  );
}

// Made with Bob
