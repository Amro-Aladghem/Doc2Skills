/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Application state machine types
 */
export type AppState = 'landing' | 'processing' | 'workspace';

/**
 * Processing status line interface
 */
export interface StatusLine {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Repository information interface
 */
export interface RepositoryInfo {
  name: string;
  language: string;
  statusBadges: string[];
}

/**
 * Generated skill file interface
 */
export interface SkillFile {
  name: string;
  size: string;
}

/**
 * Pipeline stage interface
 */
export interface PipelineStage {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  active?: boolean;
}

/**
 * Navigation tree node interface
 */
export interface NavTreeNode {
  label: string;
  level: number;
  isLast?: boolean;
}

/**
 * API Response Types
 */

/**
 * Skill file from backend analysis
 */
export interface SkillFile {
  fileName: string;
  content: string;
}

/**
 * Backend API analyze response
 */
export interface AnalyzeResponse {
  files: SkillFile[];
  library: string;
  source: string;
  total: number;
}

/**
 * API Error response
 */
export interface ApiError {
  error: string;
  message?: string;
}

// Made with Bob
