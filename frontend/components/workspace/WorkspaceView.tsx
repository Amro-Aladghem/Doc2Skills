/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageTransition } from '@/components/animations/PageTransition';
import { RepositoryInfo } from './RepositoryInfo';
import { PipelineVisualization } from './PipelineVisualization';
import { GeneratedSkills } from './GeneratedSkills';
import { ComparisonDemo } from './ComparisonDemo';

/**
 * Workspace view component - IDE-like developer console layout
 */
export function WorkspaceView() {
  return (
    <PageTransition className="space-y-8">
      {/* Main IDE-like Layout */}
      <div className="flex gap-4 min-h-[600px]">
        {/* Left Sidebar: Repository Explorer (~25%) */}
        <div className="w-full lg:w-1/4 flex-shrink-0">
          <RepositoryInfo />
        </div>

        {/* Main Panel: Processing Engine + Output (~75%) */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Top: Pipeline Execution Flow */}
          <div className="flex-shrink-0">
            <PipelineVisualization />
          </div>

          {/* Bottom: Generated Artifacts */}
          <div className="flex-1 min-h-0">
            <GeneratedSkills />
          </div>
        </div>
      </div>

      {/* Developer Comparison Lab */}
      <ComparisonDemo />
    </PageTransition>
  );
}

// Made with Bob
