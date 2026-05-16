/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileText, Package, Eye } from 'lucide-react';
import { mockSkillFiles } from '@/utils/mockData';

/**
 * Generated build artifacts panel - VS Code inspired
 */
export function GeneratedSkills() {
  const totalSize = mockSkillFiles.reduce((acc, file) => {
    const size = parseFloat(file.size);
    return acc + size;
  }, 0);

  return (
    <div className="h-full flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package size={14} className="text-zinc-500" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Generated Skills
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-600">
          {mockSkillFiles.length} artifacts • {totalSize.toFixed(1)}kb
        </span>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-0.5">
          {mockSkillFiles.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-800/50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <FileText size={14} className="text-zinc-600 group-hover:text-brand flex-shrink-0 transition-colors" />
                <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 truncate transition-colors">
                  {file.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-600 ml-2 flex-shrink-0">
                {file.size}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Footer */}
      <div className="p-3 border-t border-zinc-800 space-y-2">
        <button className="w-full bg-brand hover:bg-brand/90 text-white py-2 px-3 rounded text-xs font-mono flex items-center justify-center gap-2 transition-all">
          <Package size={14} />
          Export Skills Package
        </button>
        <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-2 px-3 rounded text-xs font-mono flex items-center justify-center gap-2 transition-all">
          <Eye size={14} />
          Preview Markdown
        </button>
      </div>
    </div>
  );
}

// Made with Bob
