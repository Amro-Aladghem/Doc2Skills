/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageTransition } from "@/components/animations/PageTransition";
import { RepositoryInfo } from "./RepositoryInfo";
import { PipelineVisualization } from "./PipelineVisualization";
import { GeneratedSkills } from "./GeneratedSkills";
import { ComparisonDemo } from "./ComparisonDemo";
import { AnalyzeResponse } from "@/lib/types";

interface WorkspaceViewProps {
  data: AnalyzeResponse | null;
  error: string | null;
}

export function WorkspaceView({ data, error }: WorkspaceViewProps) {
  if (error) {
    return (
      <PageTransition>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="text-lg font-mono text-red-400 mb-2">Failed to generate skills</h3>
          <p className="text-sm text-zinc-400">{error}</p>
        </div>
      </PageTransition>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <PageTransition className="space-y-8">
      {/* Main IDE-like Layout */}
      <div className="flex gap-4 min-h-[600px]">
        {/* Left Sidebar: Repository Explorer (~25%) */}
        <div className="w-full lg:w-1/4 flex-shrink-0">
          <RepositoryInfo
            source={data.source}
            library={data.library}
            totalFiles={data.total}
            files={data.files}
          />
        </div>

        {/* Main Panel: Processing Engine + Output (~75%) */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Top: Pipeline Execution Flow */}
          <div className="flex-shrink-0">
            <PipelineVisualization />
          </div>

          {/* Bottom: Generated Artifacts */}
          <div className="flex-1 min-h-0">
            <GeneratedSkills files={data.files} />
          </div>
        </div>
      </div>

      {/* Developer Comparison Lab */}
      <ComparisonDemo />
    </PageTransition>
  );
}

// Made with Bob
