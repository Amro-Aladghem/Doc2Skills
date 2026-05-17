/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextRequest, NextResponse } from "next/server";
import { AnalyzeResponse } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * POST /api/analyze
 * Proxies requests to the backend API to analyze documentation
 */
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    console.log("Received request to analyze:", url);
    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Forward request to backend API
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // console.error(errorData)
      return NextResponse.json(
        { error: errorData.detail[0].msg || "Failed to analyze documentation" },
        { status: response.status }
      );
    }

    const data: AnalyzeResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Made with Bob
