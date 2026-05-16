"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useAppState } from "@/hooks/useAppState";
import { useProcessing } from "@/hooks/useProcessing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LandingView } from "@/components/landing/LandingView";
import { ProcessingView } from "@/components/processing/ProcessingView";
import { WorkspaceView } from "@/components/workspace/WorkspaceView";
import { useAnalyze } from "@/hooks/useAnalyze";

/**
 * Main application page component
 */
export default function Page() {
  const { state, setState, url, setUrl } = useAppState();
  const { data, isLoading, error, analyze } = useAnalyze();
  const { statusLines, progress } = useProcessing(state === "processing");

  // Transition to workspace when processing is complete
  useEffect(() => {
    console.log(data);
    if (data && state === "processing") {
      setState("workspace");
    }
  }, [data, state, setState]);

  useEffect(() => {
    if (error && state === "processing") {
      // Stay on landing to show error
      setState("landing");
    }
  }, [error, state, setState]);

  const handleGenerate = async () => {
    if (!url.trim()) return;

    setState("processing");
    await analyze(url);
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-brand/30 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {state === "landing" && (
            <LandingView
              key="landing"
              url={url}
              onUrlChange={setUrl}
              onGenerate={handleGenerate}
              error={error}
              isLoading={isLoading}
            />
          )}

          {state === "processing" && (
            <ProcessingView
              key="processing"
              statusLines={statusLines}
              progress={progress}
            />
          )}

          {state === "workspace" && (
            <WorkspaceView data={data} error={error} key="workspace" />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

// Made with Bob
