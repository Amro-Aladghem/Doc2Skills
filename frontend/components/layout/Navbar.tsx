/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GitBranch as Github } from 'lucide-react';

/**
 * Navigation header component
 */
export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-6 border-b border-border max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3">
        <div className="font-mono font-bold text-xl tracking-tighter flex items-center">
          <span className="text-brand">Doc</span>
          <span>2</span>
          <span className="text-brand">Skills</span>
        </div>
        <span className="px-2 py-0.5 rounded border border-border text-[10px] font-mono text-text-muted uppercase tracking-widest bg-white/5">
          v1.0
        </span>
      </div>
      <div className="flex items-center gap-8 text-sm font-medium text-text-muted">
        <a href="#" className="hover:text-white transition-colors">Demo</a>
        <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
          <Github size={14} /> GitHub
        </a>
        <a href="#" className="hover:text-white transition-colors">Docs</a>
      </div>
    </nav>
  );
}

// Made with Bob
