/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle, CheckCircle2, FileCheck, XCircle, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Developer comparison lab - IDE-inspired split view
 */
export function ComparisonDemo() {
  return (
    <div className="space-y-6">
      {/* Headline */}
      <div className="space-y-2">
        <h2 className="text-2xl font-mono font-medium text-white">
          Same Prompt. Different Outcome.
        </h2>
        <p className="text-sm text-zinc-400 font-mono">
          See how documentation-grounded agents avoid hallucinated APIs.
        </p>
      </div>

      {/* Shared Developer Prompt */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={14} className="text-zinc-500" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            Developer Prompt
          </span>
        </div>
        <div className="font-mono text-sm text-zinc-300 pl-6 border-l-2 border-zinc-700">
          "How do I add a new storage object to the vault?"
        </div>
      </div>

      {/* Split Comparison Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: Ungrounded Agent */}
        <div className="bg-zinc-900/50 border border-red-500/20 rounded-lg overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-mono text-zinc-400">Ungrounded Agent</span>
            </div>
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-wider px-2 py-0.5 bg-red-500/10 rounded">
              Failed
            </span>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 flex-1">
            {/* AI Reasoning */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                AI Reasoning
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-xs text-zinc-500 italic">
                No documentation context available. Inferring API pattern...
              </div>
            </div>

            {/* Generated Code */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                Generated Code
              </div>
              <div className="bg-zinc-950 border border-red-500/30 rounded overflow-hidden">
                <div className="p-3 font-mono text-xs space-y-1">
                  <div className="text-zinc-600">// Hallucinated method</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-red-400"
                  >
                    const result = await vault.addObject(item);
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Error State */}
            <div className="flex items-start gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded">
              <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-mono text-red-400">Method does not exist</div>
                <div className="text-[10px] font-mono text-zinc-500">
                  Model guessed implementation pattern without documentation grounding.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Grounded Agent */}
        <div className="bg-zinc-900/50 border border-brand/20 rounded-lg overflow-hidden flex flex-col relative">
          {/* Subtle glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Toolbar */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-xs font-mono text-zinc-400">Grounded Agent</span>
            </div>
            <span className="text-[10px] font-mono text-brand uppercase tracking-wider px-2 py-0.5 bg-brand/10 rounded">
              Success
            </span>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 flex-1 relative z-10">
            {/* AI Reasoning */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                AI Reasoning
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-xs text-zinc-400">
                Found documentation reference in <span className="text-brand">CRUD.md</span>
              </div>
            </div>

            {/* Generated Code */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                  Generated Code
                </div>
                <div className="text-[10px] font-mono text-brand">98% confidence</div>
              </div>
              <div className="bg-zinc-950 border border-brand/30 rounded overflow-hidden">
                <div className="p-3 font-mono text-xs space-y-1">
                  <div className="text-zinc-600">// Verified via documentation</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-brand"
                  >
                    const result = await vault.items.create(&#123; data: item &#125;);
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Success State */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-3 bg-brand/5 border border-brand/20 rounded">
                <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="text-xs font-mono text-brand">Verified API implementation</div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    Documentation grounding ensures accurate method signatures.
                  </div>
                </div>
              </div>

              {/* Source References */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-brand/5 border border-brand/20 rounded text-[10px] font-mono text-brand">
                  <FileCheck size={10} />
                  <span>CRUD.md</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-brand/5 border border-brand/20 rounded text-[10px] font-mono text-brand">
                  <CheckCircle2 size={10} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
