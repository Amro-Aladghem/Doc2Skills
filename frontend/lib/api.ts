/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalyzeResponse, ApiError } from './types';

/**
 * API client configuration
 */
const API_CONFIG = {
  baseUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: 'Unknown error occurred',
      }));

      throw new ApiClientError(
        errorData.error || errorData.message || 'Request failed',
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    // Network or parsing errors
    throw new ApiClientError(
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

/**
 * API client methods
 */
export const apiClient = {
  /**
   * Analyze documentation from a URL
   * @param url - Documentation URL to analyze
   * @returns Analysis results with generated skill files
   */
  analyze: async (url: string): Promise<AnalyzeResponse> => {
    return fetchApi<AnalyzeResponse>('/analyze', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
  },

  /**
   * Health check endpoint (if needed)
   */
  healthCheck: async (): Promise<{ status: string }> => {
    return fetchApi<{ status: string }>('/health');
  },
} as const;

/**
 * Type-safe API client export
 */
export type ApiClient = typeof apiClient;

// Made with Bob