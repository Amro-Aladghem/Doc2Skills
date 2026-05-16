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
 * Workspace view component showing results and comparison
 */
export function WorkspaceView() {
  return (
    <PageTransition className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Repo Analysis */}
        <div className="lg:col-span-3 space-y-6">
          <RepositoryInfo />
        </div>

        {/* Center Panel: Pipeline Visualization */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center py-10 lg:py-0">
          <PipelineVisualization />
        </div>

        {/* Right Panel: Generated Skills */}
        <div className="lg:col-span-4 space-y-6">
          <GeneratedSkills />
        </div>
      </div>

      {/* Demo Section (Comparison) */}
      <ComparisonDemo />
    </PageTransition>
  );
}

// Made with Bob
