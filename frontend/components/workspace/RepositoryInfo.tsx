/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GitBranch as Github } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockRepositoryInfo, mockNavTree } from '@/utils/mockData';

/**
 * Repository information panel component
 */
export function RepositoryInfo() {
  const { name, language, statusBadges } = mockRepositoryInfo;

  return (
    <div className="glass p-6 rounded-2xl shadow-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-brand/10 rounded-lg text-brand">
          <Github size={20} />
        </div>
        <h3 className="font-medium text-white">Repository Info</h3>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Repository</label>
          <p className="font-mono text-sm">{name}</p>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Language</label>
          <p className="font-mono text-sm text-brand">{language}</p>
        </div>
      </div>

      <div className="space-y-2">
        {statusBadges.map((badge) => (
          <StatusBadge key={badge} label={badge} />
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-4 block">Navigation Tree</label>
        <div className="font-mono text-xs space-y-2 text-zinc-400">
          {mockNavTree.map((node, idx) => (
            <p 
              key={idx}
              className={`${node.level === 0 ? 'text-white' : ''} ${
                node.level === 1 ? 'pl-4 border-l border-border ml-1' : ''
              } ${node.level === 2 ? 'pl-8 border-l border-border ml-1' : ''}`}
            >
              {node.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
