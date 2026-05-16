/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GitBranchPlus, FileSearch, Network, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Horizontal pipeline execution flow - CI/CD inspired
 */
export function PipelineVisualization() {
  const stages = [
    { icon: GitBranchPlus, label: 'Repository', status: 'completed' },
    { icon: FileSearch, label: 'Docs Parsing', status: 'completed' },
    { icon: Network, label: 'Knowledge Mapping', status: 'completed' },
    { icon: Cpu, label: 'Skill Generation', status: 'processing' },
    { icon: ShieldCheck, label: 'Agent Ready', status: 'pending' },
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
          Processing Pipeline
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = stage.status === 'processing';
          const isCompleted = stage.status === 'completed';
          const isPending = stage.status === 'pending';

          return (
            <div key={stage.label} className="flex items-center flex-1">
              {/* Stage Node */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`relative w-12 h-12 rounded border flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-brand/10 border-brand text-brand'
                      : isCompleted
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                  }`}
                >
                  <Icon size={18} />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded border-2 border-brand"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand rounded-full border-2 border-zinc-900" />
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={`text-[10px] font-mono ${
                      isActive ? 'text-white' : isCompleted ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {stage.label}
                  </p>
                </div>
              </div>

              {/* Connector Arrow */}
              {idx < stages.length - 1 && (
                <div className="flex items-center justify-center w-12 -mx-6 z-0">
                  <div className="relative w-full h-px">
                    <div
                      className={`absolute inset-0 ${
                        isCompleted ? 'bg-brand/30' : 'bg-zinc-800'
                      }`}
                    />
                    {isCompleted && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-brand/50 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </div>
                  <div
                    className={`absolute w-0 h-0 border-l-4 border-y-4 border-y-transparent ${
                      isCompleted ? 'border-l-brand/30' : 'border-l-zinc-800'
                    }`}
                    style={{ right: '-4px' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Made with Bob
