/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageTransition } from '@/components/animations/PageTransition';
import { HeroSection } from './HeroSection';
import { URLInputForm } from './URLInputForm';
import { FeatureList } from './FeatureList';
import { AlertCircle, XCircle } from 'lucide-react';

interface LandingViewProps {
  url: string;
  onUrlChange: (url: string) => void;
  onGenerate: () => void;
  error?: string | null;
  isLoading?: boolean;
}

/**
 * Landing page view component
 */
export function LandingView({ url, onUrlChange, onGenerate, error, isLoading }: LandingViewProps) {
  return (
    <PageTransition className="flex flex-col items-center text-center space-y-8 py-10">
      <HeroSection />
      
      {/* Error Display */}
      {error && (
        <div className="w-full max-w-2xl">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-left">
                <h3 className="text-sm font-mono font-medium text-red-400 mb-1">
                  Analysis Failed
                </h3>
                <p className="text-xs font-mono text-red-300/80">
                  {error}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <URLInputForm
        url={url}
        onUrlChange={onUrlChange}
        onGenerate={onGenerate}
        isLoading={isLoading}
      />
      <FeatureList />
    </PageTransition>
  );
}

// Made with Bob
