/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageTransition } from '@/components/animations/PageTransition';
import { HeroSection } from './HeroSection';
import { URLInputForm } from './URLInputForm';
import { FeatureList } from './FeatureList';

interface LandingViewProps {
  url: string;
  onUrlChange: (url: string) => void;
  onGenerate: () => void;
}

/**
 * Landing page view component
 */
export function LandingView({ url, onUrlChange, onGenerate }: LandingViewProps) {
  return (
    <PageTransition className="flex flex-col items-center text-center space-y-8 py-10">
      <HeroSection />
      <URLInputForm 
        url={url}
        onUrlChange={onUrlChange}
        onGenerate={onGenerate}
      />
      <FeatureList />
    </PageTransition>
  );
}

// Made with Bob
