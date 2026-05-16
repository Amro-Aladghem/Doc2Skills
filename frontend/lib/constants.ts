/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StatusLine } from './types';

/**
 * Initial processing status lines
 */
export const INITIAL_STATUS_LINES: StatusLine[] = [
  { id: 1, text: "Initializing repository analysis...", completed: false },
  { id: 2, text: "Extracting documentation structure...", completed: false },
  { id: 3, text: "Mapping navigation tree...", completed: false },
  { id: 4, text: "Detecting SDK modules...", completed: false },
  { id: 5, text: "Generating markdown skills...", completed: false },
  { id: 6, text: "Creating agent-ready knowledge package...", completed: false },
  { id: 7, text: "Linking examples to APIs...", completed: false },
];

/**
 * Processing configuration
 */
export const PROCESSING_CONFIG = {
  stepDuration: 700, // milliseconds per step
  completionDelay: 800, // delay before transitioning to workspace
} as const;

/**
 * Example URL for placeholder
 */
export const EXAMPLE_URL = 'https://github.com/company/new-sdk';

/**
 * Supported features list
 */
export const SUPPORTED_FEATURES = [
  'GitHub Repos',
  'Documentation Sites',
  'Package Docs',
] as const;

// Made with Bob
