/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileText, Package, Eye, Download } from 'lucide-react';
import { SkillFile } from '@/lib/types';

interface GeneratedSkillsProps {
  files: SkillFile[];
}

/**
 * Generated build artifacts panel - VS Code inspired
 */
export function GeneratedSkills({ files }: GeneratedSkillsProps) {
  // Calculate file sizes from content length
  const getFileSize = (content: string): string => {
    const bytes = new Blob([content]).size;
    if (bytes < 1024) return `${bytes}B`;
    const kb = bytes / 1024;
    return `${kb.toFixed(1)}kb`;
  };

  const totalSize = files.reduce((acc, file) => {
    const bytes = new Blob([file.content]).size;
    return acc + bytes;
  }, 0);

  const totalSizeFormatted = totalSize < 1024
    ? `${totalSize}B`
    : `${(totalSize / 1024).toFixed(1)}kb`;

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
          {files.length} {files.length === 1 ? 'file' : 'files'} • {totalSizeFormatted}
        </span>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2">
        {files.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-600">
            <p className="text-xs font-mono">No files generated</p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 rounded hover:bg-zinc-800/50 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText size={14} className="text-zinc-600 group-hover:text-brand flex-shrink-0 transition-colors" />
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 truncate transition-colors">
                    {file.fileName}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-600 ml-2 flex-shrink-0">
                  {getFileSize(file.content)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="p-3 border-t border-zinc-800 space-y-2">
        <button
          className="w-full bg-brand hover:bg-brand/90 text-white py-2 px-3 rounded text-xs font-mono flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={files.length === 0}
          onClick={() => {
            // Create a zip or download all files
            files.forEach(file => {
              const blob = new Blob([file.content], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = file.fileName;
              a.click();
              URL.revokeObjectURL(url);
            });
          }}
        >
          <Download size={14} />
          Download All Skills
        </button>
        <button
          className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-2 px-3 rounded text-xs font-mono flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={files.length === 0}
          onClick={() => {
            // Preview first file or show modal with file selector
            if (files[0]) {
              const newWindow = window.open();
              if (newWindow) {
                newWindow.document.write(`<pre>${files[0].content}</pre>`);
              }
            }
          }}
        >
          <Eye size={14} />
          Preview Markdown
        </button>
      </div>
    </div>
  );
}

// Made with Bob
