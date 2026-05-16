/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Database, BookOpen, Layers, Cpu } from 'lucide-react';
import { PipelineNode } from '@/components/ui/PipelineNode';
import { PipelineConnector } from '@/components/ui/PipelineConnector';

/**
 * Pipeline visualization component showing the processing stages
 */
export function PipelineVisualization() {
  return (
    <div className="relative w-full flex flex-col items-center gap-8">
      <PipelineNode 
        icon={<Database size={20} />} 
        label="Repository" 
        sublabel="Raw Source" 
      />
      <PipelineConnector />
      <PipelineNode 
        icon={<BookOpen size={20} />} 
        label="Extraction" 
        sublabel="Documentation" 
      />
      <PipelineConnector />
      <PipelineNode 
        icon={<Layers size={20} />} 
        label="Compression" 
        sublabel="Knowledge Mapping" 
      />
      <PipelineConnector />
      <PipelineNode 
        icon={<Cpu size={20} />} 
        label="Skill Generation" 
        sublabel="Agent Ready" 
        active 
      />
    </div>
  );
}

// Made with Bob
