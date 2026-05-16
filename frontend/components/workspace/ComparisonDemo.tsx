/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertCircle, CheckCircle2, FileCheck } from 'lucide-react';

/**
 * AI comparison demo component showing ungrounded vs grounded responses
 */
export function ComparisonDemo() {
  return (
    <div className="pt-20 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-medium text-white">See the Difference</h2>
        <p className="text-text-muted">How Doc2Skills transforms the AI agent experience during development.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Ungrounded */}
        <div className="bg-surface/30 border border-border rounded-2xl p-8 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono tracking-widest uppercase">
              <AlertCircle size={10} /> Ungrounded AI
            </span>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Developer Prompt</label>
              <div className="p-4 bg-zinc-900 rounded-xl border border-border text-sm text-zinc-300 italic">
                "How do I add a new storage object to the vault?"
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest italic">Agent Hallucination</label>
              <div className="p-4 bg-zinc-900 rounded-xl border border-red-500/20 text-sm font-mono space-y-2 opacity-80">
                <p className="text-zinc-500 italic">// AI guessed the method name</p>
                <code className="block text-red-400">const result = await vault.addObject(item);</code>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest bg-red-500/5 border border-red-500/10 px-2 py-0.5 rounded">
                  Error: Method does not exist
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Grounded */}
        <div className="bg-brand/5 border border-brand/20 rounded-2xl p-8 space-y-8 relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand/10 blur-[80px] rounded-full" />
          <div className="absolute top-0 right-0 p-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-mono tracking-widest uppercase">
              <CheckCircle2 size={10} /> Grounded AI
            </span>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Developer Prompt</label>
              <div className="p-4 bg-zinc-900 rounded-xl border border-border text-sm text-zinc-300 italic">
                "How do I add a new storage object to the vault?"
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Grounded Response</label>
                <span className="text-[10px] font-mono text-brand mb-1">98% Confidence</span>
              </div>
              <div className="p-4 bg-zinc-900 rounded-xl border border-brand/20 text-sm font-mono space-y-2">
                <p className="text-zinc-500 italic">// Implementation verified via Vault_CRUD.md</p>
                <code className="block text-brand">const result = await vault.items.create(&#123; data: item &#125;);</code>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] font-mono text-brand uppercase tracking-widest bg-brand/5 border border-brand/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <FileCheck size={10} /> source: CRUD.md
                </span>
                <span className="text-[10px] font-mono text-brand uppercase tracking-widest bg-brand/5 border border-brand/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 size={10} /> Verified API
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
