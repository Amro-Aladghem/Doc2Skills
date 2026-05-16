/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  label: string;
}

/**
 * Status badge component with checkmark icon
 */
export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <CheckCircle2 size={14} className="text-brand shrink-0" />
      <span className="text-zinc-400">{label}</span>
    </div>
  );
}

// Made with Bob
