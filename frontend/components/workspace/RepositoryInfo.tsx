/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GitBranch, FolderTree, FileCode2, BookOpenText, ChevronRight, ChevronDown } from 'lucide-react';
import { SkillFile } from '@/lib/types';

interface RepositoryInfoProps {
  source: string;
  library: string;
  totalFiles: number;
  files: SkillFile[];
}

/**
 * Repository explorer panel - GitHub/VS Code inspired sidebar
 */
export function RepositoryInfo({ source, library, totalFiles, files }: RepositoryInfoProps) {
  // Extract repository name from source URL
  const getRepoName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return `${pathParts[0]}/${pathParts[1]}`;
      }
      return urlObj.hostname;
    } catch {
      return 'Unknown Repository';
    }
  };

  const repoName = getRepoName(source);
  
  // Determine language from library or files
  const getLanguage = () => {
    if (library.toLowerCase().includes('github')) {
      // Try to infer from file extensions if available
      const firstFile = files[0]?.fileName || '';
      if (firstFile.includes('.py')) return 'Python';
      if (firstFile.includes('.ts') || firstFile.includes('.js')) return 'TypeScript';
      if (firstFile.includes('.java')) return 'Java';
      if (firstFile.includes('.go')) return 'Go';
      return 'Mixed';
    }
    return library;
  };

  const language = getLanguage();
  const statusBadges = ['Docs Parsed', 'APIs Mapped', `${totalFiles} Files Generated`];

  return (
    <div className="h-full flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Repository Identity Header */}
      <div className="p-4 border-b border-zinc-800 space-y-3">
        <div className="flex items-center gap-2">
          <GitBranch size={16} className="text-zinc-400" />
          <span className="text-xs font-mono text-zinc-400">github.com/</span>
        </div>
        <div>
          <h3 className="font-mono text-sm text-white font-medium">{repoName}</h3>
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
            {/* Root folder */}
            <div className="flex items-center gap-2 py-1 px-2 rounded">
              <ChevronDown size={12} className="text-zinc-500 flex-shrink-0" />
              <span className="font-mono text-xs text-white font-medium">
                Skills
              </span>
            </div>
            
            {/* Generated skill files */}
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 py-1 px-2 pl-6 rounded hover:bg-zinc-800/50 cursor-pointer transition-colors group"
              >
                <BookOpenText size={14} className="text-zinc-600 group-hover:text-brand flex-shrink-0 transition-colors" />
                <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                  {file.fileName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
