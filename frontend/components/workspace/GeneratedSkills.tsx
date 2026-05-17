/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import { FileText, Package, Eye, Download } from "lucide-react";
import { SkillFile } from "@/lib/types";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface GeneratedSkillsProps {
  files: SkillFile[];
}

type FileType = {
  fileName: string;
  content: string;
};

/**
 * Generated build artifacts panel - VS Code inspired
 */
export function GeneratedSkills({ files }: GeneratedSkillsProps) {
  const [selectedFile, setSelectedFile] = useState<null | FileType>(null);

  // Calculate file sizes from content length
  const getFileSize = (content: string): string => {
    const bytes = new Blob([content]).size;
    if (bytes < 1024) return `${bytes}B`;
    const kb = bytes / 1024;
    return `${kb.toFixed(1)}kb`;
  };

  const totalSize = files.reduce((acc, file) => {
    const bytes = new Blob([file.content]).size;
    return acc + bytes;
  }, 0);

  const totalSizeFormatted =
    totalSize < 1024 ? `${totalSize}B` : `${(totalSize / 1024).toFixed(1)}kb`;

  const setFile = (file: SkillFile) => {
    console.log("here");
    if (file.fileName === selectedFile?.fileName) {
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const truncateContent = (content: string): string => {
    const quarter = Math.floor(content.length / 4);
    return content.slice(0, quarter);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package size={14} className="text-zinc-500" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Generated Skills
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-600">
          {files.length} {files.length === 1 ? "file" : "files"} •{" "}
          {totalSizeFormatted}
        </span>
      </div>

      {/* Two Column Layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {files.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-zinc-600">
            <p className="text-xs font-mono">No files generated</p>
          </div>
        ) : (
          <>
            {/* Left Column: File List */}
            <div className="w-1/2 min-w-0 border-r border-zinc-800 overflow-y-auto overflow-x-hidden overscroll-contain flex-shrink-0">
              <div className="p-2 space-y-0.5">
                {files.map((file, idx) => {
                  const isSelected = selectedFile?.fileName === file.fileName;
                  return (
                    <div
                      key={idx}
                      onClick={() => setFile(file)}
                      className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-all group ${
                        isSelected
                          ? "bg-brand/10 border border-brand/30"
                          : "hover:bg-zinc-800/50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText
                          size={14}
                          className={`flex-shrink-0 transition-colors ${
                            isSelected
                              ? "text-brand"
                              : "text-zinc-600 group-hover:text-brand"
                          }`}
                        />
                        <span
                          className={`text-xs font-mono truncate transition-colors ${
                            isSelected
                              ? "text-brand font-medium"
                              : "text-zinc-400 group-hover:text-zinc-300"
                          }`}
                        >
                          {file.fileName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 ml-2 flex-shrink-0">
                        {getFileSize(file.content)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Markdown Preview */}
            <div className="w-1/2 min-w-0 bg-zinc-950/50 overflow-y-auto overflow-x-hidden overscroll-contain flex-shrink-0">
              {selectedFile ? (
                <div className="p-4">
                  {/* File Header */}
                  <div className="mb-4 pb-3 border-b border-zinc-800 sticky top-0 bg-zinc-950/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={14} className="text-brand" />
                      <h3 className="text-sm font-mono text-white font-medium">
                        {selectedFile.fileName}
                      </h3>
                    </div>
                    <p className="text-[10px] font-mono text-zinc-500">
                      {getFileSize(selectedFile.content)} • Markdown
                    </p>
                  </div>

                  {/* Markdown Content */}
                  <div className="prose prose-invert prose-sm max-w-none break-words overflow-hidden w-full min-w-0">
                    <ReactMarkdown
                      components={{
                        // Customize heading styles
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0 break-words">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold text-white mb-3 mt-5 first:mt-0 break-words">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold text-zinc-200 mb-2 mt-4 first:mt-0 break-words">
                            {children}
                          </h3>
                        ),
                        // Customize paragraph styles
                        p: ({ children }) => (
                          <p className="text-sm text-zinc-300 mb-3 leading-relaxed break-words overflow-wrap-anywhere">
                            {children}
                          </p>
                        ),
                        // Customize code blocks
                        code: ({ className, children }) => {
                          const isInline = !className;
                          return isInline ? (
                            <code className="px-1.5 py-0.5 bg-zinc-800 text-brand rounded text-xs font-mono break-all">
                              {children}
                            </code>
                          ) : (
                            <code className="block p-3 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                              {children}
                            </code>
                          );
                        },
                        // Customize pre blocks (code block wrapper)
                        pre: ({ children }) => (
                          <pre className="overflow-x-auto max-w-full mb-3">
                            {children}
                          </pre>
                        ),
                        // Customize lists
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside text-sm text-zinc-300 mb-3 space-y-1 break-words">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside text-sm text-zinc-300 mb-3 space-y-1 break-words">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-zinc-300 break-words">
                            {children}
                          </li>
                        ),
                        // Customize links
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-brand hover:text-brand/80 underline transition-colors break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        // Customize blockquotes
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-brand/30 pl-4 py-2 my-3 bg-brand/5 text-zinc-400 italic break-words">
                            {children}
                          </blockquote>
                        ),
                        // Customize horizontal rules
                        hr: () => <hr className="my-6 border-zinc-800" />,
                        // Customize tables
                        table: ({ children }) => (
                          <div className="overflow-x-auto mb-3">
                            <table className="min-w-full text-xs border border-zinc-800">
                              {children}
                            </table>
                          </div>
                        ),
                        th: ({ children }) => (
                          <th className="border border-zinc-800 px-2 py-1 bg-zinc-900 text-zinc-300 font-medium">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-zinc-800 px-2 py-1 text-zinc-400">
                            {children}
                          </td>
                        ),
                      }}
                    >
                      {truncateContent(selectedFile.content)}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-600 gap-3">
                  <Eye size={32} className="text-zinc-700" />
                  <p className="text-xs font-mono">Select a file to preview</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions Footer */}
      <div className="p-3 border-t border-zinc-800 space-y-2">
        <button
          className="w-full bg-brand hover:bg-brand/90 text-white py-2 px-3 rounded text-xs font-mono flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={files.length === 0}
          onClick={() => {
            // Create a zip or download all files
            files.forEach((file) => {
              const blob = new Blob([file.content], { type: "text/markdown" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = file.fileName;
              a.click();
              URL.revokeObjectURL(url);
            });
          }}
        >
          <Download size={14} />
          Download All Skills
        </button>
      </div>
    </div>
  );
}

// Made with Bob
