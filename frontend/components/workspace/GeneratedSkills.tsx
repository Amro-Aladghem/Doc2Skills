/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileCode, Download, Code2 } from 'lucide-react';
import { SkillItem } from '@/components/ui/SkillItem';
import { mockSkillFiles } from '@/utils/mockData';

/**
 * Generated skills panel component
 */
export function GeneratedSkills() {
  return (
    <div className="glass p-6 rounded-2xl shadow-xl flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-lg text-brand">
            <FileCode size={20} />
          </div>
          <h3 className="font-medium text-white">Generated Skills</h3>
        </div>
      </div>

      <div className="space-y-2 flex-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {mockSkillFiles.map((file) => (
          <SkillItem key={file.name} name={file.name} size={file.size} />
        ))}
      </div>

      <div className="space-y-3 pt-6 mt-auto border-t border-border">
        <button className="w-full bg-brand hover:bg-brand/90 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all">
          <Download size={18} />
          Download Skills Package (.zip)
        </button>
        <button className="w-full bg-surface hover:bg-zinc-800 border border-border text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all">
          <Code2 size={18} />
          View Generated Markdown
        </button>
      </div>
    </div>
  );
}

// Made with Bob
