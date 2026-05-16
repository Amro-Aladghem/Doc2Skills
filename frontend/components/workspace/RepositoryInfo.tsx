/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GitBranch, FolderTree, FileCode2, BookOpenText, ChevronRight, ChevronDown } from 'lucide-react';
import { mockRepositoryInfo, mockNavTree } from '@/utils/mockData';

/**
 * Repository explorer panel - GitHub/VS Code inspired sidebar
 */
export function RepositoryInfo() {
  const { name, language, statusBadges } = mockRepositoryInfo;

  return (
    <div className="h-full flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Repository Identity Header */}
      <div className="p-4 border-b border-zinc-800 space-y-3">
        <div className="flex items-center gap-2">
          <GitBranch size={16} className="text-zinc-400" />
          <span className="text-xs font-mono text-zinc-400">github.com/</span>
        </div>
        <div>
          <h3 className="font-mono text-sm text-white font-medium">{name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-2 py-0.5 bg-brand/10 border border-brand/20 rounded text-[10px] font-mono text-brand">
              {language}
            </span>
            <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono text-zinc-400">
              SDK
            </span>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="px-4 py-3 border-b border-zinc-800 space-y-1.5">
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
          System Status
        </div>
        {statusBadges.map((badge) => (
          <div key={badge} className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span className="text-zinc-400 font-mono text-[11px]">{badge}</span>
          </div>
        ))}
      </div>

      {/* File Explorer Tree */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <FolderTree size={14} className="text-zinc-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Generated Artifacts
            </span>
          </div>
          
          <div className="space-y-0.5">
            {mockNavTree.map((node, idx) => {
              const isFolder = node.level === 0 || (node.level === 1 && node.label.includes('CRUD'));
              const Icon = isFolder ? (node.level === 0 ? ChevronDown : ChevronRight) : FileCode2;
              const iconSize = isFolder ? 12 : 14;
              
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-zinc-800/50 cursor-pointer transition-colors group ${
                    node.level === 0 ? '' : node.level === 1 ? 'pl-6' : 'pl-10'
                  }`}
                >
                  {isFolder ? (
                    <Icon size={iconSize} className="text-zinc-500 flex-shrink-0" />
                  ) : (
                    <BookOpenText size={iconSize} className="text-zinc-600 group-hover:text-brand flex-shrink-0 transition-colors" />
                  )}
                  <span className={`font-mono text-xs ${
                    node.level === 0
                      ? 'text-white font-medium'
                      : 'text-zinc-400 group-hover:text-zinc-300'
                  } transition-colors`}>
                    {node.label.replace(/[├│└─]/g, '').trim()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
