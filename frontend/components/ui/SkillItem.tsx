/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileCode, ChevronRight } from 'lucide-react';

interface SkillItemProps {
  name: string;
  size: string;
}

/**
 * Skill file item component
 */
export function SkillItem({ name, size }: SkillItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-brand/30 transition-all group">
      <div className="flex items-center gap-3">
        <FileCode size={16} className="text-text-muted group-hover:text-brand transition-colors" />
        <span className="text-sm font-mono text-zinc-300 group-hover:text-white transition-colors">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{size}</span>
        <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
      </div>
    </div>
  );
}

// Made with Bob
