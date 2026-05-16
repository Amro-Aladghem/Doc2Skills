/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageTransition } from '@/components/animations/PageTransition';
import { StatusLine } from '@/lib/types';
import { TerminalWindow } from './TerminalWindow';

interface ProcessingViewProps {
  statusLines: StatusLine[];
  progress: number;
}

/**
 * Processing view component with terminal animation
 */
export function ProcessingView({ statusLines, progress }: ProcessingViewProps) {
  return (
    <PageTransition className="w-full max-w-3xl mx-auto py-20">
      <TerminalWindow statusLines={statusLines} progress={progress} />
    </PageTransition>
  );
}

// Made with Bob
