/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RepositoryInfo, SkillFile, NavTreeNode } from '@/lib/types';

/**
 * Mock repository information
 */
export const mockRepositoryInfo: RepositoryInfo = {
  name: 'acme-ai/sdk-core',
  language: 'TypeScript',
  statusBadges: ['Docs Parsed', 'APIs Mapped', 'Examples Extracted'],
};

/**
 * Mock navigation tree structure
 */
export const mockNavTree: NavTreeNode[] = [
  { label: 'SDK', level: 0 },
  { label: '├── Installation', level: 1 },
  { label: '├── Authentication', level: 1 },
  { label: '├── CRUD', level: 1 },
  { label: '│   ├── Create', level: 2 },
  { label: '│   ├── Update', level: 2 },
  { label: '│   └── Delete', level: 2, isLast: true },
  { label: '├── Errors', level: 1 },
  { label: '└── Examples', level: 1, isLast: true },
];

/**
 * Mock generated skill files
 */
export const mockSkillFiles: SkillFile[] = [
  { fileName: 'Installation.md', content: '' },
  { fileName: 'Authentication.md', content: '' },
  { fileName: 'CRUD_Operations.md', content: '' },
  { fileName: 'Example_Workflows.md', content: '' }
]

// Made with Bob
