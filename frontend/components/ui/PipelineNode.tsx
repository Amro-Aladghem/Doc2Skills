/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface PipelineNodeProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  active?: boolean;
}

/**
 * Pipeline visualization node component
 */
export function PipelineNode({ icon, label, sublabel, active = false }: PipelineNodeProps) {
  return (
    <div className={`flex flex-col items-center gap-3 group z-10 transition-all duration-300 ${active ? 'scale-110' : ''}`}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
        active ? 'bg-brand text-white border-brand shadow-[0_0_30px_rgba(0,98,255,0.4)]' : 
        'bg-surface text-text-muted border-border group-hover:border-zinc-700'
      }`}>
        {icon}
      </div>
      <div className="text-center">
        <p className={`text-sm font-medium ${active ? 'text-white' : 'text-zinc-300'}`}>{label}</p>
        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
}

// Made with Bob
