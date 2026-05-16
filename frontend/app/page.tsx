"use client"

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch as Github, 
  BookOpen, 
  Terminal, 
  Cpu, 
  FileCode, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Code2, 
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  Zap,
  AlertCircle,
  FileCheck
} from 'lucide-react';

// --- Types ---

type AppState = 'landing' | 'processing' | 'workspace';

interface StatusLine {
  id: number;
  text: string;
  completed: boolean;
}

// --- Components ---

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-6 border-b border-border max-w-7xl mx-auto w-full">
    <div className="flex items-center gap-3">
      <div className="font-mono font-bold text-xl tracking-tighter flex items-center">
        <span className="text-brand">Doc</span>
        <span>2</span>
        <span className="text-brand">Skills</span>
      </div>
      <span className="px-2 py-0.5 rounded border border-border text-[10px] font-mono text-text-muted uppercase tracking-widest bg-white/5">
        v1.0
      </span>
    </div>
    <div className="flex items-center gap-8 text-sm font-medium text-text-muted">
      <a href="#" className="hover:text-white transition-colors">Demo</a>
      <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
        <Github size={14} /> GitHub
      </a>
      <a href="#" className="hover:text-white transition-colors">Docs</a>
    </div>
  </nav>
);

const StepIcon = ({ active, completed }: { active: boolean; completed: boolean }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
    completed ? 'bg-brand/20 border-brand text-brand' : 
    active ? 'border-brand text-brand shadow-[0_0_15px_rgba(0,98,255,0.3)]' : 
    'border-border text-text-muted'
  }`}>
    {completed ? <CheckCircle2 size={16} /> : <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-brand' : 'bg-current'}`} />}
  </div>
);

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [url, setUrl] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusLines, setStatusLines] = useState<StatusLine[]>([
    { id: 1, text: "Initializing repository analysis...", completed: false },
    { id: 2, text: "Extracting documentation structure...", completed: false },
    { id: 3, text: "Mapping navigation tree...", completed: false },
    { id: 4, text: "Detecting SDK modules...", completed: false },
    { id: 5, text: "Generating markdown skills...", completed: false },
    { id: 6, text: "Creating agent-ready knowledge package...", completed: false },
    { id: 7, text: "Linking examples to APIs...", completed: false },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (!url) return;
    setState('processing');
  };

  useEffect(() => {
    if (state === 'processing') {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < statusLines.length) {
          setStatusLines(prev => prev.map((line, idx) => 
            idx === currentLine ? { ...line, completed: true } : line
          ));
          currentLine++;
          setProcessingProgress((currentLine / statusLines.length) * 100);
        } else {
          clearInterval(interval);
          setTimeout(() => setState('workspace'), 800);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [state]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-brand/30 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {/* --- LANDING STATE --- */}
          {state === 'landing' && (
            <motion.section 
              key="landing"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center text-center space-y-8 py-10"
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl md:text-7xl font-display font-medium tracking-tight text-white leading-[1.1]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Turn Any Repository <br /> Into <span className="text-brand">Agent Skills</span>
                </motion.h1>
                <motion.p 
                  className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Stop AI coding agents from hallucinating unfamiliar package APIs. 
                  Generate grounded, documentation-aware skills from any repository or docs site.
                </motion.p>
              </div>

              <motion.div 
                className="w-full max-w-2xl bg-surface/50 p-2 rounded-2xl border border-border shadow-2xl focus-within:border-brand/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex flex-col md:flex-row items-stretch gap-2">
                  <div className="flex-1 relative">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input 
                      type="text" 
                      placeholder="Paste GitHub repo or documentation URL" 
                      className="w-full bg-transparent border-none py-4 px-12 outline-none text-white font-mono text-sm placeholder:text-zinc-600"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  </div>
                  <button 
                    id="generate-skills-btn"
                    onClick={handleGenerate}
                    disabled={!url}
                    className="bg-brand hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    Generate Skills
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Example</span>
                <span className="text-sm font-mono text-text-muted">https://github.com/company/new-sdk</span>
                <div className="mt-4 flex items-center gap-6 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={12} /> GitHub Repos</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={12} /> Documentation Sites</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={12} /> Package Docs</span>
                </div>
              </motion.div>
            </motion.section>
          )}

          {/* --- PROCESSING STATE --- */}
          {state === 'processing' && (
            <motion.section 
              key="processing"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-3xl mx-auto py-20"
            >
              <div className="bg-surface border border-border rounded-xl overflow-hidden terminal-shadow relative">
                <div className="scan-line" />
                <div className="p-4 border-b border-border flex items-center justify-between bg-zinc-900/50">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="text-xs font-mono text-text-muted">bash — doc2skills — 80x24</span>
                  </div>
                  <Terminal size={14} className="text-text-muted" />
                </div>
                <div className="p-8 space-y-4 min-h-[400px] font-mono text-sm relative">
                  <AnimatePresence>
                    {statusLines.map((line, idx) => (
                      <motion.div 
                        key={line.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: line.completed ? 1 : 0.4, 
                          x: 0,
                          color: line.completed ? '#0062ff' : '#a3a3a3' 
                        }}
                        className="flex items-start gap-4"
                      >
                        <span className="text-zinc-600 shrink-0">[{idx + 1}]</span>
                        <div className="flex items-center gap-3">
                          {line.completed ? (
                            <CheckCircle2 size={14} className="text-brand shrink-0" />
                          ) : (
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-3.5 h-3.5 border-2 border-brand/30 border-t-brand rounded-full shrink-0"
                            />
                          )}
                          <span>{line.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={terminalEndRef} />
                </div>
                <div className="p-1">
                  <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand"
                      initial={{ width: "0%" }}
                      animate={{ width: `${processingProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* --- WORKSPACE STATE --- */}
          {state === 'workspace' && (
            <motion.section 
              key="workspace"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Repo Analysis */}
                <div className="lg:col-span-3 space-y-6">
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
                        <p className="font-mono text-sm">acme-ai/sdk-core</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Language</label>
                        <p className="font-mono text-sm text-brand">TypeScript</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <StatusBadge label="Docs Parsed" />
                       <StatusBadge label="APIs Mapped" />
                       <StatusBadge label="Examples Extracted" />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <label className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-4 block">Navigation Tree</label>
                      <div className="font-mono text-xs space-y-2 text-zinc-400">
                        <p className="text-white">SDK</p>
                        <p className="pl-4 border-l border-border ml-1">├── Installation</p>
                        <p className="pl-4 border-l border-border ml-1">├── Authentication</p>
                        <p className="pl-4 border-l border-border ml-1">├── CRUD</p>
                        <p className="pl-8 border-l border-border ml-1">│   ├── Create</p>
                        <p className="pl-8 border-l border-border ml-1">│   ├── Update</p>
                        <p className="pl-8 border-l border-border ml-1">│   └── Delete</p>
                        <p className="pl-4 border-l border-border ml-1">├── Errors</p>
                        <p className="pl-4 border-l border-border ml-1">└── Examples</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Panel: Pipeline Visualization */}
                <div className="lg:col-span-5 flex flex-col justify-center items-center py-10 lg:py-0">
                  <div className="relative w-full flex flex-col items-center gap-8">
                    <PipelineNode icon={<Database size={20} />} label="Repository" sublabel="Raw Source" />
                    <PipelineConnector />
                    <PipelineNode icon={<BookOpen size={20} />} label="Extraction" sublabel="Documentation" />
                    <PipelineConnector />
                    <PipelineNode icon={<Layers size={20} />} label="Compression" sublabel="Knowledge Mapping" />
                    <PipelineConnector />
                    <PipelineNode icon={<Cpu size={20} />} label="Skill Generation" sublabel="Agent Ready" active />
                  </div>
                </div>

                {/* Right Panel: Generated Skills */}
                <div className="lg:col-span-4 space-y-6">
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
                      <SkillItem name="Installation.md" size="1.2kb" />
                      <SkillItem name="Authentication.md" size="0.8kb" />
                      <SkillItem name="CRUD_Operations.md" size="4.5kb" />
                      <SkillItem name="Example_Workflows.md" size="2.1kb" />
                      <SkillItem name="Error_Codes.md" size="3.2kb" />
                      <SkillItem name="Security_Best_Practices.md" size="1.9kb" />
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
                </div>
              </div>

              {/* --- DEMO SECTION (COMPARISON) --- */}
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
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-border text-center">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
          Built for AI agents, developer tools, and rapid onboarding into unfamiliar codebases.
        </p>
      </footer>
    </div>
  );
}

// --- Sub-components ---

const StatusBadge = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 text-xs">
    <CheckCircle2 size={14} className="text-brand shrink-0" />
    <span className="text-zinc-400">{label}</span>
  </div>
);

const PipelineNode = ({ icon, label, sublabel, active = false }: { icon: React.ReactNode; label: string; sublabel: string; active?: boolean }) => (
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

const PipelineConnector = () => (
  <div className="w-px h-12 bg-gradient-to-b from-brand/20 to-brand/5 relative">
    <div className="absolute inset-0 bg-brand/10 blur-[4px]" />
    <motion.div 
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand rounded-full shadow-[0_0_8px_rgba(0,98,255,0.8)]"
    />
  </div>
);

const SkillItem = ({ name, size }: { name: string; size: string }) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-brand/30 transition-all group">
    <div className="flex items-center gap-3">
      <FileCode size={16} className="text-text-muted group-hover:text-brand transition-colors" />
      <span className="text-sm font-mono text-zinc-300 group-hover:text-white transition-colors">{name}</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{size}</span>
      <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
    </div>
  </div>
);

